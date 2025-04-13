
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { MessageCircle, Send, Clock, ChevronRight } from "lucide-react";

// Mock data for chat suggestions
const chatSuggestions = [
  "I've been experiencing headaches for the past week. What could be causing this?",
  "What are the side effects of Metformin?",
  "How can I manage my diabetes better?",
  "What foods should I avoid with high blood pressure?",
  "I forgot to take my medication this morning. What should I do?",
  "How often should I check my blood pressure?",
];

// Mock bot responses
const botResponses: Record<string, string> = {
  greeting: "Hello! I'm your health assistant. How can I help you today?",
  headache: "Persistent headaches can have various causes including stress, dehydration, lack of sleep, eye strain, or in some cases, underlying health conditions. If your headaches are severe or accompanied by other symptoms like fever or vision changes, please consult with a healthcare professional.",
  sideEffects: "Common side effects of Metformin may include nausea, vomiting, stomach upset, diarrhea, weakness, or a metallic taste in your mouth. These side effects usually go away as your body adjusts to the medication. Serious side effects are rare but can include lactic acidosis. Always consult your doctor if you experience concerning symptoms.",
  diabetes: "Managing diabetes effectively includes monitoring your blood sugar regularly, taking medications as prescribed, following a balanced diet, regular physical activity, and regular check-ups with your healthcare provider. Would you like more specific advice on any of these areas?",
  bloodPressureFood: "For high blood pressure, it's advisable to limit sodium (salt), processed foods, and alcohol. Foods to avoid or limit include canned soups, deli meats, frozen pizza, pickles, sugary foods, and red meat. A diet rich in fruits, vegetables, whole grains, and lean proteins is recommended.",
  missedDose: "If you miss a dose of medication, take it as soon as you remember unless it's almost time for your next dose. In that case, skip the missed dose and continue your regular schedule. Don't double up to make up for a missed dose without consulting your healthcare provider first.",
  bloodPressureCheck: "For most adults, blood pressure should be checked at least once every 2 years. If you have high blood pressure or other risk factors, your doctor may recommend more frequent readings. Home monitoring can also be beneficial for tracking your blood pressure between visits.",
  fallback: "I'm not sure I understand your question. Could you please rephrase it or ask something else about your health concerns?"
};

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const HealthChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      text: botResponses.greeting,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputValue("");
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Determine response based on user message
    setTimeout(() => {
      let botResponseText = botResponses.fallback;
      
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes("headache")) {
        botResponseText = botResponses.headache;
      } else if (lowerText.includes("metformin") || lowerText.includes("side effect")) {
        botResponseText = botResponses.sideEffects;
      } else if (lowerText.includes("diabetes")) {
        botResponseText = botResponses.diabetes;
      } else if (lowerText.includes("blood pressure") && (lowerText.includes("food") || lowerText.includes("avoid"))) {
        botResponseText = botResponses.bloodPressureFood;
      } else if (lowerText.includes("miss") && lowerText.includes("medication")) {
        botResponseText = botResponses.missedDose;
      } else if (lowerText.includes("blood pressure") && lowerText.includes("check")) {
        botResponseText = botResponses.bloodPressureCheck;
      }
      
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-melophile-800">Health Chat</h1>
        <p className="text-gray-600">Chat with our AI health assistant for information and guidance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/melophile-icon.ico" alt="Health Assistant" />
                <AvatarFallback>HA</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Health Assistant</CardTitle>
                <CardDescription className="flex items-center">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  Online
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="h-[400px] overflow-y-auto space-y-4 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-melophile-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p>{message.text}</p>
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-melophile-100" : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg flex items-center space-x-2">
                  <span className="text-sm">Health Assistant is typing</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "600ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </CardContent>
          
          <CardFooter className="border-t pt-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                onClick={() => handleSendMessage()} 
                className="bg-melophile-600 hover:bg-melophile-700"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Suggested Questions</CardTitle>
            <CardDescription>Common health-related questions you can ask</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-2">
            {chatSuggestions.map((suggestion, index) => (
              <Button 
                key={index}
                variant="outline" 
                className="w-full justify-start text-left h-auto py-2"
                onClick={() => handleSendMessage(suggestion)}
                disabled={isTyping}
              >
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2 text-melophile-600" />
                  <span className="truncate">{suggestion}</span>
                </div>
              </Button>
            ))}
          </CardContent>
          
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="ghost" size="sm" className="text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              View History
            </Button>
            <Button variant="ghost" size="sm" className="text-xs text-gray-500">
              More Suggestions
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default HealthChat;
