
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  Video, 
  MessageCircle, 
  Activity,
  Clock
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

const ConsultantDashboard = () => {
  // Sample data for upcoming appointments
  const upcomingAppointments = [
    { 
      id: "APT-001", 
      patient: "Abebe Kebede", 
      time: "10:00 AM", 
      date: "2023-06-02", 
      type: "Video",
      status: "Confirmed",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    { 
      id: "APT-002", 
      patient: "Sara Hailu", 
      time: "11:30 AM", 
      date: "2023-06-02", 
      type: "In-person",
      status: "Confirmed",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    { 
      id: "APT-003", 
      patient: "Daniel Tesfaye", 
      time: "2:00 PM", 
      date: "2023-06-02", 
      type: "Video",
      status: "Pending",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
  ];

  const getBadgeClass = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 px-2.5 py-0.5 rounded text-xs font-medium";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded text-xs font-medium";
      case "Cancelled":
        return "bg-red-100 text-red-800 px-2.5 py-0.5 rounded text-xs font-medium";
      default:
        return "bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded text-xs font-medium";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-4 w-4 text-melophile-600" />;
      case "In-person":
        return <Users className="h-4 w-4 text-teal-600" />;
      case "Chat":
        return <MessageCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-melophile-800">Consultant Dashboard</h1>
        <p className="text-gray-600">Manage your patients and appointments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-melophile-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-melophile-600" />
                </div>
                <span className="text-2xl font-bold">124</span>
              </div>
              <Button variant="ghost" size="sm" className="text-melophile-600">
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-teal-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-teal-600" />
                </div>
                <span className="text-2xl font-bold">{upcomingAppointments.length}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-teal-600">
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Next Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium">In 45 minutes</span>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                Prepare
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Activity className="h-5 w-5 text-orange-600" />
                </div>
                <span className="text-2xl font-bold">7</span>
              </div>
              <Button variant="ghost" size="sm" className="text-orange-600">
                Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Schedule for the next 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingAppointments.map(appointment => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={appointment.avatar} alt={appointment.patient} />
                          <AvatarFallback>{appointment.patient.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{appointment.patient}</span>
                      </div>
                    </TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getTypeIcon(appointment.type)}
                        <span className="ml-1">{appointment.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={getBadgeClass(appointment.status)}>
                        {appointment.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="mr-2">
                        Details
                      </Button>
                      {appointment.type === "Video" && (
                        <Button size="sm" className="bg-melophile-600 hover:bg-melophile-700">
                          Join
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-center">
              <Button variant="outline">View Full Schedule</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common consultant tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-melophile-600 hover:bg-melophile-700 flex items-center justify-start">
              <Video className="mr-2 h-4 w-4" />
              Start Telemedicine Session
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-start">
              <Users className="mr-2 h-4 w-4" />
              Patient Records
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-start">
              <MessageCircle className="mr-2 h-4 w-4" />
              Send Message
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-start">
              <Activity className="mr-2 h-4 w-4" />
              Create Health Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsultantDashboard;
