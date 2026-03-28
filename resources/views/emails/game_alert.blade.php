<x-mail::message>
@if($type === 'cancelled')
# Game Cancelled

The **{{ $gameData['team_name'] }}** game scheduled for **{{ $gameData['game_date'] }}** vs **{{ $gameData['opponent_name'] }}** has been **cancelled**.

@elseif($type === 'date_changed')
# Game Rescheduled

The **{{ $gameData['team_name'] }}** game vs **{{ $gameData['opponent_name'] }}** has been rescheduled:

~~{{ $gameData['old_game_date'] }}~~ → **{{ $gameData['game_date'] }}** at {{ $gameData['time'] }}

@elseif($type === 'time_changed')
# Game Time Updated

The **{{ $gameData['team_name'] }}** game vs **{{ $gameData['opponent_name'] }}** on **{{ $gameData['game_date'] }}** has a new time:

**New time: {{ $gameData['time'] }}**

@elseif($type === 'location_changed')
# Game Location Updated

The **{{ $gameData['team_name'] }}** game vs **{{ $gameData['opponent_name'] }}** on **{{ $gameData['game_date'] }}** has a location change:

**{{ $gameData['location'] === 'home' ? 'Home game (was Away)' : 'Away game (was Home)' }}**

@elseif($type === 'score_posted')
# Final Score

**{{ $gameData['team_name'] }}** {{ $gameData['our_score'] }} – {{ $gameData['opponent_name'] }} {{ $gameData['opponent_score'] }}

@if($gameData['our_score'] > $gameData['opponent_score'])
**Win!**
@elseif($gameData['opponent_score'] > $gameData['our_score'])
Loss
@else
Tie
@endif

@endif

<x-mail::button :url="$gameData['schedule_url']">
View Full Schedule
</x-mail::button>

---

<small>[Unsubscribe]({{ $unsubscribeUrl }})</small>
</x-mail::message>
