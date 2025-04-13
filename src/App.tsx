
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/components/auth/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

// Layouts
import AppLayout from "@/components/layout/AppLayout";

// Pages
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Analytics from "@/pages/Analytics";
import Search from "@/pages/Search";
import Reminders from "@/pages/Reminders";
import MyMedications from "@/pages/MyMedications";
import Orders from "@/pages/Orders";
import Settings from "@/pages/Settings";
import About from "@/pages/About";
import Appointments from "@/pages/Appointments";
import Patients from "@/pages/Patients";
import Inventory from "@/pages/Inventory";
import Telemedicine from "@/pages/Telemedicine";
import BloodInventory from "@/pages/BloodInventory";
import NotFound from "@/pages/NotFound";
import AboutConsultant from "@/pages/AboutConsultant";
import WriteBlog from "@/pages/WriteBlog";
import HealthTips from "@/pages/HealthTips";
import HealthChat from "@/pages/HealthChat";
import Notifications from "@/pages/Notifications";
import BlogDetail from "@/pages/BlogDetail";
import HomeNursing from "@/pages/HomeNursing";

// Styles
import "./App.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/" element={
                  <AppLayout 
                    logo="/melophile-logo.png"
                    icon="/melophile-icon.ico"
                  />
                }>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/reminders" element={<Reminders />} />
                  <Route path="/medications" element={<MyMedications />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/patients" element={<Patients />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/telemedicine" element={<Telemedicine />} />
                  <Route path="/blood-inventory" element={<BloodInventory />} />
                  <Route path="/about-consultant" element={<AboutConsultant />} />
                  <Route path="/write-blog" element={<WriteBlog />} />
                  <Route path="/health-tips" element={<HealthTips />} />
                  <Route path="/health-chat" element={<HealthChat />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/home-nursing" element={<HomeNursing />} />
                </Route>

                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
              <Toaster />
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
