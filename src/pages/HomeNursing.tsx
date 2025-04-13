
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HomeNursing = () => {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Home Nursing Services</h1>
        <p className="text-muted-foreground">Find and book professional nursing care at your home</p>
      </div>

      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Service Type</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="geriatric">Geriatric Care</SelectItem>
                  <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
                  <SelectItem value="chronic">Chronic Care</SelectItem>
                  <SelectItem value="post-surgery">Post-Surgery Care</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Availability</label>
              <Select defaultValue="any">
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Location</label>
              <Input placeholder="Your location" />
            </div>
          </div>
          <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Search Nurses</Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="geriatric">Geriatric Care</TabsTrigger>
          <TabsTrigger value="rehabilitation">Rehabilitation</TabsTrigger>
          <TabsTrigger value="chronic">Chronic Care</TabsTrigger>
          <TabsTrigger value="post-surgery">Post-Surgery</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example nurses cards */}
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardHeader className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 border border-primary/10">
                      <AvatarImage src="/general-logo.jpg" />
                      <AvatarFallback>N{index + 1}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Nurse {index + 1}</CardTitle>
                      <CardDescription className="text-sm">
                        {["Geriatric Care", "Rehabilitation", "Chronic Care", "Post-Surgery Care"][index % 4]}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm font-medium">{(4.5 + index * 0.1).toFixed(1)}</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {["Available Today", "Available Tomorrow", "Available Friday"][index % 3]}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm">
                    Experienced nurse with specialized training in patient care and medical assistance.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="default" className="w-full bg-purple-600 hover:bg-purple-700">
                    Book Appointment
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="geriatric">
          <div className="text-center p-12">
            <p>Specialized nurses for elderly care will be displayed here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="rehabilitation">
          <div className="text-center p-12">
            <p>Rehabilitation specialists will be displayed here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="chronic">
          <div className="text-center p-12">
            <p>Chronic condition care specialists will be displayed here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="post-surgery">
          <div className="text-center p-12">
            <p>Post-surgery care specialists will be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomeNursing;
