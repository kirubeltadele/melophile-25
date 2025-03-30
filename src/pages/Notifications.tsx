
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  X,
  Check,
  AlertTriangle,
  Calendar,
  Clock,
  Pill,
  MessageCircle,
  Droplets,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const initialNotifications = [
  {
    id: "notif-001",
    title: "Medication Reminder",
    description: "It's time to take your Metformin medication.",
    time: "15 minutes ago",
    read: false,
    type: "reminder",
    priority: "high"
  },
  {
    id: "notif-002",
    title: "Appointment Confirmed",
    description: "Your appointment with Dr. Haile has been confirmed for tomorrow at 2:30 PM.",
    time: "2 hours ago",
    read: true,
    type: "appointment",
    priority: "medium"
  },
  {
    id: "notif-003",
    title: "Refill Required",
    description: "Your prescription for Lisinopril will need refill within 3 days.",
    time: "1 day ago",
    read: false,
    type: "medication",
    priority: "medium"
  },
  {
    id: "notif-004",
    title: "New Message",
    description: "Dr. Bekele sent you a new message regarding your last checkup.",
    time: "2 days ago",
    read: true,
    type: "message",
    priority: "low"
  },
  {
    id: "notif-005",
    title: "Blood Donation Request",
    description: "Urgent need for O- blood type. Can you donate?",
    time: "3 hours ago",
    read: false,
    type: "blood",
    priority: "high"
  }
];

const Notifications = () => {
  const [activeNotifications, setActiveNotifications] = useState(initialNotifications);
  
  // Update localStorage when notifications change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(activeNotifications));
    // Dispatch an event to notify other components that notifications have changed
    window.dispatchEvent(new Event('notifications-updated'));
  }, [activeNotifications]);
  
  const handleMarkAsRead = (id: string) => {
    setActiveNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  const handleDismiss = (id: string) => {
    setActiveNotifications(prev => prev.filter(notif => notif.id !== id));
  };
  
  const handleMarkAllAsRead = () => {
    setActiveNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };
  
  const getUnreadCount = () => {
    return activeNotifications.filter(notif => !notif.read).length;
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "appointment":
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case "medication":
        return <Pill className="h-5 w-5 text-green-500" />;
      case "message":
        return <MessageCircle className="h-5 w-5 text-teal-500" />;
      case "blood":
        return <Droplets className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-melophile-800">Notifications</h1>
          <p className="text-gray-600">Stay updated with your health information</p>
        </div>
        
        <div className="flex space-x-2">
          {getUnreadCount() > 0 && (
            <Button 
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={handleMarkAllAsRead}
            >
              <Check className="h-4 w-4" />
              <span>Mark all as read</span>
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="all">
            All 
            <span className="ml-1 bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs">
              {activeNotifications.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread 
            <span className="ml-1 bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs">
              {getUnreadCount()}
            </span>
          </TabsTrigger>
          <TabsTrigger value="high">High Priority</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="space-y-4">
            {activeNotifications.length > 0 ? (
              activeNotifications.map((notification) => (
                <Card key={notification.id} className={`border-l-4 ${notification.read ? 'border-l-gray-200' : 'border-l-melophile-600'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4">
                        <div className={`mt-0.5 p-2 rounded-full ${notification.read ? 'bg-gray-100' : 'bg-melophile-50'}`}>
                          {getTypeIcon(notification.type)}
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-melophile-800'}`}>
                              {notification.title}
                            </h3>
                            {getPriorityBadge(notification.priority)}
                            {!notification.read && (
                              <span className="inline-block h-2 w-2 rounded-full bg-melophile-600"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{notification.description}</p>
                          <p className="text-xs text-gray-400">{notification.time}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-1">
                        {!notification.read && (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleDismiss(notification.id)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-700">No notifications</h3>
                <p className="text-gray-500">You're all caught up!</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="unread">
          <div className="space-y-4">
            {activeNotifications.filter(n => !n.read).length > 0 ? (
              activeNotifications
                .filter(notification => !notification.read)
                .map((notification) => (
                  <Card key={notification.id} className="border-l-4 border-l-melophile-600">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-4">
                          <div className="mt-0.5 p-2 rounded-full bg-melophile-50">
                            {getTypeIcon(notification.type)}
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-melophile-800">
                                {notification.title}
                              </h3>
                              {getPriorityBadge(notification.priority)}
                              <span className="inline-block h-2 w-2 rounded-full bg-melophile-600"></span>
                            </div>
                            <p className="text-sm text-gray-600">{notification.description}</p>
                            <p className="text-xs text-gray-400">{notification.time}</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleDismiss(notification.id)}
                            className="text-gray-500 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <div className="text-center py-12">
                <Check className="h-12 w-12 text-green-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-700">No unread notifications</h3>
                <p className="text-gray-500">You're all caught up!</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="high">
          <div className="space-y-4">
            {activeNotifications.filter(n => n.priority === "high").length > 0 ? (
              activeNotifications
                .filter(notification => notification.priority === "high")
                .map((notification) => (
                  <Card key={notification.id} className={`border-l-4 ${notification.read ? 'border-l-gray-200' : 'border-l-red-500'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-4">
                          <div className={`mt-0.5 p-2 rounded-full ${notification.read ? 'bg-gray-100' : 'bg-red-50'}`}>
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h3 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-red-800'}`}>
                                {notification.title}
                              </h3>
                              <Badge className="bg-red-500">High</Badge>
                              {!notification.read && (
                                <span className="inline-block h-2 w-2 rounded-full bg-red-600"></span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{notification.description}</p>
                            <p className="text-xs text-gray-400">{notification.time}</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-1">
                          {!notification.read && (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleDismiss(notification.id)}
                            className="text-gray-500 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <div className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-700">No high priority notifications</h3>
                <p className="text-gray-500">You have no urgent notifications right now.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
