import React from 'react';
import { Outlet } from 'react-router-dom';
import { InstitutionalHeader } from '../components/common/InstitutionalHeader';
import { RoleSidebar } from '../components/common/RoleSidebar';
import { BiblicalFooter } from '../components/common/BiblicalFooter';

interface DashboardLayoutProps {
  bannerTitle?: string;
  subBanner?: string;
  children?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  bannerTitle,
  subBanner,
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
      {/* Top Header */}
      <InstitutionalHeader bannerTitle={bannerTitle} subBanner={subBanner} />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <RoleSidebar />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F8FAFC]">
          <div className="max-w-[1600px] mx-auto">
            {children || <Outlet />}
          </div>
        </main>
      </div>

      {/* Scripture and Institutional Pillars Footer */}
      <BiblicalFooter variant="dashboard" />
    </div>
  );
};
