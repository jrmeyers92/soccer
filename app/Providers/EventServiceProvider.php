<?php

namespace App\Providers;

use App\Listeners\GameChangedListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use Statamic\Events\EntrySaved;
use Statamic\Events\EntrySaving;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    public function boot(): void
    {
        Event::listen(EntrySaving::class, [GameChangedListener::class, 'handleSaving']);
        Event::listen(EntrySaved::class, [GameChangedListener::class, 'handleSaved']);
    }

    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
