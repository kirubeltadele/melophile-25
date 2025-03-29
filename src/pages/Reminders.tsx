
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Clock, Bell, CheckCircle } from "lucide-react";
import ReminderList from "@/components/features/ReminderList";
import AddReminderModal, { ReminderData } from '@/components/features/AddReminderModal';
import { reminders as initialReminders } from '@/data/mockData';
import { useToast } from "@/components/ui/use-toast";

// Transform the reminders from mockData to match ReminderData format
const transformReminders = (): ReminderData[] => {
  return initialReminders.map(reminder => ({
    id: reminder.id,
    medicationId: reminder.medicationId,
    medicationName: reminder.medicationName,
    time: reminder.time,
    date: reminder.startDate, // Use startDate as date
    notes: reminder.frequency, // Use frequency as notes
    active: reminder.active
  }));
};

const Reminders = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [reminders, setReminders] = useState<ReminderData[]>(transformReminders());
  const { toast } = useToast();
  
  const handleAddReminder = (newReminder: ReminderData) => {
    setReminders([...reminders, newReminder]);
    
    toast({
      title: "Reminder Added",
      description: `Reminder for ${newReminder.medicationName} set for ${newReminder.time}`,
      duration: 3000,
    });
  };

  const upcomingReminders = reminders
    .filter(reminder => reminder.active)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-melophile-800">Medication Reminders</h1>
          <p className="text-gray-600">Set up and manage reminders for your medications</p>
        </div>
        
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-melophile-600 hover:bg-melophile-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Reminder
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="bg-melophile-100 p-2 rounded-full">
                <Bell className="h-5 w-5 text-melophile-600" />
              </div>
              <span className="text-2xl font-bold">
                {reminders.filter(r => r.active).length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Next Reminder</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingReminders.length > 0 ? (
              <div className="flex items-center space-x-2">
                <div className="bg-teal-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <span className="text-sm font-medium">{upcomingReminders[0].medicationName}</span>
                  <p className="text-xs text-gray-500">{upcomingReminders[0].time}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-gray-500" />
                </div>
                <span className="text-sm text-gray-500">No upcoming reminders</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-2xl font-bold">
                0
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <ReminderList />
      
      <AddReminderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddReminder={handleAddReminder}
      />
    </div>
  );
};

export default Reminders;
