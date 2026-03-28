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

Route::statamic('seasons', 'seasons/index', [
    'title' => 'Season Archive',
]);

Route::statamic('sitemap.xml', 'sitemap', [
    'layout' => false,
    'content_type' => 'text/xml',
]);
