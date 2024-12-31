import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DashboardSidebar />
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;