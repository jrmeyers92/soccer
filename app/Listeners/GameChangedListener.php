<?php

namespace App\Listeners;

use App\Mail\GameAlert;
use App\Models\GameNotification;
use App\Models\Subscriber;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Statamic\Events\EntrySaved;
use Statamic\Events\EntrySaving;
use Statamic\Facades\Entry;

class GameChangedListener
{
    public function handleSaving(EntrySaving $event): void
    {
        $entry = $event->entry;

        if ($entry->collection()->handle() !== 'teams') {
            return;
        }

        // Capture old games before the save
        $oldEntry = Entry::find($entry->id());
        $oldGames = $oldEntry ? ($oldEntry->get('games') ?? []) : [];

        Cache::put('team_old_games_' . $entry->id(), $oldGames, now()->addMinutes(5));
    }

    public function handleSaved(EntrySaved $event): void
    {
        $entry = $event->entry;

        if ($entry->collection()->handle() !== 'teams') {
            return;
        }

        $entryId = $entry->id();
        $newGames = $entry->get('games') ?? [];
        $oldGames = Cache::pull('team_old_games_' . $entryId, []);

        $sport = $entry->get('sport');
        $gender = $entry->get('gender');
        $teamLevel = $entry->get('team');
        $year = $entry->get('year');
        $teamSlug = $gender . '-' . $teamLevel;
        $teamName = ucfirst($gender) . ' ' . ucfirst($teamLevel) . ' ' . ucfirst($sport) . ' (' . $year . ')';

        $scheduleUrl = url('/' . $sport . '/' . $teamSlug . '/schedule');

        // Index old games by a stable key (opponent + index, no date) for cross-date matching
        $oldGamesIndexed = [];
        foreach ($oldGames as $index => $game) {
            $stableKey = $this->stableKey($entryId, $game, $index);
            $oldGamesIndexed[$stableKey] = $game;
        }

        foreach ($newGames as $index => $game) {
            $stableKey = $this->stableKey($entryId, $game, $index);
            $gameKey   = $this->gameKey($entryId, $game);        // includes date, for dedup log
            $oldGame   = $oldGamesIndexed[$stableKey] ?? null;
            $opponentName = $this->resolveOpponentName($game['opponent'] ?? null);

            $gameDate = isset($game['game_date'])
                ? Carbon::parse($game['game_date'])->format('M j, Y')
                : 'TBD';

            $baseData = [
                'team_name'     => $teamName,
                'opponent_name' => $opponentName,
                'game_date'     => $gameDate,
                'time'          => $game['time'] ?? 'TBD',
                'location'      => $game['location'] ?? '',
                'our_score'     => $game['our_score'] ?? null,
                'opponent_score'=> $game['opponent_score'] ?? null,
                'schedule_url'  => $scheduleUrl,
            ];

            // Cancellation
            if (!empty($game['cancelled']) && GameNotification::alreadySent($gameKey, 'cancelled') === false) {
                $this->notifySubscribers($sport, $teamSlug, 'cancelled', $baseData);
                GameNotification::markSent($entryId, $gameKey, 'cancelled');
            }

            if (empty($game['cancelled']) && $oldGame !== null) {
                // Date change
                if (
                    isset($game['game_date'], $oldGame['game_date']) &&
                    $game['game_date'] !== $oldGame['game_date'] &&
                    GameNotification::alreadySent($stableKey . '_' . $game['game_date'], 'date_changed') === false
                ) {
                    $baseData['old_game_date'] = Carbon::parse($oldGame['game_date'])->format('M j, Y');
                    $this->notifySubscribers($sport, $teamSlug, 'date_changed', $baseData);
                    GameNotification::markSent($entryId, $stableKey . '_' . $game['game_date'], 'date_changed');
                }

                // Time change
                if (
                    isset($game['time'], $oldGame['time']) &&
                    $game['time'] !== $oldGame['time'] &&
                    GameNotification::alreadySent($gameKey . '_' . $game['time'], 'time_changed') === false
                ) {
                    $this->notifySubscribers($sport, $teamSlug, 'time_changed', $baseData);
                    GameNotification::markSent($entryId, $gameKey . '_' . $game['time'], 'time_changed');
                }

                // Location change
                if (
                    isset($game['location'], $oldGame['location']) &&
                    $game['location'] !== $oldGame['location'] &&
                    GameNotification::alreadySent($gameKey . '_' . $game['location'], 'location_changed') === false
                ) {
                    $this->notifySubscribers($sport, $teamSlug, 'location_changed', $baseData);
                    GameNotification::markSent($entryId, $gameKey . '_' . $game['location'], 'location_changed');
                }

                // Score posted (both scores now set, weren't before)
                $scoreNowSet = is_numeric($game['our_score'] ?? null) && is_numeric($game['opponent_score'] ?? null);
                $scoreWasSet = is_numeric($oldGame['our_score'] ?? null) && is_numeric($oldGame['opponent_score'] ?? null);

                if (
                    $scoreNowSet && !$scoreWasSet &&
                    GameNotification::alreadySent($gameKey, 'score_posted') === false
                ) {
                    $this->notifySubscribers($sport, $teamSlug, 'score_posted', $baseData);
                    GameNotification::markSent($entryId, $gameKey, 'score_posted');
                }
            }
        }
    }

    private function notifySubscribers(string $sport, string $teamSlug, string $type, array $gameData): void
    {
        $subscribers = Subscriber::confirmed()->forTeam($sport, $teamSlug)->get();

        foreach ($subscribers as $subscriber) {
            $unsubscribeUrl = url('/unsubscribe/' . $subscriber->token);

            Mail::to($subscriber->email)->send(new GameAlert($type, $gameData, $unsubscribeUrl));
        }
    }

    private function gameKey(string $entryId, array $game): string
    {
        $opponentId = is_array($game['opponent'] ?? null)
            ? ($game['opponent'][0] ?? '')
            : ($game['opponent'] ?? '');

        return md5($entryId . '_' . ($game['game_date'] ?? '') . '_' . $opponentId);
    }

    // Stable key for matching old vs new games across date changes (uses index + opponent, no date)
    private function stableKey(string $entryId, array $game, int $index): string
    {
        $opponentId = is_array($game['opponent'] ?? null)
            ? ($game['opponent'][0] ?? '')
            : ($game['opponent'] ?? '');

        return md5($entryId . '_idx' . $index . '_' . $opponentId);
    }

    private function resolveOpponentName(mixed $opponent): string
    {
        if (empty($opponent)) {
            return 'TBD';
        }

        $id = is_array($opponent) ? ($opponent[0] ?? null) : $opponent;

        if (!$id) {
            return 'TBD';
        }

        $entry = Entry::find($id);

        return $entry ? ($entry->get('school_name') ?? $entry->get('title') ?? 'TBD') : 'TBD';
    }
}
