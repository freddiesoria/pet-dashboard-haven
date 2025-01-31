import { Route } from "react-router-dom";
import OrganizationSettings from "@/pages/OrganizationSettings";
import Users from "@/pages/Users";
import DashboardLayout from "@/components/DashboardLayout";

export const SettingsRoutes = () => {
  return (
    <>
      <Route
        path="/users"
        element={
          <DashboardLayout>
            <Users />
          </DashboardLayout>
        }
      />
      <Route
        path="/organization-settings"
        element={
          <DashboardLayout>
            <OrganizationSettings />
          </DashboardLayout>
        }
      />
    </>
  );
};