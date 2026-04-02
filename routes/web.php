<?php

use App\Http\Controllers\CalendarController;
use App\Http\Controllers\SubscriberController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


// Multi-sport athletic department routing
// Order matters: specific section routes before the generic {section} catch-all
$sports = ['soccer', 'basketball', 'football', 'baseball', 'softball', 'swimming'];
foreach ($sports as $sport) {
    Route::statamic("{$sport}/{team}/schedule", 'schedules/show');
    Route::statamic("{$sport}/{team}/roster", 'rosters/show');
    Route::statamic("{$sport}/{team}/stats", 'stats/show');
    Route::statamic("{$sport}/{team}/coaches", 'coaches/team');
    Route::statamic("{$sport}/{team}/seasons", 'seasons/index');
    Route::statamic("{$sport}/{team}/seasons/{year}", 'seasons/show');
    Route::get("{$sport}/{team}/calendar.ics", [CalendarController::class, 'show']);
    Route::statamic("{$sport}/{team}/{section}", 'home');
    Route::statamic("{$sport}/{team}", 'home');
    Route::statamic("{$sport}", 'home');
}

Route::statamic('sitemap.xml', 'sitemap', [
    'layout' => false,
    'content_type' => 'text/xml',
]);

// Game alert subscriptions
Route::post('/subscribe', [SubscriberController::class, 'subscribe'])->name('subscribe');
Route::get('/subscribe/confirm/{token}', [SubscriberController::class, 'confirm'])->name('subscribe.confirm');
Route::get('/unsubscribe/{token}', [SubscriberController::class, 'unsubscribe'])->name('unsubscribe');

// Admin: subscriber management (protected by Statamic CP auth)
Route::middleware(['statamic.cp.authenticated'])->group(function () {
    Route::get('/cp/subscribers', [SubscriberController::class, 'adminIndex'])->name('admin.subscribers');
    Route::post('/cp/subscribers/announce', [SubscriberController::class, 'adminAnnounce'])->name('admin.announce');
});
