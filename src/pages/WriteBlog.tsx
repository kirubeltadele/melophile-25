
import React from 'react';
import BlogEditor from '@/components/features/BlogEditor';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

const WriteBlog = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePublishBlog = (blogData: any) => {
    // In a real app, this would send the data to an API
    console.log('Published blog:', blogData);
    
    toast({
      title: "Success!",
      description: "Your health tip has been published successfully",
    });
    
    // Navigate to the health tips page after publishing
    setTimeout(() => {
      navigate('/health-tips');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-melophile-800">Write Health Tip</h1>
        <p className="text-gray-600">Share your knowledge and help others stay healthy</p>
      </div>
      
      <BlogEditor onPublish={handlePublishBlog} />
    </div>
  );
};

export default WriteBlog;
