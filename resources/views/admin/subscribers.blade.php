<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscribers — Athletics Admin</title>
    @vite(['resources/css/site.css'])
</head>
<body class="bg-gray-100 min-h-screen p-6">
    <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold">Game Alert Subscribers</h1>
            <a href="/cp" class="text-sm text-gray-500 hover:underline">&larr; Back to CP</a>
        </div>

        @if(session('announce_message'))
            <div class="mb-4 bg-green-100 border border-green-300 text-green-800 rounded px-4 py-3">
                {{ session('announce_message') }}
            </div>
        @endif

        {{-- Send Announcement --}}
        <div class="bg-white rounded-xl shadow p-6 mb-6">
            <h2 class="text-lg font-semibold mb-4">Send Announcement</h2>
            <form action="{{ route('admin.announce') }}" method="POST">
                @csrf
                <div class="grid gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input type="text" name="subject" required class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Game cancelled tonight">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea name="body" rows="4" required class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Write your message..."></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Send to</label>
                        <select name="sport" class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="">All subscribers</option>
                            @foreach($sports as $sport)
                                <option value="{{ $sport['slug'] }}">{{ $sport['display_name'] }} subscribers</option>
                            @endforeach
                        </select>
                    </div>
                    <div>
                        <button type="submit" class="bg-primary text-black font-bold px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                            Send Announcement
                        </button>
                    </div>
                </div>
            </form>
        </div>

        {{-- Subscriber Table --}}
        <div class="bg-white rounded-xl shadow overflow-hidden">
            <div class="px-6 py-4 border-b flex items-center justify-between">
                <h2 class="text-lg font-semibold">
                    Subscribers
                    <span class="text-sm font-normal text-gray-500">({{ $subscribers->total() }} total)</span>
                </h2>
                <a href="{{ route('admin.subscribers') }}?export=csv" class="text-sm text-primary font-medium hover:underline">
                    Export CSV
                </a>
            </div>
            <table class="w-full text-sm">
                <thead class="bg-gray-50 text-gray-600 text-xs uppercase">
                    <tr>
                        <th class="px-6 py-3 text-left">Email</th>
                        <th class="px-6 py-3 text-left">Sport</th>
                        <th class="px-6 py-3 text-left">Team</th>
                        <th class="px-6 py-3 text-left">Status</th>
                        <th class="px-6 py-3 text-left">Subscribed</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @forelse($subscribers as $subscriber)
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-3">{{ $subscriber->email }}</td>
                            <td class="px-6 py-3">{{ $subscriber->sport ? ucfirst($subscriber->sport) : 'All sports' }}</td>
                            <td class="px-6 py-3">{{ $subscriber->team ? str_replace('-', ' ', ucwords($subscriber->team, '-')) : 'All teams' }}</td>
                            <td class="px-6 py-3">
                                @if($subscriber->confirmed)
                                    <span class="inline-block bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs font-medium">Confirmed</span>
                                @else
                                    <span class="inline-block bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5 text-xs font-medium">Pending</span>
                                @endif
                            </td>
                            <td class="px-6 py-3 text-gray-500">{{ $subscriber->created_at->format('M j, Y') }}</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="px-6 py-8 text-center text-gray-400">No subscribers yet.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
            @if($subscribers->hasPages())
                <div class="px-6 py-4 border-t">
                    {{ $subscribers->links() }}
                </div>
            @endif
        </div>
    </div>
</body>
</html>
