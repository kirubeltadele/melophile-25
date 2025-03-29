
import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthContext";
import { 
  Home, 
  Pill, 
  Search, 
  Heart, 
  Bell, 
  Calendar, 
  MessageCircle, 
  Clock, 
  BarChart, 
  Settings, 
  Video,
  ShoppingBag,
  UserCheck,
  Users,
  ClipboardList,
  X,
  User,
  Hospital,
  Droplets,
  Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  logo: string;
  icon: string;
}

const AppSidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, logo, icon }: AppSidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  // Different navigation items for different user roles
  const getNavItems = () => {
    const commonItems = [
      { icon: Home, label: "Dashboard", to: "/dashboard" },
      { icon: Bell, label: "Notifications", to: "/notifications" },
      { icon: Settings, label: "Settings", to: "/settings" },
    ];

    if (user?.role === "individual") {
      return [
        ...commonItems,
        { icon: Pill, label: "My Medications", to: "/medications" },
        { icon: Search, label: "Find Medicine", to: "/search" },
        { icon: Heart, label: "Health Tips", to: "/health-tips" },
        { icon: Bell, label: "Reminders", to: "/reminders" },
        { icon: MessageCircle, label: "Health Chat", to: "/chat" },
        { icon: Clock, label: "History", to: "/history" },
      ];
    } else if (user?.role === "pharmacy") {
      return [
        ...commonItems,
        { icon: ShoppingBag, label: "Inventory", to: "/inventory" },
        { icon: UserCheck, label: "Prescriptions", to: "/prescriptions" },
        { icon: BarChart, label: "Analytics", to: "/analytics" },
      ];
    } else if (user?.role === "hospital") {
      return [
        ...commonItems,
        { icon: Users, label: "Staff Members", to: "/staff" },
        { icon: Users, label: "Patients", to: "/patients" },
        { icon: Hospital, label: "About Hospital", to: "/about" },
        { icon: Droplets, label: "Blood Inventory", to: "/blood-inventory" },
      ];
    } else if (user?.role === "consultant") {
      return [
        ...commonItems,
        { icon: Users, label: "Patients", to: "/patients" },
        { icon: Calendar, label: "Appointments", to: "/appointments" },
        { icon: User, label: "About Me", to: "/about" },
      ];
    }

    return commonItems;
  };

  const sidebarClass = cn(
    "flex flex-col w-64 bg-white border-r border-gray-200 z-20 transition-transform duration-300 ease-in-out h-screen",
    {
      "fixed inset-y-0 left-0 transform translate-x-0": isMobileMenuOpen,
      "fixed inset-y-0 left-0 transform -translate-x-full": !isMobileMenuOpen,
      "md:relative md:transform-none": true,
    }
  );

  return (
    <div ref={sidebarRef} className={sidebarClass}>
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <img src={icon} alt="" className="h-8 w-8" />
          <img src={logo} alt="Melophile" className="ml-2 h-6" />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden text-gray-500"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {getNavItems().map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-melophile-50 text-melophile-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <span className="text-xs text-gray-500">Melophile v1.0</span>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
