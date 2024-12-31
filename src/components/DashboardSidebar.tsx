import { Paw, Users, FileText, Building2, UserCircle, BarChart3 } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Pets", icon: Paw, path: "/pets" },
  { title: "People", icon: Users, path: "/people" },
  { title: "Applications", icon: FileText, path: "/applications" },
  { title: "Partners", icon: Building2, path: "/partners" },
  { title: "Users", icon: UserCircle, path: "/users" },
  { title: "Reporting", icon: BarChart3, path: "/reporting" },
];

const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">PetAdopt</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;