<?php

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
    Route::statamic("{$sport}/{team}/{section}", 'home');
    Route::statamic("{$sport}/{team}", 'home');
    Route::statamic("{$sport}", 'home');
}

Route::statamic('sitemap.xml', 'sitemap', [
    'layout' => false,
    'content_type' => 'text/xml',
]);
