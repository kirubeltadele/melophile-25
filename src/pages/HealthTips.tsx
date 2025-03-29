
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import BlogPost from "@/components/features/BlogPost";

// Sample blog data
const blogPosts = [
  {
    id: "blog-1",
    title: "The Importance of Hydration for Overall Health",
    summary: "Learn why staying hydrated is crucial for your body and mind, and discover practical tips to increase your daily water intake.",
    content: `<p>Water is essential for virtually every function in the human body. From regulating body temperature to supporting digestion, adequate hydration plays a critical role in maintaining optimal health.</p>
      <p>The average adult human body is composed of approximately 60% water, highlighting its significance. Dehydration, even mild, can lead to decreased cognitive function, fatigue, headaches, and impaired physical performance.</p>
      <h3>Benefits of Staying Hydrated</h3>
      <ul>
        <li>Improved cognitive function and mood</li>
        <li>Enhanced physical performance</li>
        <li>Better digestion and nutrient absorption</li>
        <li>Healthier skin appearance</li>
        <li>Support for kidney function and toxin elimination</li>
      </ul>
      <p>To maintain proper hydration, aim to drink at least 8 glasses of water daily, and adjust based on factors such as activity level, climate, and individual health needs.</p>`,
    author: {
      name: "Dr. Haile Girma",
      role: "Nutritionist",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    publishedDate: "2023-06-15",
    category: "Nutrition",
    tags: ["hydration", "water", "health", "nutrition"],
    likesCount: 124,
    commentsCount: 18
  },
  {
    id: "blog-2",
    title: "Understanding Common Medication Side Effects",
    summary: "Side effects from medications can range from mild to severe. This guide helps you understand what to expect and when to consult your healthcare provider.",
    content: "<p>Detailed content about medication side effects...</p>",
    author: {
      name: "Dr. Sara Mengistu",
      role: "Pharmacist",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    publishedDate: "2023-06-10",
    category: "Medication",
    tags: ["medication", "side effects", "health", "pharmacy"],
    likesCount: 98,
    commentsCount: 24
  },
  {
    id: "blog-3",
    title: "Mental Health Practices for Daily Wellness",
    summary: "Incorporate these simple mental health practices into your daily routine to improve overall wellbeing and resilience.",
    content: "<p>Detailed content about mental health practices...</p>",
    author: {
      name: "Dr. Daniel Bekele",
      role: "Mental Health Specialist",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg"
    },
    publishedDate: "2023-06-05",
    category: "Mental Health",
    tags: ["mental health", "wellness", "self-care", "mindfulness"],
    likesCount: 156,
    commentsCount: 32
  },
  {
    id: "blog-4",
    title: "Seasonal Allergies: Prevention and Treatment",
    summary: "Learn how to identify, prevent, and treat seasonal allergies for more comfortable living throughout the year.",
    content: "<p>Detailed content about seasonal allergies...</p>",
    author: {
      name: "Dr. Tigist Abebe",
      role: "Allergist",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    publishedDate: "2023-05-28",
    category: "Allergies",
    tags: ["allergies", "seasonal", "treatment", "health"],
    likesCount: 87,
    commentsCount: 15
  }
];

const categories = ["All", "Nutrition", "Medication", "Mental Health", "Exercise", "Allergies"];

const HealthTips = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-melophile-800">Health Tips & News</h1>
          <p className="text-gray-600">Stay informed with the latest health tips and medical news</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search health tips..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-shrink-0">
          <Tabs 
            defaultValue="All" 
            value={activeCategory} 
            onValueChange={setActiveCategory}
            className="w-full md:w-auto"
          >
            <TabsList className="grid grid-cols-3 md:flex md:flex-wrap">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <BlogPost 
              key={post.id}
              id={post.id}
              title={post.title}
              summary={post.summary}
              content={post.content}
              author={post.author}
              publishedDate={post.publishedDate}
              category={post.category}
              tags={post.tags}
              likesCount={post.likesCount}
              commentsCount={post.commentsCount}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-10">
            <p className="text-gray-500">No health tips found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthTips;
