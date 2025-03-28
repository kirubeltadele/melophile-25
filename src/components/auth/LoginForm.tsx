
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'individual' | 'pharmacy' | 'consultant'>('individual');
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(credentials.email, credentials.password, activeTab);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-melophile-700">Welcome to Melophile</CardTitle>
        <CardDescription className="text-center">
          Sign in to access your healthcare dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="individual" onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>
            <TabsTrigger value="consultant">Consultant</TabsTrigger>
          </TabsList>
          
          <TabsContent value="individual">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="abebe@example.com"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-melophile-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-melophile-600 hover:bg-melophile-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="pharmacy">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pharmacy-email">Pharmacy Email</Label>
                <Input
                  id="pharmacy-email"
                  name="email"
                  type="email"
                  placeholder="selam@pharmacy.com"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pharmacy-password">Password</Label>
                  <a href="#" className="text-xs text-melophile-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="pharmacy-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-melophile-600 hover:bg-melophile-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In as Pharmacy"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="consultant">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="consultant-email">Consultant Email</Label>
                <Input
                  id="consultant-email"
                  name="email"
                  type="email"
                  placeholder="tigist@health.com"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="consultant-password">Password</Label>
                  <a href="#" className="text-xs text-melophile-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="consultant-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-melophile-600 hover:bg-melophile-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In as Consultant"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-melophile-600 hover:underline">
            Register here
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
