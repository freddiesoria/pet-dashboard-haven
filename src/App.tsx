import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardLayout from "./components/DashboardLayout";
import Pets from "./pages/Pets";
import People from "./pages/People";
import Applications from "./pages/Applications";
import Partners from "./pages/Partners";
import Users from "./pages/Users";
import Reporting from "./pages/Reporting";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/pets" replace />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/people" element={<People />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reporting" element={<Reporting />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;