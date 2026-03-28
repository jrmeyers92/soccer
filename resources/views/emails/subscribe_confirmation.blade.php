<x-mail::message>
# Confirm Your Game Alerts

You're almost set! Click the button below to confirm your subscription to game alerts.

@if($subscriber->sport)
You'll receive alerts for **{{ ucfirst($subscriber->sport) }}
@if($subscriber->team)
 – {{ str_replace('-', ' ', ucwords($subscriber->team, '-')) }}
@endif
**.
@else
You'll receive alerts for **all sports**.
@endif

<x-mail::button :url="$confirmUrl">
Confirm Subscription
</x-mail::button>

If you didn't request this, you can safely ignore this email.

Thanks,<br>
{{ config('mail.from.name') }}
</x-mail::message>
