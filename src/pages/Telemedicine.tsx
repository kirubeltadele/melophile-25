
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Video, MessageCircle, Calendar, Star } from "lucide-react";

// Mock data for consultants
const consultants = [
  {
    id: "1",
    name: "Dr. Haile Girma",
    specialty: "Dietary Consultant",
    rating: 4.8,
    reviewCount: 124,
    yearsExperience: 12,
    availability: "Available Today",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Dr. Sara Mengistu",
    specialty: "Mental Well-being",
    rating: 4.9,
    reviewCount: 89,
    yearsExperience: 8,
    availability: "Available Tomorrow",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    name: "Dr. Daniel Bekele",
    specialty: "Dietary Consultant",
    rating: 4.7,
    reviewCount: 56,
    yearsExperience: 5,
    availability: "Available Today",
    imageUrl: "https://randomuser.me/api/portraits/men/62.jpg",
  },
  {
    id: "4",
    name: "Dr. Tigist Abebe",
    specialty: "Mental Well-being",
    rating: 4.6,
    reviewCount: 78,
    yearsExperience: 7,
    availability: "Available in 2 Days",
    imageUrl: "https://randomuser.me/api/portraits/women/28.jpg",
  },
];

const Telemedicine = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  
  const filteredConsultants = consultants.filter(consultant => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === "" || consultant.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-melophile-800">Telemedicine</h1>
        <p className="text-gray-600">Connect with healthcare professionals online</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Find a Consultant</CardTitle>
              <CardDescription>Search for consultants by name or specialty</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search">Search by Name</Label>
                    <Input
                      id="search"
                      placeholder="Search consultants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-48">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                      <SelectTrigger id="specialty">
                        <SelectValue placeholder="All Specialties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Specialties</SelectItem>
                        <SelectItem value="Dietary Consultant">Dietary Consultant</SelectItem>
                        <SelectItem value="Mental Well-being">Mental Well-being</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4 mt-4">
                  {filteredConsultants.length > 0 ? (
                    filteredConsultants.map(consultant => (
                      <Card key={consultant.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 bg-melophile-50 p-4 flex flex-col items-center justify-center text-center">
                              <Avatar className="h-24 w-24 mb-2">
                                <AvatarImage src={consultant.imageUrl} alt={consultant.name} />
                                <AvatarFallback>{consultant.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <h3 className="font-bold text-lg">{consultant.name}</h3>
                              <p className="text-sm text-gray-600">{consultant.specialty}</p>
                              <div className="flex items-center justify-center mt-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span className="ml-1 text-sm font-medium">{consultant.rating}</span>
                                <span className="text-xs text-gray-500 ml-1">({consultant.reviewCount} reviews)</span>
                              </div>
                              <Badge className="mt-2" variant="outline">{consultant.availability}</Badge>
                            </div>
                            <div className="md:w-2/3 p-4">
                              <div className="mb-4">
                                <h4 className="font-medium text-sm text-gray-500">About</h4>
                                <p className="text-sm mt-1">
                                  Experienced healthcare professional with {consultant.yearsExperience} years of expertise in {consultant.specialty.toLowerCase()}. 
                                  Dedicated to providing personalized care and guidance for optimal health outcomes.
                                </p>
                              </div>
                              <Tabs defaultValue="video">
                                <TabsList className="grid w-full grid-cols-3">
                                  <TabsTrigger value="video">Video Call</TabsTrigger>
                                  <TabsTrigger value="chat">Chat</TabsTrigger>
                                  <TabsTrigger value="appointment">Book</TabsTrigger>
                                </TabsList>
                                <TabsContent value="video" className="mt-4">
                                  <Button className="w-full flex items-center justify-center">
                                    <Video className="mr-2 h-4 w-4" />
                                    Start Video Consultation
                                  </Button>
                                </TabsContent>
                                <TabsContent value="chat" className="mt-4">
                                  <Button className="w-full flex items-center justify-center" variant="outline">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Start Chat Consultation
                                  </Button>
                                </TabsContent>
                                <TabsContent value="appointment" className="mt-4">
                                  <Button className="w-full flex items-center justify-center" variant="outline">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Schedule Appointment
                                  </Button>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No consultants found matching your search criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Consultation Types</CardTitle>
              <CardDescription>Different ways to connect with consultants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-md bg-melophile-50">
                <div className="flex items-center mb-2">
                  <Video className="h-5 w-5 text-melophile-600 mr-2" />
                  <h3 className="font-medium">Video Consultation</h3>
                </div>
                <p className="text-sm text-gray-600">Connect face-to-face with your consultant through a secure video call.</p>
              </div>
              
              <div className="p-4 rounded-md bg-blue-50">
                <div className="flex items-center mb-2">
                  <MessageCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-medium">Chat Consultation</h3>
                </div>
                <p className="text-sm text-gray-600">Text-based consultation for non-urgent health inquiries.</p>
              </div>
              
              <div className="p-4 rounded-md bg-green-50">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-medium">Scheduled Appointment</h3>
                </div>
                <p className="text-sm text-gray-600">Book a future appointment at your preferred time.</p>
              </div>
              
              <Button variant="outline" className="w-full mt-4">View All Consultants</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Telemedicine;
