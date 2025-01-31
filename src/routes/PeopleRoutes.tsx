import { Route } from "react-router-dom";
import People from "@/pages/People";
import AddPersonForm from "@/components/AddPersonForm";
import DashboardLayout from "@/components/DashboardLayout";

export const PeopleRoutes = () => {
  return (
    <>
      <Route
        path="/people"
        element={
          <DashboardLayout>
            <People />
          </DashboardLayout>
        }
      />
      <Route
        path="/people/add"
        element={
          <DashboardLayout>
            <AddPersonForm />
          </DashboardLayout>
        }
      />
    </>
  );
};