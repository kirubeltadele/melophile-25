
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageSquare, Share2, BookmarkPlus } from "lucide-react";

interface BlogPostProps {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedDate: string;
  category: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  isDetailed?: boolean;
}

const BlogPost: React.FC<BlogPostProps> = ({
  id,
  title,
  summary,
  content,
  author,
  publishedDate,
  category,
  tags,
  likesCount,
  commentsCount,
  isDetailed = false
}) => {
  const formattedDate = new Date(publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">{category}</Badge>
            <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
            <CardDescription className="mt-1">{formattedDate}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{author.name}</p>
            <p className="text-xs text-gray-500">{author.role}</p>
          </div>
        </div>

        {isDetailed ? (
          <div className="prose prose-sm max-w-none">
            <p className="font-medium text-gray-700 mb-4">{summary}</p>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        ) : (
          <p className="text-gray-700">{summary}</p>
        )}

        {!isDetailed && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{likesCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
            <MessageSquare className="h-4 w-4" />
            <span>{commentsCount}</span>
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <BookmarkPlus className="h-4 w-4" />
          </Button>
          {!isDetailed && (
            <Button variant="outline" size="sm">
              Read More
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogPost;
