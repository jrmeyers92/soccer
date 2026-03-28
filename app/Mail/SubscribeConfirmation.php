<?php

namespace App\Mail;

use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SubscribeConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public string $confirmUrl;

    public function __construct(public Subscriber $subscriber)
    {
        $this->confirmUrl = url('/subscribe/confirm/' . $subscriber->token);
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirm your game alert subscription',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.subscribe_confirmation',
        );
    }
}
