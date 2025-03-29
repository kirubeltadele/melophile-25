import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Droplets, Plus, Bell, Search, Filter, AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

// Mock data for blood inventory
const bloodInventoryData = [
  { id: "1", type: "A+", units: 15, status: "Normal", lastUpdated: "2023-05-28" },
  { id: "2", type: "A-", units: 5, status: "Low", lastUpdated: "2023-05-29" },
  { id: "3", type: "B+", units: 12, status: "Normal", lastUpdated: "2023-05-29" },
  { id: "4", type: "B-", units: 3, status: "Critical", lastUpdated: "2023-05-30" },
  { id: "5", type: "AB+", units: 8, status: "Normal", lastUpdated: "2023-05-28" },
  { id: "6", type: "AB-", units: 2, status: "Critical", lastUpdated: "2023-05-31" },
  { id: "7", type: "O+", units: 20, status: "Normal", lastUpdated: "2023-05-27" },
  { id: "8", type: "O-", units: 7, status: "Low", lastUpdated: "2023-05-30" },
];

// Blood type information for educational display
const bloodTypeInfo = [
  { 
    type: "A+", 
    canDonateTo: ["A+", "AB+"], 
    canReceiveFrom: ["A+", "A-", "O+", "O-"],
    percentage: "35.7%"
  },
  { 
    type: "A-", 
    canDonateTo: ["A+", "A-", "AB+", "AB-"], 
    canReceiveFrom: ["A-", "O-"],
    percentage: "6.3%"
  },
  { 
    type: "B+", 
    canDonateTo: ["B+", "AB+"], 
    canReceiveFrom: ["B+", "B-", "O+", "O-"],
    percentage: "8.5%"
  },
  { 
    type: "B-", 
    canDonateTo: ["B+", "B-", "AB+", "AB-"], 
    canReceiveFrom: ["B-", "O-"],
    percentage: "1.5%"
  },
  { 
    type: "AB+", 
    canDonateTo: ["AB+"], 
    canReceiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    percentage: "3.4%"
  },
  { 
    type: "AB-", 
    canDonateTo: ["AB+", "AB-"], 
    canReceiveFrom: ["A-", "B-", "AB-", "O-"],
    percentage: "0.6%"
  },
  { 
    type: "O+", 
    canDonateTo: ["A+", "B+", "AB+", "O+"], 
    canReceiveFrom: ["O+", "O-"],
    percentage: "37.4%"
  },
  { 
    type: "O-", 
    canDonateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], 
    canReceiveFrom: ["O-"],
    percentage: "6.6%"
  },
];

// Interface for alert details
interface AlertDetails {
  bloodType: string;
  message: string;
}

const BloodInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [alertDetails, setAlertDetails] = useState<AlertDetails>({ bloodType: "", message: "" });
  const { toast } = useToast();
  
  const filteredInventory = bloodInventoryData.filter(item => {
    const matchesSearch = item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });
  
  const criticalItems = bloodInventoryData.filter(item => item.status === "Critical");
  const lowItems = bloodInventoryData.filter(item => item.status === "Low");
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Normal":
        return "bg-green-100 text-green-800";
      case "Low":
        return "bg-yellow-100 text-yellow-800";
      case "Critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Normal":
        return "text-green-600";
      case "Low":
        return "text-yellow-600";
      case "Critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };
  
  const handleShowAlert = (bloodType: string) => {
    setAlertDetails({
      bloodType,
      message: `We urgently need ${bloodType} blood donations. Please help spread the word to potential donors.`
    });
    setIsAlertDialogOpen(true);
  };
  
  const handleSendAlert = () => {
    toast({
      title: "Alert Sent",
      description: `Alert for ${alertDetails.bloodType} blood type has been sent to potential donors.`,
    });
    setIsAlertDialogOpen(false);
  };
  
  const handleAddInventory = () => {
    toast({
      title: "Inventory Updated",
      description: "Blood inventory has been successfully updated.",
    });
    setIsAddDialogOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-melophile-800">Blood Inventory</h1>
        <p className="text-gray-600">Manage your hospital's blood bank inventory</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Blood Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="bg-melophile-100 p-2 rounded-full">
                <Droplets className="h-5 w-5 text-melophile-600" />
              </div>
              <span className="text-2xl font-bold">
                {bloodInventoryData.reduce((sum, item) => sum + item.units, 0)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Critical Shortages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-2xl font-bold">{criticalItems.length}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-600"
              >
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold">{lowItems.length}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-yellow-600"
              >
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex flex-col md:flex-row gap-4 md:w-2/3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search by blood type..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Update Inventory
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Blood Inventory Status</CardTitle>
          <CardDescription>Current blood bank supplies by blood type</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Blood Type</TableHead>
                <TableHead>Available Units</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full bg-red-500 mr-2`}></div>
                      {item.type}
                    </div>
                  </TableCell>
                  <TableCell>{item.units} units</TableCell>
                  <TableCell>
                    <Badge className={getStatusClass(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mr-2"
                      onClick={() => setIsAddDialogOpen(true)}
                    >
                      Update
                    </Button>
                    {(item.status === "Critical" || item.status === "Low") && (
                      <Button 
                        size="sm" 
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => handleShowAlert(item.type)}
                      >
                        Send Alert
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Blood Type Compatibility</CardTitle>
            <CardDescription>Information on blood type donation compatibility</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Blood Type</TableHead>
                    <TableHead>Can Donate To</TableHead>
                    <TableHead>Can Receive From</TableHead>
                    <TableHead>Population %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bloodTypeInfo.map((info) => (
                    <TableRow key={info.type}>
                      <TableCell className="font-medium">{info.type}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {info.canDonateTo.map(type => (
                            <Badge key={type} variant="outline">{type}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {info.canReceiveFrom.map(type => (
                            <Badge key={type} variant="outline">{type}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{info.percentage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Shortage Alerts</CardTitle>
            <CardDescription>Send alerts for blood type shortages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {criticalItems.length > 0 ? (
                criticalItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <div className="flex items-center">
                        <AlertTriangle className={`h-4 w-4 mr-2 ${getStatusColor(item.status)}`} />
                        <span className="font-medium">{item.type} Blood Type</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Critical shortage: only {item.units} units available
                      </p>
                    </div>
                    <Button 
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleShowAlert(item.type)}
                    >
                      <Bell className="h-4 w-4 mr-1" />
                      Alert
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No critical shortages at the moment.</p>
                </div>
              )}
              
              {lowItems.length > 0 && (
                lowItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <div className="flex items-center">
                        <AlertTriangle className={`h-4 w-4 mr-2 ${getStatusColor(item.status)}`} />
                        <span className="font-medium">{item.type} Blood Type</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Low stock: only {item.units} units available
                      </p>
                    </div>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => handleShowAlert(item.type)}
                    >
                      <Bell className="h-4 w-4 mr-1" />
                      Alert
                    </Button>
                  </div>
                ))
              )}
            </div>
            
            <Button className="w-full">
              <Bell className="h-4 w-4 mr-2" />
              Send General Donation Request
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Add/Update Inventory Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Blood Inventory</DialogTitle>
            <DialogDescription>
              Enter the new blood units count to update the inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bloodType" className="text-right">
                Blood Type
              </Label>
              <Select defaultValue="A+">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="units" className="text-right">
                Units
              </Label>
              <Input id="units" type="number" defaultValue="0" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea id="notes" placeholder="Additional notes..." className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddInventory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Send Alert Dialog */}
      <Dialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Blood Donation Alert</DialogTitle>
            <DialogDescription>
              Send an alert to potential donors for {alertDetails.bloodType} blood type.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bloodType" className="text-right">
                Blood Type
              </Label>
              <Input id="bloodType" value={alertDetails.bloodType} readOnly className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea 
                id="message" 
                value={alertDetails.message}
                onChange={(e) => setAlertDetails({...alertDetails, message: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="urgency" className="text-right">
                Urgency
              </Label>
              <Select defaultValue="high">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAlertDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendAlert} className="bg-red-600 hover:bg-red-700">
              Send Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BloodInventory;
