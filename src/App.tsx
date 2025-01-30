import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardLayout from "./components/DashboardLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Pets from "./pages/Pets";
import People from "./pages/People";
import Applications from "./pages/Applications";
import Partners from "./pages/Partners";
import Users from "./pages/Users";
import Reporting from "./pages/Reporting";
import AddPersonForm from "./components/AddPersonForm";
import InviteUserForm from "./components/InviteUserForm";
import OrganizationSettings from "./pages/OrganizationSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/people" element={<People />} />
            <Route path="/people/add" element={<AddPersonForm />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/invite" element={<InviteUserForm />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/organization-settings" element={<OrganizationSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;