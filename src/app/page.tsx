'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Eye, EyeOff, Lock, User } from 'lucide-react';
import { ClassificationBanner } from '@/components/layout/ClassificationBanner';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter credentials.');
      return;
    }
    setLoading(true);
    setError('');
    // Simulate auth delay
    setTimeout(() => {
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('analyst', username || 'JB-0471');
      router.push('/overview');
    }, 800);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative"
      style={{ backgroundColor: '#08090c' }}>
      <ClassificationBanner />

      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative w-full max-w-sm px-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ backgroundColor: '#1e2533', border: '1px solid #2d3a52' }}>
            <Shield size={24} style={{ color: '#3B82F6' }} />
          </div>
          <h1 className="text-[22px] font-semibold tracking-tight" style={{ color: '#F1F5F9' }}>JAHANBIN</h1>
          <p className="text-[12px] mt-1" style={{ color: '#475569' }}>National Intelligence Platform</p>
        </div>

        {/* Login form */}
        <div className="rounded-xl border p-6"
          style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
          <div className="mb-5">
            <h2 className="text-[14px] font-medium" style={{ color: '#F1F5F9' }}>Analyst authentication</h2>
            <p className="text-[11px] mt-0.5" style={{ color: '#475569' }}>Enter your credentials to access the platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-medium mb-1.5 uppercase tracking-[0.06em]" style={{ color: '#64748B' }}>
                Analyst ID
              </label>
              <div className="relative">
                <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="e.g. JB-0471"
                  className="w-full pl-9 pr-4 py-2 text-[13px] rounded-md border transition-colors font-mono"
                  style={{
                    backgroundColor: '#161b27',
                    borderColor: '#1e2533',
                    color: '#F1F5F9',
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium mb-1.5 uppercase tracking-[0.06em]" style={{ color: '#64748B' }}>
                Password
              </label>
              <div className="relative">
                <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2 text-[13px] rounded-md border transition-colors"
                  style={{
                    backgroundColor: '#161b27',
                    borderColor: '#1e2533',
                    color: '#F1F5F9',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword
                    ? <EyeOff size={13} style={{ color: '#475569' }} />
                    : <Eye size={13} style={{ color: '#475569' }} />
                  }
                </button>
              </div>
            </div>

            {error && (
              <p className="text-[11px] px-3 py-2 rounded" style={{ backgroundColor: '#7f1d1d20', color: '#EF4444', border: '1px solid #EF444420' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-md text-[13px] font-medium transition-all"
              style={{
                backgroundColor: loading ? '#1e2533' : '#3B82F6',
                color: loading ? '#64748B' : '#fff',
              }}
            >
              {loading ? 'Authenticating...' : 'Authenticate'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t" style={{ borderColor: '#1e2533' }}>
            <p className="text-[10px] text-center" style={{ color: '#475569' }}>
              All access attempts are logged and audited per Oversight Protocol §7.
              <br />
              Unauthorized access is a criminal offence.
            </p>
          </div>
        </div>

        <p className="text-center mt-6 text-[10px]" style={{ color: '#2d3a52' }}>
          v2.0 — Demonstration environment — All data synthetic
        </p>
      </div>
    </div>
  );
}
