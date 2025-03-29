
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { 
  UserCheck, 
  Star, 
  MessageCircle,
  FileText,
  Stethoscope, 
  Calendar,
  MapPin,
  Mail,
  Phone,
  Edit
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/AuthContext";
import { Progress } from "@/components/ui/progress";

// Mock data for consultant profile
const consultantProfile = {
  specializations: ["Cardiology", "Internal Medicine"],
  experience: "15+ years",
  education: [
    { degree: "MD", institution: "Addis Ababa University", year: "2005" },
    { degree: "Cardiology Specialist", institution: "Black Lion Hospital", year: "2010" }
  ],
  languages: ["Amharic", "English", "French"],
  workingHours: "Mon-Fri: 9:00 AM - 5:00 PM",
  address: "Bole, Addis Ababa, Ethiopia",
  email: "tigist@health.com",
  phone: "+251 91 234 5678",
  about: "Dr. Tigist Haile is a board-certified cardiologist with over 15 years of experience in diagnosing and treating heart conditions. She specializes in preventive cardiology and heart failure management. She is committed to providing patient-centered care and empowering patients through health education.",
  averageRating: 4.8,
  totalReviews: 124
};

// Mock reviews
const reviews = [
  {
    id: "review-001",
    patientName: "Abebe Kebede",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    date: "2023-05-20",
    comment: "Dr. Tigist was very thorough and took the time to explain everything to me. Her recommendations have greatly improved my condition.",
    helpful: 12
  },
  {
    id: "review-002",
    patientName: "Sara Hailu",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 5,
    date: "2023-05-15",
    comment: "Excellent doctor who truly cares about her patients. She is knowledgeable and compassionate.",
    helpful: 8
  },
  {
    id: "review-003",
    patientName: "Daniel Tesfaye",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 4,
    date: "2023-05-10",
    comment: "Dr. Tigist provided great care. The only reason for 4 stars is the long waiting time at her clinic.",
    helpful: 5
  },
];

// Publications mock data
const publications = [
  {
    id: "pub-001",
    title: "Hypertension Management in Ethiopian Adults: Current Status and Future Directions",
    journal: "Ethiopian Medical Journal",
    year: "2022",
    url: "#"
  },
  {
    id: "pub-002",
    title: "Impact of Digital Health Interventions on Cardiovascular Outcomes in Rural Ethiopia",
    journal: "Journal of Telemedicine and Telecare",
    year: "2021",
    url: "#"
  },
  {
    id: "pub-003",
    title: "Prevalence of Risk Factors for Cardiovascular Disease in Addis Ababa",
    journal: "African Journal of Cardiology",
    year: "2019",
    url: "#"
  }
];

const AboutConsultant = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  const getRatingStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-melophile-800">Consultant Profile</h1>
          <p className="text-gray-600">Manage your professional profile and information</p>
        </div>
        
        <Button className="bg-melophile-600 hover:bg-melophile-700">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user?.profileImage} alt={user?.name} />
                  <AvatarFallback>
                    {user?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center">
                  <h2 className="text-xl font-bold">{user?.name}</h2>
                  <p className="text-gray-500 mb-2">{consultantProfile.specializations.join(", ")}</p>
                  
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {getRatingStars(consultantProfile.averageRating)}
                    <span className="text-sm font-medium ml-1">{consultantProfile.averageRating.toFixed(1)}</span>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    {consultantProfile.totalReviews} reviews
                  </p>
                </div>
                
                <div className="w-full space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{consultantProfile.experience} experience</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Stethoscope className="h-4 w-4 mr-2" />
                    <span className="text-sm">{consultantProfile.education[0].degree}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{consultantProfile.address}</span>
                  </div>
                </div>
                
                <div className="w-full space-y-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-600" />
                    <span className="text-sm">{consultantProfile.email}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-600" />
                    <span className="text-sm">{consultantProfile.phone}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span>Patient Satisfaction</span>
                    <span className="font-medium">96%</span>
                  </div>
                  <Progress value={96} className="h-2 bg-gray-200" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span>Response Rate</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2 bg-gray-200" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span>Appointments Completed</span>
                    <span className="font-medium">98%</span>
                  </div>
                  <Progress value={98} className="h-2 bg-gray-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    {consultantProfile.about}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Education</h3>
                      <div className="space-y-3">
                        {consultantProfile.education.map((edu, index) => (
                          <div key={index} className="flex items-start">
                            <div className="mr-2 mt-0.5">
                              <div className="w-2 h-2 bg-melophile-600 rounded-full"></div>
                            </div>
                            <div>
                              <p className="font-medium">{edu.degree}</p>
                              <p className="text-sm text-gray-600">{edu.institution}, {edu.year}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Specializations</h3>
                      <div className="flex flex-wrap gap-2">
                        {consultantProfile.specializations.map((spec, index) => (
                          <Badge key={index} variant="secondary">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="font-medium mb-3 mt-6">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {consultantProfile.languages.map((lang, index) => (
                          <Badge key={index} variant="outline">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Working Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monday</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tuesday</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wednesday</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Thursday</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Friday</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 AM - 2:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Patient Reviews</CardTitle>
                    <CardDescription>See what patients say about your care</CardDescription>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {getRatingStars(consultantProfile.averageRating)}
                      </div>
                      <span className="text-xl font-bold">{consultantProfile.averageRating.toFixed(1)}/5</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Based on {consultantProfile.totalReviews} reviews
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.avatar} alt={review.patientName} />
                          <AvatarFallback>{review.patientName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h4 className="font-medium">{review.patientName}</h4>
                            <div className="flex items-center mt-1 sm:mt-0">
                              <div className="flex">
                                {getRatingStars(review.rating)}
                              </div>
                              <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                            </div>
                          </div>
                          
                          <p className="mt-2 text-gray-600">{review.comment}</p>
                          
                          <div className="mt-3 flex items-center space-x-4">
                            <Button variant="outline" size="sm" className="text-xs flex items-center">
                              <MessageCircle className="h-3 w-3 mr-1" />
                              Reply
                            </Button>
                            
                            <Button variant="ghost" size="sm" className="text-xs flex items-center">
                              <span className="mr-1">{review.helpful}</span>
                              <span>found this helpful</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">View All Reviews</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="publications">
              <Card>
                <CardHeader>
                  <CardTitle>Publications</CardTitle>
                  <CardDescription>Research papers and medical publications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {publications.map((publication) => (
                    <div key={publication.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="flex space-x-4">
                        <div className="mt-0.5">
                          <FileText className="h-5 w-5 text-melophile-600" />
                        </div>
                        
                        <div>
                          <h4 className="font-medium">{publication.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {publication.journal} • {publication.year}
                          </p>
                          
                          <div className="mt-3">
                            <Button variant="link" className="text-sm px-0 h-auto" asChild>
                              <a href={publication.url} target="_blank" rel="noopener noreferrer">
                                View Publication
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Add Publication</Button>
                  <Button variant="outline">View All Publications</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AboutConsultant;
