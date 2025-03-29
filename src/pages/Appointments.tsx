
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  User,
  MessageCircle,
  Check,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { format } from "date-fns";

// Mock data for appointments
const appointmentData = [
  {
    id: "APT-001",
    patient: "Abebe Kebede",
    patientAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    date: "2023-06-02",
    time: "10:00",
    duration: 30,
    type: "Video",
    status: "Confirmed",
    notes: "Follow-up consultation regarding medication side effects."
  },
  {
    id: "APT-002",
    patient: "Sara Hailu",
    patientAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
    date: "2023-06-02",
    time: "11:30",
    duration: 45,
    type: "In-person",
    status: "Confirmed",
    notes: "Initial consultation for chronic back pain."
  },
  {
    id: "APT-003",
    patient: "Daniel Tesfaye",
    patientAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
    date: "2023-06-02",
    time: "14:00",
    duration: 30,
    type: "Video",
    status: "Pending",
    notes: "Discussion of test results."
  },
  {
    id: "APT-004",
    patient: "Hiwot Girma",
    patientAvatar: "https://randomuser.me/api/portraits/women/4.jpg",
    date: "2023-06-03",
    time: "09:30",
    duration: 60,
    type: "In-person",
    status: "Confirmed",
    notes: "Annual physical examination."
  },
  {
    id: "APT-005",
    patient: "Solomon Bekele",
    patientAvatar: "https://randomuser.me/api/portraits/men/5.jpg",
    date: "2023-06-03",
    time: "13:00",
    duration: 30,
    type: "Video",
    status: "Cancelled",
    notes: "Prescription renewal consultation."
  },
  {
    id: "APT-006",
    patient: "Meron Tadesse",
    patientAvatar: "https://randomuser.me/api/portraits/women/6.jpg",
    date: "2023-06-03",
    time: "15:30",
    duration: 45,
    type: "Chat",
    status: "Confirmed",
    notes: "Discussion about recent test results."
  },
  {
    id: "APT-007",
    patient: "Dawit Alemayehu",
    patientAvatar: "https://randomuser.me/api/portraits/men/7.jpg",
    date: "2023-06-04",
    time: "10:00",
    duration: 30,
    type: "Video",
    status: "Confirmed",
    notes: "Follow-up on treatment progress."
  },
];

const Appointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointmentData[0] | null>(null);
  
  // Function to get appointments for selected date
  const getAppointmentsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    const dateString = format(date, "yyyy-MM-dd");
    return appointmentData.filter(appointment => appointment.date === dateString);
  };
  
  // Get appointments based on tab and date selection
  const getFilteredAppointments = () => {
    switch (activeTab) {
      case "upcoming":
        return appointmentData.filter(appointment => {
          // Consider an appointment as upcoming if its status is confirmed or pending
          return ['Confirmed', 'Pending'].includes(appointment.status);
        }).sort((a, b) => {
          // Sort by date and time
          if (a.date === b.date) {
            return a.time < b.time ? -1 : 1;
          }
          return a.date < b.date ? -1 : 1;
        });
      case "past":
        return appointmentData.filter(appointment => {
          // This is simplified - in a real app you would compare with current date/time
          return appointment.status === 'Completed';
        });
      case "cancelled":
        return appointmentData.filter(appointment => appointment.status === 'Cancelled');
      default:
        return [];
    }
  };
  
  const todaysAppointments = getAppointmentsForDate(new Date());
  const filteredAppointments = getFilteredAppointments();
  
  const getBadgeClass = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-4 w-4" />;
      case "In-person":
        return <User className="h-4 w-4" />;
      case "Chat":
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };
  
  const handleSelectAppointment = (appointment: typeof appointmentData[0]) => {
    setSelectedAppointment(appointment);
  };
  
  const handleAction = (action: string) => {
    // In a real app, this would handle appointment actions like confirm, cancel, etc.
    console.log(`Action: ${action} for appointment ${selectedAppointment?.id}`);
    setSelectedAppointment(null);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-melophile-800">Appointments</h1>
        <p className="text-gray-600">Manage your upcoming and past consultations</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled consultations</CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {filteredAppointments.map((appointment) => (
                        <div 
                          key={appointment.id}
                          className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleSelectAppointment(appointment)}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={appointment.patientAvatar} alt={appointment.patient} />
                                <AvatarFallback>{appointment.patient.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{appointment.patient}</p>
                                <div className="flex items-center text-xs text-gray-500">
                                  <CalendarIcon className="h-3 w-3 mr-1" />
                                  {appointment.date} | {appointment.time}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center mt-2 md:mt-0">
                              <Badge variant="outline" className="mr-2 flex items-center">
                                {getTypeIcon(appointment.type)}
                                <span className="ml-1">{appointment.type}</span>
                              </Badge>
                              <Badge className={getBadgeClass(appointment.status)}>
                                {appointment.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No upcoming appointments found.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="past">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Past Appointments</CardTitle>
                  <CardDescription>Your completed consultations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-500">No past appointments to display.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="cancelled">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Cancelled Appointments</CardTitle>
                  <CardDescription>Appointments that were cancelled</CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {filteredAppointments.map((appointment) => (
                        <div 
                          key={appointment.id}
                          className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleSelectAppointment(appointment)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={appointment.patientAvatar} alt={appointment.patient} />
                                <AvatarFallback>{appointment.patient.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{appointment.patient}</p>
                                <div className="flex items-center text-xs text-gray-500">
                                  <CalendarIcon className="h-3 w-3 mr-1" />
                                  {appointment.date} | {appointment.time}
                                </div>
                              </div>
                            </div>
                            <Badge className={getBadgeClass(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No cancelled appointments found.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {selectedAppointment && (
            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Appointment Details</CardTitle>
                  <CardDescription>Details for appointment {selectedAppointment.id}</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedAppointment(null)}>
                  Close
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src={selectedAppointment.patientAvatar} alt={selectedAppointment.patient} />
                    <AvatarFallback>{selectedAppointment.patient.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{selectedAppointment.patient}</h3>
                    <Badge className={getBadgeClass(selectedAppointment.status)}>
                      {selectedAppointment.status}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">
                      Patient ID: PT-{Math.floor(Math.random() * 10000)}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date & Time</p>
                    <p className="font-medium">{selectedAppointment.date} at {selectedAppointment.time}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Duration</p>
                    <p className="font-medium">{selectedAppointment.duration} minutes</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Appointment Type</p>
                    <div className="flex items-center mt-1">
                      {getTypeIcon(selectedAppointment.type)}
                      <span className="ml-1">{selectedAppointment.type} Consultation</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Appointment ID</p>
                    <p className="font-medium">{selectedAppointment.id}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Notes</p>
                  <p className="text-gray-700">{selectedAppointment.notes || "No notes available."}</p>
                </div>
                
                <div className="flex justify-end space-x-2">
                  {selectedAppointment.status === "Pending" && (
                    <>
                      <Button variant="outline" onClick={() => handleAction("cancel")}>
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                      <Button onClick={() => handleAction("confirm")}>
                        <Check className="mr-2 h-4 w-4" />
                        Confirm
                      </Button>
                    </>
                  )}
                  
                  {selectedAppointment.status === "Confirmed" && selectedAppointment.type === "Video" && (
                    <Button>
                      <Video className="mr-2 h-4 w-4" />
                      Start Session
                    </Button>
                  )}
                  
                  {selectedAppointment.status === "Confirmed" && selectedAppointment.type === "Chat" && (
                    <Button>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Start Chat
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view appointments</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mb-4"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Appointments for {date ? format(date, "MMM dd, yyyy") : "Today"}</h3>
                </div>
                
                {getAppointmentsForDate(date).length > 0 ? (
                  <div className="space-y-2">
                    {getAppointmentsForDate(date).map((appointment) => (
                      <div 
                        key={appointment.id}
                        className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleSelectAppointment(appointment)}
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 mr-2">
                            {getTypeIcon(appointment.type)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{appointment.time} ({appointment.duration}m)</p>
                            <p className="text-xs text-gray-500">{appointment.patient}</p>
                          </div>
                        </div>
                        <Badge className={getBadgeClass(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 border rounded-md bg-gray-50">
                    <p className="text-sm text-gray-500">No appointments for this date.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your appointments for today</CardDescription>
            </CardHeader>
            <CardContent>
              {todaysAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todaysAppointments.map((appointment) => (
                    <div 
                      key={appointment.id}
                      className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleSelectAppointment(appointment)}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={appointment.patientAvatar} alt={appointment.patient} />
                          <AvatarFallback>{appointment.patient.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{appointment.time}</p>
                          <p className="text-xs text-gray-500">{appointment.patient}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-2">
                          {getTypeIcon(appointment.type)}
                        </div>
                        <Badge className={getBadgeClass(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No appointments scheduled for today.</p>
                </div>
              )}
              
              <div className="flex justify-center mt-4">
                <Button variant="outline">Schedule New Appointment</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
