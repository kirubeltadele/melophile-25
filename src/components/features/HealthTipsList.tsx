
import { useState } from "react";
import { healthTips } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HealthTipsList = () => {
  const [visibleTips, setVisibleTips] = useState(healthTips.slice(0, 3));
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const toggleShowAll = () => {
    if (showAll) {
      setVisibleTips(healthTips.slice(0, 3));
      setShowAll(false);
    } else {
      setVisibleTips(healthTips);
      setShowAll(true);
    }
  };

  const handleReadMoreClick = (id: string) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-melophile-800">Health Tips & News</h2>
        <p className="text-gray-600">Stay informed with the latest health information</p>
      </div>
      
      <div className="space-y-6">
        {visibleTips.map(tip => (
          <Card key={tip.id} className="hover:shadow-md transition-shadow overflow-hidden cursor-pointer" 
                onClick={() => handleReadMoreClick(tip.id)}>
            <div className="md:flex">
              {tip.image && (
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img 
                    src={tip.image} 
                    alt={tip.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className={`md:${tip.image ? 'w-2/3' : 'w-full'} flex flex-col`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold text-melophile-700">{tip.title}</CardTitle>
                    <Badge className="bg-melophile-100 text-melophile-800 hover:bg-melophile-200">{tip.category}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-4 text-sm">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {tip.date}
                    </span>
                    <span className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {tip.author}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pb-2">
                  <p className="text-gray-600">{tip.content}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="link" 
                    className="p-0 text-melophile-600 hover:text-melophile-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadMoreClick(tip.id);
                    }}
                  >
                    Read More
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {healthTips.length > 3 && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={toggleShowAll}
            className="border-melophile-200 text-melophile-700 hover:bg-melophile-50"
          >
            {showAll ? "Show Less" : "View More Health Tips"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default HealthTipsList;
