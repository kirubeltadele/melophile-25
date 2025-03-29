
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'individual' | 'pharmacy' | 'hospital' | 'consultant'>('individual');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(formData.name, formData.email, formData.password, activeTab);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-melophile-700">Create an Account</CardTitle>
        <CardDescription className="text-center">
          Join Melophile and access your healthcare services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="individual" onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>
            <TabsTrigger value="hospital">Hospital</TabsTrigger>
            <TabsTrigger value="consultant">Consultant</TabsTrigger>
          </TabsList>
          
          <TabsContent value="individual">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Abebe Kebede"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="abebe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-melophile-600 hover:bg-melophile-700" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="pharmacy">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pharmacy-name">Pharmacy Name</Label>
                <Input
                  id="pharmacy-name"
                  name="name"
                  type="text"
                  placeholder="Selam Pharmacy"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pharmacy-email">Business Email</Label>
                <Input
                  id="pharmacy-email"
                  name="email"
                  type="email"
                  placeholder="selam@pharmacy.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pharmacy-password">Password</Label>
                <Input
                  id="pharmacy-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pharmacy-confirm-password">Confirm Password</Label>
                <Input
                  id="pharmacy-confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-melophile-600 hover:bg-melophile-700" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Register Pharmacy"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="hospital">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hospital-name">Hospital Name</Label>
                <Input
                  id="hospital-name"
                  name="name"
                  type="text"
                  placeholder="Ethio Health Hospital"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospital-email">Hospital Email</Label>
                <Input
                  id="hospital-email"
                  name="email"
                  type="email"
                  placeholder="info@ethiohealth.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospital-password">Password</Label>
                <Input
                  id="hospital-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospital-confirm-password">Confirm Password</Label>
                <Input
                  id="hospital-confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-melophile-600 hover:bg-melophile-700" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Register Hospital"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="consultant">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="consultant-name">Professional Name</Label>
                <Input
                  id="consultant-name"
                  name="name"
                  type="text"
                  placeholder="Dr. Tigist Haile"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="consultant-email">Professional Email</Label>
                <Input
                  id="consultant-email"
                  name="email"
                  type="email"
                  placeholder="tigist@health.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="consultant-password">Password</Label>
                <Input
                  id="consultant-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="consultant-confirm-password">Confirm Password</Label>
                <Input
                  id="consultant-confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-melophile-600 hover:bg-melophile-700" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Register as Consultant"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-melophile-600 hover:underline">
            Sign in
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
