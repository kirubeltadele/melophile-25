
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

const AppLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-gentle text-melophile-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login via useEffect
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <AppSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <AppHeader setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
