import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  FileText, 
  Users, 
  Building2, 
  PawPrint, 
  ClipboardList, 
  Settings, 
  BarChart,
  Menu 
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import UserProfile from "./UserProfile";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const DashboardSidebar = () => {
  const { pathname } = useLocation();
  const { state, setOpen } = useSidebar();

  // Query to get current user's email
  const { data: userEmail } = useQuery({
    queryKey: ["current-user-email"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      return user?.email;
    },
  });

  const isSuperAdmin = userEmail === "info@hoozzee.com";

  const navigationItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Building2, label: "Partners", path: "/partners" },
    { icon: Users, label: "People", path: "/people" },
    { icon: PawPrint, label: "Pets", path: "/pets" },
    { icon: ClipboardList, label: "Applications", path: "/applications" },
    ...(isSuperAdmin ? [{ icon: FileText, label: "Blog Management", path: "/blog-management" }] : []),
    { icon: BarChart, label: "Reporting", path: "/reporting" },
    { icon: Settings, label: "Organization Settings", path: "/organization-settings" },
  ];

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setOpen(state === "expanded" ? false : true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background transition-transform duration-200 ease-in-out overflow-y-auto",
        state === "collapsed" && "-translate-x-full md:translate-x-0 md:w-20"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h1 className={cn(
              "text-xl font-bold transition-opacity duration-200",
              state === "collapsed" && "md:opacity-0"
            )}>
              Animal Shelter Software
            </h1>
          </div>

          <nav className="flex-1 space-y-1 p-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  pathname === item.path && "bg-accent text-accent-foreground",
                  state === "collapsed" && "md:justify-center"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className={cn(
                  "transition-opacity duration-200",
                  state === "collapsed" && "md:hidden"
                )}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="p-4 mt-auto">
            <UserProfile />
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;