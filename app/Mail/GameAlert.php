<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class GameAlert extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $type,
        public array $gameData,
        public string $unsubscribeUrl,
    ) {}

    public function envelope(): Envelope
    {
        $subject = match ($this->type) {
            'cancelled'        => 'Game Cancelled: ' . $this->gameData['opponent_name'],
            'date_changed'     => 'Game Rescheduled: vs ' . $this->gameData['opponent_name'],
            'time_changed'     => 'Game Time Updated: vs ' . $this->gameData['opponent_name'],
            'location_changed' => 'Game Location Updated: vs ' . $this->gameData['opponent_name'],
            'score_posted'     => 'Final Score: ' . $this->gameData['team_name'] . ' vs ' . $this->gameData['opponent_name'],
            default            => 'Game Alert: ' . $this->gameData['team_name'],
        };

        return new Envelope(subject: $subject);
    }

    public function content(): Content
    {
        return new Content(markdown: 'emails.game_alert');
    }
}
