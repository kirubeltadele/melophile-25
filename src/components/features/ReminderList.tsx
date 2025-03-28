
import { useState } from "react";
import { reminders } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BellRing, Clock, Calendar, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

const ReminderList = () => {
  const [userReminders, setUserReminders] = useState(reminders);

  const toggleReminder = (id: string) => {
    setUserReminders(
      userReminders.map(reminder =>
        reminder.id === id ? { ...reminder, active: !reminder.active } : reminder
      )
    );
    
    const reminder = userReminders.find(r => r.id === id);
    if (reminder) {
      toast(
        reminder.active 
          ? `Reminder for ${reminder.medicationName} deactivated` 
          : `Reminder for ${reminder.medicationName} activated`
      );
    }
  };

  const deleteReminder = (id: string) => {
    const reminder = userReminders.find(r => r.id === id);
    setUserReminders(userReminders.filter(reminder => reminder.id !== id));
    
    if (reminder) {
      toast.error(`Reminder for ${reminder.medicationName} deleted`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-melophile-800">Medication Reminders</h2>
        <Button className="bg-melophile-600 hover:bg-melophile-700">
          <Plus className="mr-2 h-4 w-4" /> Add Reminder
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userReminders.length > 0 ? (
          userReminders.map(reminder => (
            <Card key={reminder.id} className={`hover:shadow-md transition-shadow ${reminder.active ? 'border-melophile-200' : 'border-gray-200 opacity-75'}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg font-semibold text-melophile-700">{reminder.medicationName}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Switch 
                      id={`reminder-${reminder.id}`}
                      checked={reminder.active}
                      onCheckedChange={() => toggleReminder(reminder.id)}
                    />
                  </div>
                </div>
                <CardDescription>{reminder.dosage}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">
                      {reminder.frequency} • {reminder.time}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">
                      Start: {reminder.startDate}
                      {reminder.endDate && ` • End: ${reminder.endDate}`}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-600 hover:text-red-800 hover:bg-red-50" 
                  onClick={() => deleteReminder(reminder.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> 
                  Delete
                </Button>
                <Button variant="outline" size="sm">
                  <BellRing className="h-4 w-4 mr-1" /> 
                  Test Alert
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10 border rounded-md bg-gray-50">
            <BellRing className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-1">No reminders set</h3>
            <p className="text-gray-500 mb-4">You haven't set up any medication reminders yet.</p>
            <Button className="bg-melophile-600 hover:bg-melophile-700">
              <Plus className="mr-2 h-4 w-4" /> Add Your First Reminder
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReminderList;
