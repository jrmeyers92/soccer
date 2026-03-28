<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('game_notifications', function (Blueprint $table) {
            $table->id();
            $table->string('team_entry_id');
            $table->string('game_key'); // hash of team_entry_id + game_date + opponent_id
            $table->string('type');     // cancelled, time_changed, location_changed, score_posted
            $table->timestamp('sent_at')->useCurrent();

            $table->unique(['game_key', 'type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('game_notifications');
    }
};
