interface ModuleHeaderProps {
  title: string;
  code?: string;
  subtitle?: string;
  status?: string;
  statusColor?: string;
}

export function ModuleHeader({ title, code, subtitle, status, statusColor = '#10B981' }: ModuleHeaderProps) {
  return (
    <div className="px-6 py-4 border-b" style={{ borderColor: '#1e2533' }}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            {code && (
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded"
                style={{ backgroundColor: '#1e2533', color: '#64748B' }}>
                {code}
              </span>
            )}
            <h1 className="text-[18px] font-semibold" style={{ color: '#F1F5F9' }}>{title}</h1>
          </div>
          {subtitle && (
            <p className="text-[12px] mt-0.5" style={{ color: '#64748B' }}>{subtitle}</p>
          )}
        </div>
        {status && (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor }}></div>
            <span className="text-[11px]" style={{ color: '#64748B' }}>{status}</span>
          </div>
        )}
      </div>
    </div>
  );
}
