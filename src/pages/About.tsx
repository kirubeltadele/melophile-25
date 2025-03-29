
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Clock,
  FileText,
  UploadCloud,
  Edit
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthContext";

const About = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Dummy data for demo purposes
  const profileData = {
    pharmacy: {
      name: "MediCare Pharmacy",
      description: "A leading pharmacy providing quality medications and healthcare products to the community since 2005.",
      address: "Bole Road, Addis Ababa, Ethiopia",
      phone: "+251 911 234567",
      email: "info@medicarepharmacy.com",
      license: "PHA-2022-1234",
      operatingHours: "Monday - Saturday: 8:00 AM - 8:00 PM, Sunday: 9:00 AM - 6:00 PM",
      specialties: ["Prescription Medications", "OTC Products", "Medical Supplies", "Home Healthcare"],
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
    },
    hospital: {
      name: "St. Gabriel Hospital",
      description: "A premier healthcare institution committed to providing exceptional medical services and compassionate patient care.",
      address: "Kazanchis, Addis Ababa, Ethiopia",
      phone: "+251 911 987654",
      email: "info@stgabriel.com",
      established: "1998",
      facilities: ["Emergency Services", "Intensive Care Unit", "Surgical Center", "Maternity Ward", "Diagnostic Imaging", "Laboratory Services"],
      specialists: 45,
      beds: 200,
      avatar: "https://randomuser.me/api/portraits/lego/2.jpg"
    },
    consultant: {
      name: "Dr. Haile Girma",
      title: "Senior Medical Consultant",
      specialty: "Cardiology",
      description: "Experienced cardiologist with over 15 years of practice in diagnosing and treating cardiovascular conditions.",
      education: [
        "MD, Addis Ababa University (2005)",
        "Cardiology Specialization, Johns Hopkins University (2010)"
      ],
      experience: [
        "Senior Cardiologist, Black Lion Hospital (2010-2018)",
        "Medical Consultant, St. Gabriel Hospital (2018-Present)"
      ],
      certifications: ["Ethiopian Medical Board Certification", "American College of Cardiology"],
      languages: ["Amharic", "English", "French"],
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  };
  
  // Reviews data
  const reviews = [
    {
      id: "1",
      name: "Abebe Kebede",
      rating: 5,
      comment: "Excellent service and very knowledgeable staff. Highly recommended!",
      date: "2023-05-15",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: "2",
      name: "Sara Hailu",
      rating: 4,
      comment: "Very professional and helpful. The consultation was very thorough.",
      date: "2023-04-22",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: "3",
      name: "Daniel Tesfaye",
      rating: 5,
      comment: "Outstanding experience. The staff was friendly and the service was quick.",
      date: "2023-03-10",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];
  
  // Get the appropriate profile data based on user role
  const getProfileData = () => {
    switch (user?.role) {
      case "pharmacy":
        return profileData.pharmacy;
      case "hospital":
        return profileData.hospital;
      case "consultant":
        return profileData.consultant;
      default:
        return null;
    }
  };
  
  const handleFileUpload = () => {
    toast({
      title: "License Uploaded",
      description: "Your license has been successfully uploaded for verification.",
    });
  };
  
  const handleEditProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const currentProfile = getProfileData();
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
      />
    ));
  };
  
  // Renders different content based on user role
  const renderContent = () => {
    if (!currentProfile) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500">Profile information not available.</p>
        </div>
      );
    }
    
    if (user?.role === "pharmacy") {
      return (
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="license">License & Permits</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pharmacy Information</CardTitle>
                  <CardDescription>View and edit your pharmacy details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={currentProfile.avatar} alt={currentProfile.name} />
                        <AvatarFallback>{currentProfile.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" className="mt-4 flex items-center gap-2">
                        <UploadCloud className="h-4 w-4" />
                        Change Photo
                      </Button>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Pharmacy Name</Label>
                          <Input id="name" defaultValue={currentProfile.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="license">License Number</Label>
                          <Input id="license" defaultValue={currentProfile.license} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          defaultValue={currentProfile.description}
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue={currentProfile.phone} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" defaultValue={currentProfile.email} type="email" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue={currentProfile.address} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="hours">Operating Hours</Label>
                        <Textarea
                          id="hours"
                          defaultValue={currentProfile.operatingHours}
                          rows={2}
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleEditProfile}>
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="license" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>License & Permits</CardTitle>
                  <CardDescription>Upload and manage your pharmacy licenses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border rounded-md p-6 flex flex-col items-center justify-center text-center">
                    <FileText className="h-10 w-10 text-gray-400 mb-4" />
                    <h3 className="font-medium text-lg">Upload Pharmacy License</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Drag and drop your license file or click to browse
                    </p>
                    <Button onClick={handleFileUpload} className="flex items-center gap-2">
                      <UploadCloud className="h-4 w-4" />
                      Upload License
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-6 flex flex-col items-center justify-center text-center">
                    <FileText className="h-10 w-10 text-gray-400 mb-4" />
                    <h3 className="font-medium text-lg">Upload Selling Permit</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Drag and drop your permit file or click to browse
                    </p>
                    <Button onClick={handleFileUpload} className="flex items-center gap-2">
                      <UploadCloud className="h-4 w-4" />
                      Upload Permit
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md bg-gray-50">
                    <h3 className="font-medium">Current License Information</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm flex items-center">
                        <span className="font-medium w-40">License Number:</span> 
                        {currentProfile.license}
                      </p>
                      <p className="text-sm flex items-center">
                        <span className="font-medium w-40">Issue Date:</span> 
                        January 15, 2022
                      </p>
                      <p className="text-sm flex items-center">
                        <span className="font-medium w-40">Expiry Date:</span> 
                        January 14, 2024
                      </p>
                      <p className="text-sm flex items-center">
                        <span className="font-medium w-40">Status:</span> 
                        <span className="text-green-600 font-medium">Active</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>See what customers are saying about your pharmacy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">Average Rating</p>
                      <div className="flex items-center mt-1">
                        {renderStars(4.7)}
                        <span className="ml-2 text-lg font-bold">4.7</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Total Reviews</p>
                      <p className="text-lg font-bold text-center">{reviews.length}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <div key={review.id} className="border rounded-md p-4">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={review.avatar} alt={review.name} />
                              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{review.name}</p>
                              <div className="flex items-center mt-0.5">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {review.date}
                          </div>
                        </div>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="outline">View All Reviews</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      );
    }
    
    if (user?.role === "hospital") {
      const hospital = currentProfile as typeof profileData.hospital;
      
      return (
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hospital Information</CardTitle>
                  <CardDescription>View and edit your hospital details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={hospital.avatar} alt={hospital.name} />
                        <AvatarFallback>{hospital.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" className="mt-4 flex items-center gap-2">
                        <UploadCloud className="h-4 w-4" />
                        Change Logo
                      </Button>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Hospital Name</Label>
                          <Input id="name" defaultValue={hospital.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="established">Established</Label>
                          <Input id="established" defaultValue={hospital.established} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          defaultValue={hospital.description}
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue={hospital.phone} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" defaultValue={hospital.email} type="email" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue={hospital.address} />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="specialists">Number of Specialists</Label>
                          <Input id="specialists" defaultValue={hospital.specialists.toString()} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="beds">Number of Beds</Label>
                          <Input id="beds" defaultValue={hospital.beds.toString()} />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleEditProfile}>
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="facilities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hospital Facilities</CardTitle>
                  <CardDescription>Manage information about your hospital facilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Available Facilities</Label>
                      <div className="flex flex-wrap gap-2">
                        {hospital.facilities.map((facility, index) => (
                          <div key={index} className="bg-melophile-50 text-melophile-700 px-3 py-1 rounded-full flex items-center">
                            {facility}
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 ml-1">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Input placeholder="Add new facility..." />
                      <Button>Add</Button>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-2">Equipment & Technology</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>MRI Scanner</li>
                        <li>CT Scanner</li>
                        <li>Digital X-Ray</li>
                        <li>Advanced Laboratory</li>
                        <li>Ultrasound Machines</li>
                      </ul>
                      <Button variant="outline" className="mt-4">Add Equipment</Button>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-2">Departments</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Emergency Medicine</li>
                        <li>Surgery</li>
                        <li>Pediatrics</li>
                        <li>Obstetrics & Gynecology</li>
                        <li>Internal Medicine</li>
                        <li>Cardiology</li>
                        <li>Orthopedics</li>
                      </ul>
                      <Button variant="outline" className="mt-4">Add Department</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Reviews</CardTitle>
                  <CardDescription>See what patients are saying about your hospital</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">Average Rating</p>
                      <div className="flex items-center mt-1">
                        {renderStars(4.5)}
                        <span className="ml-2 text-lg font-bold">4.5</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Total Reviews</p>
                      <p className="text-lg font-bold text-center">{reviews.length}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <div key={review.id} className="border rounded-md p-4">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={review.avatar} alt={review.name} />
                              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{review.name}</p>
                              <div className="flex items-center mt-0.5">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {review.date}
                          </div>
                        </div>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="outline">View All Reviews</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      );
    }
    
    if (user?.role === "consultant") {
      const consultant = currentProfile as typeof profileData.consultant;
      
      return (
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>View and edit your consultant profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={consultant.avatar} alt={consultant.name} />
                        <AvatarFallback>{consultant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" className="mt-4 flex items-center gap-2">
                        <UploadCloud className="h-4 w-4" />
                        Change Photo
                      </Button>
                      <div className="flex items-center mt-4">
                        {renderStars(5)}
                        <span className="ml-2 font-medium">5.0</span>
                      </div>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue={consultant.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input id="title" defaultValue={consultant.title} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="specialty">Specialty</Label>
                        <Input id="specialty" defaultValue={consultant.specialty} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">About Me</Label>
                        <Textarea
                          id="description"
                          defaultValue={consultant.description}
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="languages">Languages</Label>
                        <Input 
                          id="languages" 
                          defaultValue={consultant.languages.join(", ")} 
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleEditProfile}>
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="qualifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Education & Experience</CardTitle>
                  <CardDescription>Manage your qualifications and work experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Education</h3>
                    <div className="space-y-3">
                      {consultant.education.map((edu, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <p className="font-medium">{edu}</p>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-3">
                      Add Education
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2">Work Experience</h3>
                    <div className="space-y-3">
                      {consultant.experience.map((exp, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <p className="font-medium">{exp}</p>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-3">
                      Add Experience
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2">Certifications</h3>
                    <div className="space-y-3">
                      {consultant.certifications.map((cert, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <p className="font-medium">{cert}</p>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-3">
                      Add Certification
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Reviews</CardTitle>
                  <CardDescription>See what patients are saying about your consultations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">Average Rating</p>
                      <div className="flex items-center mt-1">
                        {renderStars(5)}
                        <span className="ml-2 text-lg font-bold">5.0</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Total Reviews</p>
                      <p className="text-lg font-bold text-center">{reviews.length}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <div key={review.id} className="border rounded-md p-4">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={review.avatar} alt={review.name} />
                              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{review.name}</p>
                              <div className="flex items-center mt-0.5">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {review.date}
                          </div>
                        </div>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="outline">View All Reviews</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-melophile-800">
          {user?.role === "pharmacy" && "About Pharmacy"}
          {user?.role === "hospital" && "About Hospital"}
          {user?.role === "consultant" && "About Me"}
        </h1>
        <p className="text-gray-600">
          {user?.role === "pharmacy" && "Manage your pharmacy information and licensing"}
          {user?.role === "hospital" && "Manage your hospital profile and facilities"}
          {user?.role === "consultant" && "Manage your professional profile and qualifications"}
        </p>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default About;
