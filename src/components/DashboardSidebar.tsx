import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Users, Building2, PawPrint, ClipboardList, Settings, BarChart } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import UserProfile from "./UserProfile";

const DashboardSidebar = () => {
  const { pathname } = useLocation();
  const { state } = useSidebar();

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background transition-transform",
      state === "collapsed" && "-translate-x-full"
    )}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Link
              to="/dashboard"
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === "/dashboard" &&
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )}
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/partners"
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname.startsWith("/partners") &&
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )}
            >
              <Building2 className="mr-2 h-4 w-4" />
              Partners
            </Link>
            <Link
              to="/people"
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === "/people" &&
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )}
            >
              <Users className="mr-2 h-4 w-4" />
              People
            </Link>
            <Link
              to="/pets"
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname.startsWith("/pets") &&
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )}
            >
              <PawPrint className="mr-2 h-4 w-4" />
              Pets
            </Link>
            <Link
              to="/applications"
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === "/applications" &&
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )}
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Applications
            </Link>
            <Link
              to="/blog-management"
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === "/blog-management" &&
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )}
            >
              <FileText className="mr-2 h-4 w-4" />
              Blog Management
            </Link>
            <Link
              to="/reporting"
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === "/reporting" &&
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )}
            >
              <BarChart className="mr-2 h-4 w-4" />
              Reporting
            </Link>
            <Link
              to="/organization-settings"
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === "/organization-settings" &&
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )}
            >
              <Settings className="mr-2 h-4 w-4" />
              Organization Settings
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4">
        <UserProfile />
      </div>
    </aside>
  );
};

export default DashboardSidebar;