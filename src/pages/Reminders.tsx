
import ReminderList from "@/components/features/ReminderList";

const Reminders = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-melophile-800">Medication Reminders</h1>
        <p className="text-gray-600">Set up and manage reminders for your medications</p>
      </div>
      
      <ReminderList />
    </div>
  );
};

export default Reminders;
