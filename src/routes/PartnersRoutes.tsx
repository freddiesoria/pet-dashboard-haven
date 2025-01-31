import { Route } from "react-router-dom";
import Partners from "@/pages/Partners";
import PartnerDetails from "@/pages/PartnerDetails";
import DashboardLayout from "@/components/DashboardLayout";

export const PartnersRoutes = () => {
  return (
    <>
      <Route
        path="/partners"
        element={
          <DashboardLayout>
            <Partners />
          </DashboardLayout>
        }
      />
      <Route
        path="/partners/:id"
        element={
          <DashboardLayout>
            <PartnerDetails />
          </DashboardLayout>
        }
      />
    </>
  );
};