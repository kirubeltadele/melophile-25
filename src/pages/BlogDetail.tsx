
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, User, MessageSquare, Heart, Share2, Bookmark, ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";
import { healthTips } from "@/data/mockData";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  date: string;
  likes: number;
}

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchBlog = () => {
      setIsLoading(true);
      try {
        const foundBlog = healthTips.find(tip => tip.id === id);
        if (foundBlog) {
          setBlog(foundBlog);
          setLikesCount(foundBlog.likes || Math.floor(Math.random() * 100) + 10);
          
          // Generate mock comments
          const mockComments: Comment[] = [
            {
              id: "comment-1",
              author: {
                name: "Sophia Tesfaye",
                avatar: "https://randomuser.me/api/portraits/women/37.jpg",
                initials: "ST"
              },
              content: "This was really helpful information, especially the part about staying hydrated throughout the day.",
              date: "2023-06-16",
              likes: 5
            },
            {
              id: "comment-2",
              author: {
                name: "Michael Demeke",
                avatar: "https://randomuser.me/api/portraits/men/54.jpg",
                initials: "MD"
              },
              content: "I've been trying to increase my water intake and these tips are very practical. Thanks for sharing!",
              date: "2023-06-16",
              likes: 3
            }
          ];
          
          setComments(mockComments);
        }
      } catch (error) {
        toast.error("Failed to load blog post");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);
  
  const handleAddComment = () => {
    if (!comment.trim()) return;
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: {
        name: "You",
        avatar: "", // In a real app, this would be the user's avatar
        initials: "YO"
      },
      content: comment,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };
    
    setComments([newComment, ...comments]);
    setComment("");
    toast.success("Comment added successfully");
  };
  
  const handleToggleLike = () => {
    setLiked(!liked);
    setLikesCount(current => liked ? current - 1 : current + 1);
    if (!liked) {
      toast.success("Added to your liked posts");
    }
  };
  
  const handleToggleBookmark = () => {
    setBookmarked(!bookmarked);
    if (!bookmarked) {
      toast.success("Saved to your bookmarks");
    } else {
      toast.success("Removed from your bookmarks");
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-melophile-600">Loading...</div>
      </div>
    );
  }
  
  if (!blog) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Blog Post Not Found</h2>
        <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/health-tips')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Health Tips
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        className="mb-4 -ml-2"
        onClick={() => navigate('/health-tips')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Health Tips
      </Button>
      
      <Card className="overflow-hidden">
        {blog.image && (
          <div className="h-[300px] w-full">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-melophile-800">{blog.title}</CardTitle>
              <CardDescription className="flex items-center gap-4 text-sm mt-2">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {blog.date}
                </span>
                <span className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  {blog.author}
                </span>
                <Badge className="bg-melophile-100 text-melophile-800 hover:bg-melophile-200">{blog.category}</Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="prose prose-sm sm:prose-base max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </CardContent>
        
        <CardFooter className="flex-col border-t pt-4">
          <div className="flex justify-between items-center w-full mb-6">
            <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`flex items-center gap-2 ${liked ? 'text-red-500' : 'text-gray-600'}`}
                onClick={handleToggleLike}
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-red-500' : ''}`} />
                <span>{likesCount}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-2 text-gray-600"
              >
                <MessageSquare className="h-5 w-5" />
                <span>{comments.length}</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className={`rounded-full ${bookmarked ? 'text-melophile-600 border-melophile-200' : ''}`}
                onClick={handleToggleBookmark}
              >
                <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-melophile-600' : ''}`} />
              </Button>
            </div>
          </div>
          
          <div className="w-full border-t pt-6">
            <h3 className="font-medium text-lg mb-4">Comments ({comments.length})</h3>
            
            <div className="flex gap-3 mb-6">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-melophile-100 text-melophile-700">YO</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mb-2"
                />
                
                <div className="flex justify-end">
                  <Button 
                    size="sm" 
                    className="bg-melophile-600 hover:bg-melophile-700"
                    onClick={handleAddComment}
                    disabled={!comment.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback className="bg-gray-100 text-gray-700">{comment.author.initials}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{comment.author.name}</span>
                      <span className="text-xs text-gray-500">{comment.date}</span>
                    </div>
                    
                    <p className="text-gray-700 mt-1">{comment.content}</p>
                    
                    <div className="flex items-center gap-4 mt-2">
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-sm text-gray-500 hover:text-gray-700">
                        <Heart className="h-3.5 w-3.5 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-sm text-gray-500 hover:text-gray-700">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BlogDetail;
