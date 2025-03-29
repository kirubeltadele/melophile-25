
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Droplets, 
  Hospital,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

// Mock data
const bloodInventory = [
  { type: "A+", units: 15, status: "Normal" },
  { type: "A-", units: 5, status: "Low" },
  { type: "B+", units: 12, status: "Normal" },
  { type: "B-", units: 3, status: "Critical" },
  { type: "AB+", units: 8, status: "Normal" },
  { type: "AB-", units: 2, status: "Critical" },
  { type: "O+", units: 20, status: "Normal" },
  { type: "O-", units: 7, status: "Low" },
];

const staffMembers = [
  { 
    id: "STF-001", 
    name: "Dr. Kebede Haile", 
    position: "Chief Medical Officer",
    department: "Administration",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  { 
    id: "STF-002", 
    name: "Nurse Sara Bekele", 
    position: "Head Nurse",
    department: "Nursing",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg"
  },
  { 
    id: "STF-003", 
    name: "Dr. Daniel Alemu", 
    position: "Cardiologist",
    department: "Cardiology",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg"
  },
];

const HospitalDashboard = () => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Normal":
        return "bg-green-100 text-green-800 px-2.5 py-0.5 rounded text-xs font-medium";
      case "Low":
        return "bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded text-xs font-medium";
      case "Critical":
        return "bg-red-100 text-red-800 px-2.5 py-0.5 rounded text-xs font-medium";
      default:
        return "bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded text-xs font-medium";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-melophile-800">Hospital Dashboard</h1>
        <p className="text-gray-600">Manage your hospital operations and resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Staff Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-melophile-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-melophile-600" />
                </div>
                <span className="text-2xl font-bold">47</span>
              </div>
              <Button variant="ghost" size="sm" className="text-melophile-600">
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-teal-100 p-2 rounded-full">
                  <UserCheck className="h-5 w-5 text-teal-600" />
                </div>
                <span className="text-2xl font-bold">123</span>
              </div>
              <Button variant="ghost" size="sm" className="text-teal-600">
                Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Blood Shortages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-2xl font-bold">3</span>
              </div>
              <Button variant="ghost" size="sm" className="text-red-600">
                Alert
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Available Beds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Hospital className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-2xl font-bold">42</span>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Blood Inventory</CardTitle>
            <CardDescription>Current blood bank status and shortages</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Blood Type</TableHead>
                  <TableHead>Available Units</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bloodInventory.map((item) => (
                  <TableRow key={item.type}>
                    <TableCell className="font-medium">{item.type}</TableCell>
                    <TableCell>{item.units}</TableCell>
                    <TableCell>
                      <span className={getStatusClass(item.status)}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {item.status === "Critical" || item.status === "Low" ? (
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Request Donors
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-center">
              <Button variant="outline">View Complete Inventory</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff Management</CardTitle>
            <CardDescription>Recent staff updates and schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {staffMembers.map((staff) => (
              <div key={staff.id} className="flex items-center space-x-4 p-2 rounded-md hover:bg-gray-50">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={staff.avatar} alt={staff.name} />
                  <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{staff.name}</p>
                  <p className="text-xs text-gray-500 truncate">{staff.position}</p>
                </div>
                <Button variant="ghost" size="sm" className="flex-shrink-0 text-gray-600">
                  View
                </Button>
              </div>
            ))}
            
            <Button className="w-full bg-melophile-600 hover:bg-melophile-700 mt-2">
              <Users className="mr-2 h-4 w-4" />
              Manage Staff
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HospitalDashboard;
