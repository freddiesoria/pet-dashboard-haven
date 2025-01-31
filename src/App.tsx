import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Applications from "./pages/Applications";
import Reporting from "./pages/Reporting";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthRoutes } from "./routes/AuthRoutes";
import { BlogRoutes } from "./routes/BlogRoutes";
import { PeopleRoutes } from "./routes/PeopleRoutes";
import { PartnersRoutes } from "./routes/PartnersRoutes";
import { PetsRoutes } from "./routes/PetsRoutes";
import { SettingsRoutes } from "./routes/SettingsRoutes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* Render the routes from each route component */}
          <AuthRoutes />
          <BlogRoutes />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <PartnersRoutes />
          <PeopleRoutes />
          <PetsRoutes />
          <Route
            path="/applications"
            element={
              <DashboardLayout>
                <Applications />
              </DashboardLayout>
            }
          />
          <SettingsRoutes />
          <Route
            path="/reporting"
            element={
              <DashboardLayout>
                <Reporting />
              </DashboardLayout>
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;