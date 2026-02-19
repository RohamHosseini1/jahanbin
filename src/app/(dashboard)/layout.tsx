import { ClassificationBanner } from '@/components/layout/ClassificationBanner';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { EntityProvider } from '@/components/shared/EntityContext';
import { LanguageProvider } from '@/lib/language-context';
import { TourProvider } from '@/lib/tour-context';
import { TourCallout } from '@/components/shared/TourCallout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <TourProvider>
        <EntityProvider>
          {/* pt-6 accounts for the fixed classification banner (h-6 = 24px) */}
          <div className="flex h-screen overflow-hidden" style={{ paddingTop: '24px' }}>

            {/* SIDEBAR — fixed height, independent scroll */}
            <aside className="flex-none w-60 h-full overflow-y-auto border-r border-stone-200 bg-stone-50">
              <Sidebar />
            </aside>

            {/* MAIN AREA */}
            <div className="flex-1 flex flex-col overflow-hidden">

              {/* TOP BAR — fixed height, no scroll */}
              <header className="flex-none h-14 border-b border-stone-200 bg-white">
                <TopBar />
              </header>

              {/* CONTENT — only this scrolls */}
              <main className="flex-1 overflow-y-auto bg-white">
                {children}
              </main>

            </div>
          </div>
          <TourCallout />
          <ClassificationBanner />
        </EntityProvider>
      </TourProvider>
    </LanguageProvider>
  );
}
