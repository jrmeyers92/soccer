<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Subscriber extends Model
{
    protected $fillable = ['email', 'name', 'sport', 'team', 'confirmed', 'token'];

    protected $casts = [
        'confirmed' => 'boolean',
    ];

    public static function generateToken(): string
    {
        return Str::random(64);
    }

    public function scopeConfirmed($query)
    {
        return $query->where('confirmed', true);
    }

    public function scopeForTeam($query, string $sport, string $team)
    {
        return $query->where(function ($q) use ($sport, $team) {
            // All-sports subscribers
            $q->whereNull('sport')
                // Same sport, all teams
                ->orWhere(function ($q2) use ($sport) {
                    $q2->where('sport', $sport)->whereNull('team');
                })
                // Same sport + same team
                ->orWhere(function ($q2) use ($sport, $team) {
                    $q2->where('sport', $sport)->where('team', $team);
                });
        });
    }
}
