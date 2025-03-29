
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface BlogEditorProps {
  onPublish?: (blogData: any) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onPublish }) => {
  const { toast } = useToast();
  
  const [blogData, setBlogData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    tags: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBlogData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setBlogData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create a blog post object
    const newPost = {
      id: `blog-${Date.now()}`,
      title: blogData.title,
      summary: blogData.summary,
      content: blogData.content,
      category: blogData.category,
      tags: blogData.tags.split(',').map(tag => tag.trim()),
      publishedDate: new Date().toISOString(),
      likesCount: 0,
      commentsCount: 0
    };
    
    // Simulate API call delay
    setTimeout(() => {
      if (onPublish) {
        onPublish(newPost);
      }
      
      toast({
        title: "Blog Post Published",
        description: "Your health tip has been successfully published.",
      });
      
      // Reset form
      setBlogData({
        title: '',
        summary: '',
        content: '',
        category: '',
        tags: '',
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Write a Health Tip</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter a descriptive title"
              value={blogData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              placeholder="Write a brief summary of your health tip"
              value={blogData.summary}
              onChange={handleChange}
              className="h-20"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Write your health tip content here. You can use basic HTML for formatting."
              value={blogData.content}
              onChange={handleChange}
              className="h-48 font-mono text-sm"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                onValueChange={handleCategoryChange}
                value={blogData.category}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nutrition">Nutrition</SelectItem>
                  <SelectItem value="Medication">Medication</SelectItem>
                  <SelectItem value="Mental Health">Mental Health</SelectItem>
                  <SelectItem value="Exercise">Exercise</SelectItem>
                  <SelectItem value="Allergies">Allergies</SelectItem>
                  <SelectItem value="General Health">General Health</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="Comma-separated tags"
                value={blogData.tags}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogEditor;
