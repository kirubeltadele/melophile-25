
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Plus,
  User,
  Phone,
  Calendar,
  Clock,
  FileText,
  Mail,
  MessageCircle,
  Video,
  MoreHorizontal,
  ChevronDown
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Mock data for patients
const patientsData = [
  {
    id: "PT-1001",
    name: "Abebe Kebede",
    gender: "Male",
    age: 45,
    contactNumber: "+251 911 123456",
    email: "abebe.k@example.com",
    lastVisit: "2023-05-28",
    nextAppointment: "2023-06-05",
    condition: "Hypertension",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: "PT-1002",
    name: "Sara Hailu",
    gender: "Female",
    age: 32,
    contactNumber: "+251 911 234567",
    email: "sara.h@example.com",
    lastVisit: "2023-05-20",
    nextAppointment: "2023-06-10",
    condition: "Diabetes Type 2",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: "PT-1003",
    name: "Daniel Tesfaye",
    gender: "Male",
    age: 28,
    contactNumber: "+251 911 345678",
    email: "daniel.t@example.com",
    lastVisit: "2023-05-15",
    nextAppointment: null,
    condition: "Asthma",
    status: "Inactive",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: "PT-1004",
    name: "Hiwot Girma",
    gender: "Female",
    age: 50,
    contactNumber: "+251 911 456789",
    email: "hiwot.g@example.com",
    lastVisit: "2023-05-30",
    nextAppointment: "2023-06-15",
    condition: "Arthritis",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    id: "PT-1005",
    name: "Solomon Bekele",
    gender: "Male",
    age: 36,
    contactNumber: "+251 911 567890",
    email: "solomon.b@example.com",
    lastVisit: "2023-04-25",
    nextAppointment: "2023-06-08",
    condition: "Anxiety Disorder",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    id: "PT-1006",
    name: "Meron Tadesse",
    gender: "Female",
    age: 42,
    contactNumber: "+251 911 678901",
    email: "meron.t@example.com",
    lastVisit: "2023-05-10",
    nextAppointment: "2023-06-12",
    condition: "Migraine",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg"
  },
];

// Medical history data for selected patient
const medicalHistoryData = [
  {
    date: "2023-05-28",
    type: "Consultation",
    description: "Follow-up consultation for hypertension. Blood pressure readings improved.",
    doctor: "Dr. Girma Haile"
  },
  {
    date: "2023-04-15",
    type: "Prescription",
    description: "Prescribed Lisinopril 10mg daily for hypertension.",
    doctor: "Dr. Girma Haile"
  },
  {
    date: "2023-03-02",
    type: "Lab Test",
    description: "Complete blood work done. Results normal except for slightly elevated cholesterol.",
    doctor: "Dr. Girma Haile"
  },
  {
    date: "2023-01-20",
    type: "Consultation",
    description: "Initial consultation for headaches and dizziness. Diagnosed with hypertension.",
    doctor: "Dr. Girma Haile"
  },
];

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState<typeof patientsData[0] | null>(null);
  
  const filteredPatients = patientsData.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || 
      (filterStatus === "active" && patient.status === "Active") ||
      (filterStatus === "inactive" && patient.status === "Inactive");
    
    return matchesSearch && matchesFilter;
  });
  
  const handleSelectPatient = (patient: typeof patientsData[0]) => {
    setSelectedPatient(patient);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-melophile-800">Patients</h1>
          <p className="text-gray-600">Manage your patient records and information</p>
        </div>
        
        <Button className="bg-melophile-600 hover:bg-melophile-700 flex items-center">
          <Plus className="mr-2 h-4 w-4" /> Add Patient
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="bg-melophile-100 p-2 rounded-full">
                <User className="h-5 w-5 text-melophile-600" />
              </div>
              <span className="text-2xl font-bold">{patientsData.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 p-2 rounded-full">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-2xl font-bold">
                {patientsData.filter(p => p.status === "Active").length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Appointments Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-2xl font-bold">0</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">New This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="bg-purple-100 p-2 rounded-full">
                <Plus className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-2xl font-bold">2</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search patients..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Tabs value={filterStatus} onValueChange={setFilterStatus} className="w-full md:w-auto">
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Patient List</CardTitle>
              <CardDescription>View and manage your patients</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <TableRow key={patient.id} onClick={() => handleSelectPatient(patient)} className="cursor-pointer hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={patient.avatar} alt={patient.name} />
                              <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{patient.name}</div>
                              <div className="text-xs text-gray-500">
                                {patient.gender}, {patient.age} years
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{patient.id}</TableCell>
                        <TableCell>{patient.condition}</TableCell>
                        <TableCell>
                          <Badge variant={patient.status === "Active" ? "default" : "outline"}>
                            {patient.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Patient</DropdownMenuItem>
                              <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                {patient.status === "Active" ? "Mark as Inactive" : "Mark as Active"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No patients found matching your search criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <div>
          {selectedPatient ? (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Patient Details</CardTitle>
                    <CardDescription>{selectedPatient.id}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedPatient(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedPatient.avatar} alt={selectedPatient.name} />
                    <AvatarFallback>{selectedPatient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-2 font-bold text-lg">{selectedPatient.name}</h3>
                  <Badge className="mt-1">{selectedPatient.status}</Badge>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500 w-24">Age & Gender:</span>
                    <span className="text-sm">{selectedPatient.age} years, {selectedPatient.gender}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500 w-24">Contact:</span>
                    <span className="text-sm">{selectedPatient.contactNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500 w-24">Email:</span>
                    <span className="text-sm">{selectedPatient.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500 w-24">Condition:</span>
                    <span className="text-sm">{selectedPatient.condition}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500 w-24">Last Visit:</span>
                    <span className="text-sm">{selectedPatient.lastVisit}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500 w-24">Next Appt:</span>
                    <span className="text-sm">
                      {selectedPatient.nextAppointment || "Not scheduled"}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <h4 className="font-medium text-sm">Medical History</h4>
                  <ScrollArea className="h-48 rounded-md border p-2">
                    <div className="space-y-3">
                      {medicalHistoryData.map((entry, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">{entry.date}</span>
                            <Badge variant="outline" className="text-xs">
                              {entry.type}
                            </Badge>
                          </div>
                          <p className="text-sm">{entry.description}</p>
                          <p className="text-xs text-gray-500">{entry.doctor}</p>
                          {index < medicalHistoryData.length - 1 && <Separator className="my-2" />}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1 flex items-center justify-center">
                    <Video className="h-4 w-4 mr-2" />
                    Video Call
                  </Button>
                  <Button variant="outline" className="flex-1 flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Patient Details</CardTitle>
                <CardDescription>Select a patient to view details</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <User className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500">No patient selected</p>
                <p className="text-xs text-gray-400">Click on a patient from the list to view their details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Patients;
