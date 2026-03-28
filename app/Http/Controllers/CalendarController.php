<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Statamic\Facades\Entry;
use Statamic\Facades\GlobalSet;

class CalendarController extends Controller
{
    public function show(string $team)
    {
        // Extract sport from the URL path (e.g., /soccer/boys-varsity/calendar.ics)
        $segments = explode('/', trim(request()->path(), '/'));
        $sport = $segments[0] ?? '';

        [$gender, $level] = array_pad(explode('-', $team, 2), 2, '');

        $teamEntry = Entry::query()
            ->where('collection', 'teams')
            ->where('sport', $sport)
            ->where('gender', $gender)
            ->where('team', $level)
            ->orderBy('year', 'desc')
            ->first();

        $siteData = GlobalSet::findByHandle('site_data')?->inDefaultSite();
        $schoolName = $siteData?->get('school_name') ?? config('app.name');
        $schoolCity = $siteData?->get('school_city') ?? '';
        $schoolState = $siteData?->get('school_state') ?? '';

        $games = $teamEntry ? ($teamEntry->get('games') ?? []) : [];
        $teamTitle = ucfirst($gender) . ' ' . ucfirst($level) . ' ' . ucfirst($sport);

        $ical = $this->buildIcal($games, $teamTitle, $schoolName, $schoolCity, $schoolState, $sport, $team);

        return response($ical, 200, [
            'Content-Type'        => 'text/calendar; charset=utf-8',
            'Content-Disposition' => 'attachment; filename="' . $sport . '-' . $team . '.ics"',
        ]);
    }

    private function buildIcal(array $games, string $teamTitle, string $schoolName, string $schoolCity, string $schoolState, string $sport, string $teamSlug): string
    {
        $now = Carbon::now()->format('Ymd\THis\Z');
        $scheduleUrl = url('/' . $sport . '/' . $teamSlug . '/schedule');

        $lines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Athletics//GameSchedule//EN',
            'X-WR-CALNAME:' . $teamTitle . ' Schedule',
            'X-WR-TIMEZONE:America/Chicago',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
        ];

        foreach ($games as $game) {
            if (empty($game['game_date'])) {
                continue;
            }

            $opponentEntry = $this->resolveOpponent($game['opponent'] ?? null);
            $opponentName = $opponentEntry ? ($opponentEntry->get('school_name') ?? $opponentEntry->get('title')) : 'TBD';
            $opponentMascot = $opponentEntry?->get('mascot') ?? '';

            $isHome = ($game['location'] ?? '') === 'home';
            $location = $isHome
                ? "{$schoolName}, {$schoolCity}, {$schoolState}"
                : ($opponentEntry
                    ? ($opponentEntry->get('opponent_school_city') . ', ' . $opponentEntry->get('opponent_school_state'))
                    : 'Away');

            $summary = $isHome
                ? "{$teamTitle} vs {$opponentName} {$opponentMascot}"
                : "{$teamTitle} at {$opponentName} {$opponentMascot}";

            // Parse date and time
            $date = Carbon::parse($game['game_date']);
            if (!empty($game['time'])) {
                $timeParts = explode(':', $game['time']);
                $date->setTime((int) ($timeParts[0] ?? 0), (int) ($timeParts[1] ?? 0));
                $dtStart = $date->format('Ymd\THis');
                $dtEnd   = $date->copy()->addHour()->addMinutes(30)->format('Ymd\THis');
                $startLine = 'DTSTART;TZID=America/Chicago:' . $dtStart;
                $endLine   = 'DTEND;TZID=America/Chicago:' . $dtEnd;
            } else {
                $startLine = 'DTSTART;VALUE=DATE:' . $date->format('Ymd');
                $endLine   = 'DTEND;VALUE=DATE:' . $date->copy()->addDay()->format('Ymd');
            }

            $uid = md5($game['game_date'] . ($game['opponent'] ?? '') . $teamTitle) . '@athletics';
            $cancelled = !empty($game['cancelled']) ? "\nSTATUS:CANCELLED" : '';

            $lines[] = 'BEGIN:VEVENT';
            $lines[] = 'UID:' . $uid;
            $lines[] = 'DTSTAMP:' . $now;
            $lines[] = $startLine;
            $lines[] = $endLine;
            $lines[] = 'SUMMARY:' . $this->escapeIcal($summary);
            $lines[] = 'LOCATION:' . $this->escapeIcal($location);
            $lines[] = 'URL:' . $scheduleUrl;
            if ($cancelled) {
                $lines[] = 'STATUS:CANCELLED';
            }
            $lines[] = 'END:VEVENT';
        }

        $lines[] = 'END:VCALENDAR';

        return implode("\r\n", $lines) . "\r\n";
    }

    private function resolveOpponent(mixed $opponent): ?object
    {
        if (empty($opponent)) {
            return null;
        }

        $id = is_array($opponent) ? ($opponent[0] ?? null) : $opponent;

        return $id ? Entry::find($id) : null;
    }

    private function escapeIcal(string $text): string
    {
        return str_replace([',', ';', '\\', "\n"], ['\\,', '\\;', '\\\\', '\\n'], $text);
    }
}
