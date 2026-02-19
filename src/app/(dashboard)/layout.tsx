import { ClassificationBanner } from '@/components/layout/ClassificationBanner';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { EntityProvider } from '@/components/shared/EntityContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EntityProvider>
      <div className="flex flex-col min-h-screen">
        <ClassificationBanner />
        <div className="flex flex-1 pt-6"> {/* pt-6 for classification banner height */}
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <TopBar />
            <main className="flex-1 overflow-y-auto" style={{ backgroundColor: '#08090c' }}>
              {children}
            </main>
          </div>
        </div>
      </div>
    </EntityProvider>
  );
}
