<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameNotification extends Model
{
    public $timestamps = false;

    protected $fillable = ['team_entry_id', 'game_key', 'type', 'sent_at'];

    public static function alreadySent(string $gameKey, string $type): bool
    {
        return static::where('game_key', $gameKey)->where('type', $type)->exists();
    }

    public static function markSent(string $teamEntryId, string $gameKey, string $type): void
    {
        static::firstOrCreate(
            ['game_key' => $gameKey, 'type' => $type],
            ['team_entry_id' => $teamEntryId, 'sent_at' => now()]
        );
    }
}
