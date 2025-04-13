import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Calendar, Heart, Pill } from "lucide-react";
import { HomeNursingSection } from "@/components/features/HomeNursingSection";

const stats = [
  {
    title: "Heart Rate",
    value: "72 BPM",
    description: "Normal range",
    icon: Heart,
    color: "text-red-500",
  },
  {
    title: "Blood Pressure",
    value: "120/80",
    description: "Normal range",
    icon: Activity,
    color: "text-blue-500",
  },
  {
    title: "Medications",
    value: "2",
    description: "Due today",
    icon: Pill,
    color: "text-purple-500",
  },
  {
    title: "Appointments",
    value: "1",
    description: "This week",
    icon: Calendar,
    color: "text-green-500",
  },
];

const IndividualDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome to Melophile</h2>
        <p className="text-muted-foreground">
          Here's an overview of your health statistics and upcoming schedule
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Activity tracker and other sections would go here */}
      
      {/* Home Nursing Section */}
      <section className="mt-8">
        <HomeNursingSection />
      </section>
    </div>
  );
};

export default IndividualDashboard;
