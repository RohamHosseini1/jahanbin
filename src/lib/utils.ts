import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  } catch { return dateStr; }
}

export function formatDateTime(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  } catch { return dateStr; }
}

export function confidenceColor(confidence: number): string {
  if (confidence >= 80) return '#10B981';
  if (confidence >= 60) return '#F59E0B';
  return '#EF4444';
}

export function confidenceLabel(confidence: number): 'high' | 'moderate' | 'low' {
  if (confidence >= 80) return 'high';
  if (confidence >= 60) return 'moderate';
  return 'low';
}

export function statusColor(status: string): string {
  const map: Record<string, string> = {
    'active': '#3B82F6',
    'interdicted': '#EF4444',
    'under-investigation': '#F59E0B',
    'cleared': '#10B981',
    'pending': '#8B5CF6',
    'critical': '#EF4444',
    'high': '#F97316',
    'medium': '#F59E0B',
    'low': '#10B981',
  };
  return map[status] || '#64748B';
}

export function admiraltyColor(code: string): string {
  const letter = code[0]?.toUpperCase();
  if (letter === 'A' || letter === 'B') return '#10B981';
  if (letter === 'C') return '#F59E0B';
  if (letter === 'D' || letter === 'E') return '#EF4444';
  return '#64748B';
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency, notation: 'compact', maximumFractionDigits: 1
  }).format(amount);
}

export function getTehranTime(): { gregorian: string; jalali: string } {
  const now = new Date();
  const gregorian = now.toLocaleString('en-GB', {
    timeZone: 'Asia/Tehran',
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
  // Simplified Jalali - approximate
  const jalali = '3 Bahman 1404';
  return { gregorian, jalali };
}
