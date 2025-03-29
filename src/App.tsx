
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Reminders from "./pages/Reminders";
import HealthTips from "./pages/HealthTips";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import MyMedications from "./pages/MyMedications";
import HealthChat from "./pages/HealthChat";
import Inventory from "./pages/Inventory";
import AboutConsultant from "./pages/AboutConsultant";
import melophileLogo from "/melophile-logo.png";
import melophileIcon from "/melophile-icon.ico";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes with AppLayout */}
            <Route element={<AppLayout logo={melophileLogo} icon={melophileIcon} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/search" element={<Search />} />
              <Route path="/reminders" element={<Reminders />} />
              <Route path="/health-tips" element={<HealthTips />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/medications" element={<MyMedications />} />
              <Route path="/chat" element={<HealthChat />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/about" element={<AboutConsultant />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
