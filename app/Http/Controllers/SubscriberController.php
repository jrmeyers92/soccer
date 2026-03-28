<?php

namespace App\Http\Controllers;

use App\Mail\AdminAnnouncement;
use App\Mail\SubscribeConfirmation;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SubscriberController extends Controller
{
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'sport' => ['nullable', 'string', 'max:50'],
            'team'  => ['nullable', 'string', 'max:50'],
        ]);

        $sport = $validated['sport'] ?: null;
        $team  = $validated['team'] ?: null;

        // If team is set, sport must be set too
        if ($team && !$sport) {
            $team = null;
        }

        $subscriber = Subscriber::firstOrNew([
            'email' => $validated['email'],
            'sport' => $sport,
            'team'  => $team,
        ]);

        if ($subscriber->confirmed) {
            return redirect()->back()->with('subscribe_message', 'You are already subscribed!');
        }

        if (!$subscriber->exists) {
            $subscriber->token = Subscriber::generateToken();
            $subscriber->save();
        }

        Mail::to($subscriber->email)->send(new SubscribeConfirmation($subscriber));

        return redirect()->back()->with('subscribe_message', 'Check your email to confirm your subscription.');
    }

    public function confirm(string $token)
    {
        $subscriber = Subscriber::where('token', $token)->firstOrFail();
        $subscriber->update(['confirmed' => true]);

        return view('subscribe.confirmed');
    }

    public function unsubscribe(string $token)
    {
        $subscriber = Subscriber::where('token', $token)->first();

        if ($subscriber) {
            $subscriber->delete();
        }

        return view('subscribe.unsubscribed');
    }

    public function adminIndex(Request $request)
    {
        if ($request->get('export') === 'csv') {
            return $this->exportCsv();
        }

        $subscribers = Subscriber::orderByDesc('created_at')->paginate(50);
        $sports = \Statamic\Facades\GlobalSet::findByHandle('site_data')
            ?->inDefaultSite()
            ?->get('nav_sports') ?? [];

        return view('admin.subscribers', compact('subscribers', 'sports'));
    }

    private function exportCsv()
    {
        $subscribers = Subscriber::orderByDesc('created_at')->get();

        $csv = "email,sport,team,confirmed,subscribed_at\n";
        foreach ($subscribers as $s) {
            $csv .= implode(',', [
                $s->email,
                $s->sport ?? 'all',
                $s->team ?? 'all',
                $s->confirmed ? 'yes' : 'pending',
                $s->created_at->format('Y-m-d'),
            ]) . "\n";
        }

        return response($csv, 200, [
            'Content-Type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename="subscribers.csv"',
        ]);
    }

    public function adminAnnounce(Request $request)
    {
        $validated = $request->validate([
            'subject' => ['required', 'string', 'max:255'],
            'body'    => ['required', 'string'],
            'sport'   => ['nullable', 'string', 'max:50'],
        ]);

        $query = Subscriber::confirmed();

        if ($validated['sport']) {
            $query->where(function ($q) use ($validated) {
                $q->whereNull('sport')->orWhere('sport', $validated['sport']);
            });
        }

        $subscribers = $query->get();
        $sent = 0;

        foreach ($subscribers as $subscriber) {
            $unsubscribeUrl = url('/unsubscribe/' . $subscriber->token);
            Mail::to($subscriber->email)->send(
                new AdminAnnouncement($validated['subject'], $validated['body'], $unsubscribeUrl)
            );
            $sent++;
        }

        return redirect()->route('admin.subscribers')->with('announce_message', "Sent to {$sent} subscribers.");
    }
}
