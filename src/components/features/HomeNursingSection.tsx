
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface NurseCardProps {
  id: string;
  name: string;
  image: string;
  specialty: string;
  rating: number;
  availability: string;
}

const nursesList: NurseCardProps[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    image: "/general-logo.jpg",
    specialty: "Geriatric Care",
    rating: 4.8,
    availability: "Available Today"
  },
  {
    id: "2",
    name: "Michael Chen",
    image: "/general-logo.jpg",
    specialty: "Rehabilitation",
    rating: 4.9,
    availability: "Available Tomorrow"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    image: "/general-logo.jpg",
    specialty: "Chronic Care",
    rating: 4.7,
    availability: "Available Today"
  },
  {
    id: "4",
    name: "David Wilson",
    image: "/general-logo.jpg",
    specialty: "Post-Surgery Care",
    rating: 4.6,
    availability: "Available Friday"
  }
];

const NurseCard = ({ name, image, specialty, rating, availability }: NurseCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 border border-primary/10">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="text-sm">{specialty}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {availability}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full" size="sm">
          Book Nurse
        </Button>
      </CardFooter>
    </Card>
  );
};

export const HomeNursingSection = () => {
  const navigate = useNavigate();
  
  const handleViewAllClick = () => {
    // Navigate to a dedicated home nursing page when implemented
    navigate("/home-nursing");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Home Nursing Care</h2>
          <p className="text-muted-foreground">Book professional nursing care services at your home</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {nursesList.map((nurse) => (
          <NurseCard key={nurse.id} {...nurse} />
        ))}
      </div>
      
      <div className="flex justify-center mt-6">
        <Button onClick={handleViewAllClick} className="px-8 bg-purple-600 hover:bg-purple-700">
          View All Home Nursing Services
        </Button>
      </div>
    </div>
  );
};
