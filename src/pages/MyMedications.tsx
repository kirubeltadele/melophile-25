
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Pill, 
  Clock, 
  Calendar, 
  Bell, 
  Plus, 
  X,
  CalendarClock,
  Trash
} from "lucide-react";
import { toast } from "sonner";

// Mock data
const initialMedications = [
  {
    id: "med-001",
    name: "Metformin",
    type: "continuous",
    schedule: "Twice daily",
    refillPeriod: "30 days",
    nextRefillDate: "2023-07-15",
    reminderTime: "08:00",
    notes: "Take with meals"
  },
  {
    id: "med-002",
    name: "Lisinopril",
    type: "continuous",
    schedule: "Once daily",
    refillPeriod: "90 days",
    nextRefillDate: "2023-09-01",
    reminderTime: "07:30",
    notes: "Take in the morning"
  },
  {
    id: "med-003",
    name: "Ibuprofen",
    type: "as-needed",
    schedule: "As needed for pain",
    refillPeriod: "As needed",
    nextRefillDate: null,
    reminderTime: null,
    notes: "Take with food if stomach upset occurs"
  },
  {
    id: "med-004",
    name: "Amoxicillin",
    type: "temporary",
    schedule: "Three times daily",
    refillPeriod: "10 days",
    endDate: "2023-06-15",
    reminderTime: "08:00,14:00,20:00",
    notes: "Complete full course of antibiotics"
  }
];

const MyMedications = () => {
  const [medications, setMedications] = useState(initialMedications);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMedication, setNewMedication] = useState({
    id: "",
    name: "",
    type: "continuous",
    schedule: "",
    refillPeriod: "",
    nextRefillDate: "",
    endDate: "",
    reminderTime: "",
    notes: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMedication({
      ...newMedication,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setNewMedication({
      ...newMedication,
      [name]: value
    });
  };
  
  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMed = {
      ...newMedication,
      id: `med-${Date.now()}`,
    };
    
    setMedications([...medications, newMed]);
    toast.success(`Added ${newMed.name} to your medications`);
    
    // Reset form and close dialog
    setNewMedication({
      id: "",
      name: "",
      type: "continuous",
      schedule: "",
      refillPeriod: "",
      nextRefillDate: "",
      endDate: "",
      reminderTime: "",
      notes: ""
    });
    setIsAddDialogOpen(false);
  };
  
  const handleDeleteMedication = (id: string) => {
    const medToDelete = medications.find(med => med.id === id);
    
    setMedications(medications.filter(med => med.id !== id));
    toast.success(`Removed ${medToDelete?.name} from your medications`);
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "continuous":
        return <Pill className="h-5 w-5 text-green-500" />;
      case "temporary":
        return <CalendarClock className="h-5 w-5 text-orange-500" />;
      case "as-needed":
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Pill className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "continuous":
        return "Continuous";
      case "temporary":
        return "Temporary";
      case "as-needed":
        return "As Needed";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-melophile-800">My Medications</h1>
          <p className="text-gray-600">Manage and track your prescriptions</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-melophile-600 hover:bg-melophile-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Medication
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Medication</DialogTitle>
              <DialogDescription>
                Enter the details of your medication to add it to your list.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddMedication}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Medication Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newMedication.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <div className="col-span-3">
                    <RadioGroup
                      defaultValue="continuous"
                      onValueChange={(value) => handleSelectChange("type", value)}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="continuous" id="continuous" />
                        <Label htmlFor="continuous">Continuous</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="temporary" id="temporary" />
                        <Label htmlFor="temporary">Temporary</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="as-needed" id="as-needed" />
                        <Label htmlFor="as-needed">As Needed</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="schedule" className="text-right">
                    Schedule
                  </Label>
                  <Input
                    id="schedule"
                    name="schedule"
                    placeholder="e.g., Once daily, Twice daily"
                    value={newMedication.schedule}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                
                {newMedication.type === "continuous" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="refillPeriod" className="text-right">
                      Refill Period
                    </Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("refillPeriod", value)}
                      defaultValue="30 days"
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select refill period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15 days">15 days</SelectItem>
                        <SelectItem value="30 days">30 days</SelectItem>
                        <SelectItem value="60 days">60 days</SelectItem>
                        <SelectItem value="90 days">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {newMedication.type === "temporary" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endDate" className="text-right">
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={newMedication.endDate}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reminderTime" className="text-right">
                    Reminder Time
                  </Label>
                  <Input
                    id="reminderTime"
                    name="reminderTime"
                    type="time"
                    value={newMedication.reminderTime}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Input
                    id="notes"
                    name="notes"
                    placeholder="Additional instructions or notes"
                    value={newMedication.notes}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-melophile-600 hover:bg-melophile-700">Add Medication</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medications.map((medication) => (
          <Card key={medication.id} className="overflow-hidden">
            <div className={`h-2 ${medication.type === 'continuous' ? 'bg-green-500' : medication.type === 'temporary' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(medication.type)}
                  <CardTitle>{medication.name}</CardTitle>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 text-gray-400 hover:text-red-500"
                  onClick={() => handleDeleteMedication(medication.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription className="text-xs flex items-center mt-1">
                <span className="uppercase font-semibold mr-2 px-2 py-0.5 rounded text-xs bg-gray-100">
                  {getTypeLabel(medication.type)}
                </span>
                {medication.schedule}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-2 text-sm">
                {medication.type === "continuous" && medication.refillPeriod && (
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Refill Every: {medication.refillPeriod}</span>
                  </div>
                )}
                
                {medication.type === "temporary" && medication.endDate && (
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>End Date: {medication.endDate}</span>
                  </div>
                )}
                
                {medication.reminderTime && (
                  <div className="flex items-center text-gray-600">
                    <Bell className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Reminder: {medication.reminderTime}</span>
                  </div>
                )}
                
                {medication.notes && (
                  <div className="flex items-start text-gray-600 mt-2">
                    <span className="font-medium mr-2">Notes:</span>
                    <span>{medication.notes}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="link" className="px-0 text-melophile-600">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {medications.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <Pill className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700">No medications added</h3>
          <p className="text-gray-500 mb-4">Add your first medication to track and get reminders.</p>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-melophile-600 hover:bg-melophile-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Medication
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyMedications;
