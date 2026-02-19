import { cn } from '@/lib/utils';

interface StatusTagProps {
  status: string;
  className?: string;
}

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  'active': { bg: '#1e3a5220', text: '#3B82F6', label: 'Active' },
  'interdicted': { bg: '#7f1d1d20', text: '#EF4444', label: 'Interdicted' },
  'under-investigation': { bg: '#78350f20', text: '#F59E0B', label: 'Under Investigation' },
  'cleared': { bg: '#064e3b20', text: '#10B981', label: 'Cleared' },
  'pending': { bg: '#3b0764 20', text: '#8B5CF6', label: 'Pending' },
  'pending-authorization': { bg: '#3b076420', text: '#8B5CF6', label: 'Pending Authorization' },
  'pending-review': { bg: '#3b076420', text: '#8B5CF6', label: 'Pending Review' },
  'closed': { bg: '#1e253320', text: '#64748B', label: 'Closed' },
  'critical': { bg: '#7f1d1d20', text: '#EF4444', label: 'Critical' },
  'high': { bg: '#7c2d1220', text: '#F97316', label: 'High' },
  'medium': { bg: '#78350f20', text: '#F59E0B', label: 'Medium' },
  'low': { bg: '#064e3b20', text: '#10B981', label: 'Low' },
  'standard': { bg: '#1e253320', text: '#64748B', label: 'Standard' },
  'prosecution-ready': { bg: '#064e3b20', text: '#10B981', label: 'Prosecution Ready' },
  'primary-subject': { bg: '#7f1d1d20', text: '#EF4444', label: 'Primary Subject' },
  'named-associate': { bg: '#78350f20', text: '#F59E0B', label: 'Named Associate' },
  'associate': { bg: '#1e3a5220', text: '#3B82F6', label: 'Associate' },
  'sanctioned': { bg: '#7f1d1d20', text: '#EF4444', label: 'Sanctioned' },
  'flagged': { bg: '#78350f20', text: '#F59E0B', label: 'Flagged' },
  'monitored': { bg: '#1e3a5220', text: '#3B82F6', label: 'Monitored' },
  'freeze-requested': { bg: '#3b076420', text: '#8B5CF6', label: 'Freeze Requested' },
  'frozen': { bg: '#7f1d1d20', text: '#EF4444', label: 'Frozen' },
  'tracking': { bg: '#064e3b20', text: '#06B6D4', label: 'Tracking' },
  'disseminated': { bg: '#064e3b20', text: '#10B981', label: 'Disseminated' },
  'pending-auth': { bg: '#3b076420', text: '#8B5CF6', label: 'Pending Auth' },
  'approved': { bg: '#064e3b20', text: '#10B981', label: 'Approved' },
  'rejected': { bg: '#7f1d1d20', text: '#EF4444', label: 'Rejected' },
  'expired': { bg: '#1e253320', text: '#64748B', label: 'Expired' },
};

export function StatusTag({ status, className }: StatusTagProps) {
  const config = statusConfig[status] || { bg: '#1e253320', text: '#64748B', label: status };
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium tracking-[0.04em] uppercase whitespace-nowrap',
        className
      )}
      style={{ backgroundColor: config.bg, color: config.text, border: `1px solid ${config.text}20` }}
    >
      {config.label}
    </span>
  );
}
