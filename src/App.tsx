import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogManagement from "./pages/BlogManagement";
import Partners from "./pages/Partners";
import PartnerDetails from "./pages/PartnerDetails";
import People from "./pages/People";
import Pets from "./pages/Pets";
import PetDetails from "./pages/PetDetails";
import Applications from "./pages/Applications";
import Users from "./pages/Users";
import OrganizationSettings from "./pages/OrganizationSettings";
import Reporting from "./pages/Reporting";
import Landing from "./pages/Landing";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
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
          <Route
            path="/people"
            element={
              <DashboardLayout>
                <People />
              </DashboardLayout>
            }
          />
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
          <Route
            path="/applications"
            element={
              <DashboardLayout>
                <Applications />
              </DashboardLayout>
            }
          />
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
          <Route
            path="/reporting"
            element={
              <DashboardLayout>
                <Reporting />
              </DashboardLayout>
            }
          />
          <Route
            path="/blog-management"
            element={
              <DashboardLayout>
                <BlogManagement />
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
