
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pill,
  Clock,
  Bell,
  Search,
  Heart,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { medications, reminders } from "@/data/mockData";
import ReminderList from "@/components/features/ReminderList";
import HealthTipsList from "@/components/features/HealthTipsList";
import { useNavigate } from "react-router-dom";
import AddReminderModal, { ReminderData } from '@/components/features/AddReminderModal';
import { useToast } from "@/components/ui/use-toast";

const IndividualDashboard = () => {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [userReminders, setUserReminders] = useState<ReminderData[]>([]);
  const { toast } = useToast();
  
  const activeReminders = reminders.filter(reminder => reminder.active).length;
  const totalMedications = medications.length;

  const quickLinks = [
    { icon: Search, label: "Find Medicine", to: "/search", color: "bg-blue-500" },
    { icon: Bell, label: "My Reminders", to: "/reminders", color: "bg-orange-500" },
    { icon: Heart, label: "Health Tips", to: "/health-tips", color: "bg-red-500" },
    { icon: MessageCircle, label: "Health Chat", to: "/chat", color: "bg-green-500" },
  ];

  const handleAddReminder = (newReminder: ReminderData) => {
    setUserReminders([...userReminders, newReminder]);
    
    toast({
      title: "Reminder Added",
      description: `Reminder for ${newReminder.medicationName} set for ${newReminder.time}`,
      duration: 3000,
    });
    
    // Update the window.dispatchEvent to refresh reminders list
    window.dispatchEvent(new Event('reminders-updated'));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-melophile-800">Your Health Dashboard</h1>
        <p className="text-gray-600">Track your medications and health insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-melophile-100 p-2 rounded-full">
                  <Pill className="h-5 w-5 text-melophile-600" />
                </div>
                <span className="text-2xl font-bold">{totalMedications}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-melophile-600"
                onClick={() => navigate('/medications')}
              >
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Bell className="h-5 w-5 text-orange-600" />
                </div>
                <span className="text-2xl font-bold">{activeReminders}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-orange-600"
                onClick={() => navigate('/reminders')}
              >
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Next Reminder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-teal-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-teal-600" />
                </div>
                <span className="text-sm font-medium">In 2 hours</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-teal-600"
                onClick={() => navigate('/reminders')}
              >
                Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((link, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className={`${link.color} text-white p-3 rounded-full mb-3`}>
                <link.icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-1">{link.label}</h3>
              <Button 
                variant="link" 
                className="text-gray-500 p-0"
                onClick={() => navigate(link.to)}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <ReminderList onAddReminderClick={() => setIsAddModalOpen(true)} />
      
      <HealthTipsList />
      
      <AddReminderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddReminder={handleAddReminder}
      />
    </div>
  );
};

export default IndividualDashboard;
