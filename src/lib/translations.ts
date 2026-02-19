import { Language } from './language-context';

export const t: Record<string, Record<Language, string>> = {
  'ct-ops.title':        { en: 'Counterterrorism',                      fa: 'ضد تروریسم' },
  'ct-ops.subtitle':     { en: 'Active investigation workbench',          fa: 'میز کار تحقیقات فعال' },
  'fin-enf.title':       { en: 'Asset Recovery',                         fa: 'بازیابی دارایی' },
  'fin-enf.subj.title':  { en: 'Subject Investigation',                   fa: 'تحقیق درباره موضوع' },
  'fin-enf.reg.title':   { en: 'State Asset Registry',                    fa: 'ثبت دارایی‌های دولتی' },
  'bdr-sec.title':       { en: 'Border Security',                         fa: 'امنیت مرزی' },
  'trc-sup.title':       { en: 'Truth & Reconciliation',                  fa: 'حقیقت و آشتی' },
  'exec-brief.title':    { en: 'Executive Briefing',                      fa: 'گزارش اجرایی' },
  'oversight.title':     { en: 'Oversight Console',                       fa: 'کنسول نظارت' },
  'jahan.ask':           { en: 'Ask JAHAN about this case...', fa: 'از جهان در مورد این پرونده بپرسید...' },
  'common.active':       { en: 'Active',                                  fa: 'فعال' },
  'common.pending':      { en: 'Pending Review',                          fa: 'در انتظار بررسی' },
  'common.confirmed':    { en: 'Confirmed',                               fa: 'تأیید شده' },
  'common.caseId':       { en: 'Case ID',                                 fa: 'شناسه پرونده' },
  'common.analysis':     { en: 'Analysis',                                fa: 'تحلیل' },
  'common.evidence':     { en: 'Evidence',                                fa: 'مدارک' },
  'common.source':       { en: 'Source',                                  fa: 'منبع' },
  'common.confidence':   { en: 'Confidence',                              fa: 'سطح اطمینان' },
  'common.activeCases':  { en: 'Active Cases',                            fa: 'پرونده‌های فعال' },
  'common.entityProfile':{ en: 'Entity Profile',                          fa: 'پروفایل موجودیت' },
  'common.networkAnalysis':{ en: 'Network Analysis',                      fa: 'تحلیل شبکه' },
  'common.jahanAnalysis': { en: 'JAHAN Analysis',                         fa: 'تحلیل جهان' },
};

export function useT() {
  // This is used in client components — see client-side hook
  return (key: string, lang: Language) => t[key]?.[lang] ?? key;
}
