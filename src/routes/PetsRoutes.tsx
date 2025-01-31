import { Route } from "react-router-dom";
import Pets from "@/pages/Pets";
import PetDetails from "@/pages/PetDetails";
import DashboardLayout from "@/components/DashboardLayout";

export const PetsRoutes = () => {
  return (
    <>
      <Route
        path="/pets"
        element={
          <DashboardLayout>
            <Pets />
          </DashboardLayout>
        }
      />
      <Route
        path="/pets/:id"
        element={
          <DashboardLayout>
            <PetDetails />
          </DashboardLayout>
        }
      />
    </>
  );
};