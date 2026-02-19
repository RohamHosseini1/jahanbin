'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, ChevronDown, PlayCircle } from 'lucide-react';
import { useTour } from '@/lib/tour-context';

function useTehranTime() {
  const [time, setTime] = useState({ gregorian: '', jalali: '30 Bahman 1404' });

  useEffect(() => {
    function update() {
      const now = new Date();
      const gregorian = now.toLocaleString('en-GB', {
        timeZone: 'Asia/Tehran',
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
      });
      setTime({ gregorian, jalali: '30 Bahman 1404' });
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

export function TopBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const time = useTehranTime();
  const { isActive, startTour } = useTour();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div className="h-14 flex items-center px-4 gap-4 bg-white border-b border-stone-200">

      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-xl">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search entities, cases, accounts..."
            className="w-full pl-8 pr-4 py-1.5 text-[12px] rounded-md border border-stone-200 bg-stone-50 text-stone-700 transition-colors focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white"
          />
        </div>
      </form>

      <div className="flex items-center gap-3 ms-auto">
        {/* Demo tour button — only visible when tour is not active */}
        {!isActive && (
          <button
            onClick={startTour}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
          >
            <PlayCircle size={13} />
            Demo tour
          </button>
        )}

        {/* Time */}
        <div className="text-right hidden md:block">
          <div className="text-[11px] font-mono text-stone-500">{time.gregorian}</div>
          <div className="text-[10px] text-stone-400">Tehran — {time.jalali}</div>
        </div>

        {/* Notifications */}
        <button className="relative p-1.5 rounded-md hover:bg-stone-100 transition-colors">
          <Bell size={15} className="text-stone-500" />
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center font-medium bg-red-500 text-white">
            3
          </span>
        </button>

        {/* User */}
        <button className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-stone-100 transition-colors">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium bg-blue-100 text-blue-700">
            JB
          </div>
          <div className="hidden md:block text-left">
            <div className="text-[11px] font-medium text-stone-700">JB-0471</div>
          </div>
          <ChevronDown size={11} className="text-stone-400" />
        </button>
      </div>
    </div>
  );
}
