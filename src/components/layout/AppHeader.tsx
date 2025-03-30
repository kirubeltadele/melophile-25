
import { User, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppHeaderProps {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  logo: string;
  icon: string;
}

const AppHeader = ({ setIsMobileMenuOpen, logo, icon }: AppHeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [unseenNotificationsCount, setUnseenNotificationsCount] = useState(0);
  
  useEffect(() => {
    // In a real app, this would be coming from an API call or context
    // For now, we'll just check if there's any unread notifications in local storage
    const getUnseenCount = () => {
      try {
        // Try to get notifications from localStorage
        const storedNotifications = localStorage.getItem('notifications');
        if (storedNotifications) {
          const notifications = JSON.parse(storedNotifications);
          const unseenCount = notifications.filter((notif: any) => !notif.read).length;
          setUnseenNotificationsCount(unseenCount);
        } else {
          // If no notifications in localStorage, use mock data
          // This would come from the imported mock data in a real app
          setUnseenNotificationsCount(3); 
        }
      } catch (error) {
        console.error('Error getting notifications count:', error);
        setUnseenNotificationsCount(0);
      }
    };

    getUnseenCount();

    // Set up an event listener for notification updates
    window.addEventListener('notifications-updated', getUnseenCount);
    
    return () => {
      window.removeEventListener('notifications-updated', getUnseenCount);
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 h-14 flex items-center justify-between">
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-gray-500"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="hidden md:flex items-center">
          <img src={logo} alt="Melophile" className="h-8" />
        </div>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-500 relative"
            onClick={() => navigate('/notifications')}
          >
            <Bell className="h-5 w-5" />
            {unseenNotificationsCount > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {unseenNotificationsCount}
              </span>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profileImage} alt={user?.name} />
                  <AvatarFallback className="bg-melophile-100 text-melophile-700">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
