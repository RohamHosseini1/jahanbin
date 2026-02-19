'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, ChevronDown } from 'lucide-react';

function useTehranTime() {
  const [time, setTime] = useState({ gregorian: '', jalali: '3 Bahman 1404' });

  useEffect(() => {
    function update() {
      const now = new Date();
      const gregorian = now.toLocaleString('en-GB', {
        timeZone: 'Asia/Tehran',
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
      });
      setTime({ gregorian, jalali: '3 Bahman 1404' });
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

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <header className="h-12 flex items-center px-4 border-b gap-4"
      style={{ backgroundColor: '#09090d', borderColor: '#1e2533' }}>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-xl">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search entities, cases, accounts, locations..."
            className="w-full pl-8 pr-4 py-1.5 text-[12px] rounded-md border transition-colors"
            style={{
              backgroundColor: '#0f1117',
              borderColor: '#1e2533',
              color: '#94A3B8',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#2d3a52'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#1e2533'; }}
          />
        </div>
      </form>

      <div className="flex items-center gap-4 ml-auto">
        {/* Time */}
        <div className="text-right hidden md:block">
          <div className="text-[11px] font-mono" style={{ color: '#64748B' }}>{time.gregorian}</div>
          <div className="text-[10px]" style={{ color: '#475569' }}>Tehran — {time.jalali}</div>
        </div>

        {/* Notifications */}
        <button className="relative p-1.5 rounded-md hover:bg-[#161b27] transition-colors">
          <Bell size={15} style={{ color: '#64748B' }} />
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center font-medium"
            style={{ backgroundColor: '#EF4444', color: '#fff' }}>
            3
          </span>
        </button>

        {/* User */}
        <button className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[#161b27] transition-colors">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium"
            style={{ backgroundColor: '#1e2533', color: '#94A3B8' }}>
            JB
          </div>
          <div className="hidden md:block text-left">
            <div className="text-[11px] font-medium" style={{ color: '#94A3B8' }}>JB-0471</div>
          </div>
          <ChevronDown size={11} style={{ color: '#475569' }} />
        </button>
      </div>
    </header>
  );
}
