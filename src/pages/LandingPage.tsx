
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Bell, Clock, Shield, Heart, MessageCircle, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

// Add logo and icon imports
import melophileLogo from "/melophile-logo.png";
import melophileIcon from "/melophile-icon.ico";

const LandingPage = () => {
  const features = [
    {
      icon: Search,
      title: "Medication Finder",
      description: "Easily search and locate medications across pharmacies in Ethiopia."
    },
    {
      icon: Clock,
      title: "Medication Reminders",
      description: "Set personalized reminders for your medication schedule."
    },
    {
      icon: Bell,
      title: "Inventory Notifications",
      description: "Get notified when medications are back in stock."
    },
    {
      icon: Shield,
      title: "Drug Interaction Checker",
      description: "Ensure your medications are safe to take together."
    },
    {
      icon: Heart,
      title: "Health Tips",
      description: "Access localized health information and advice."
    },
    {
      icon: MessageCircle,
      title: "AI Health Companion",
      description: "Get personalized health insights through our AI chatbot."
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-2 sm:py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={melophileIcon} 
              alt="" 
              className="h-8 w-8 sm:h-10 sm:w-10 mr-2 sm:mr-3 shadow-sm" 
            />
            <img 
              src={melophileLogo} 
              alt="Melophile" 
              className="h-6 sm:h-8 md:h-9" 
            />
          </div>
          <div className="flex items-center">
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className="text-gray-600 hover:text-melophile-600">Features</a>
              <a href="#roles" className="text-gray-600 hover:text-melophile-600">User Roles</a>
              <a href="#about" className="text-gray-600 hover:text-melophile-600">About</a>
            </nav>
            <div className="flex items-center ml-4 space-x-2 sm:space-x-3">
              <Link to="/login">
                <Button variant="ghost" className="text-melophile-600 hover:text-melophile-700 hover:bg-melophile-50 text-xs sm:text-sm px-2 sm:px-4">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-melophile-600 hover:bg-melophile-700 text-white text-xs sm:text-sm px-2 sm:px-4">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section - Reordered to show image first on mobile */}
        <section className="py-12 md:py-24 px-4 bg-gradient-to-br from-melophile-50 to-teal-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image now comes first in the DOM order */}
              <div className="rounded-xl overflow-hidden shadow-2xl order-1 md:order-2">
                <img 
                  src="/general-logo.jpg" 
                  alt="Melophile General Logo"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Text content comes second */}
              <div className="space-y-6 order-2 md:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-melophile-800 leading-tight">
                  Your Complete Healthcare Companion in Ethiopia
                </h1>
                <p className="text-base sm:text-lg text-gray-600">
                  Melophile connects patients, pharmacies, and healthcare providers 
                  for better medication management and health insights.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                  <Link to="/register">
                    <Button className="bg-melophile-600 hover:bg-melophile-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium w-full sm:w-auto">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium w-full sm:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-melophile-800 mb-4">
                Comprehensive Healthcare Features
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Melophile offers a wide range of features designed to improve medication 
                management and healthcare access in Ethiopia.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-melophile-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-melophile-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-melophile-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* User Roles Section */}
        <section id="roles" className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-melophile-800 mb-4">
                Tailored for Everyone in Healthcare
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Melophile serves different roles in the healthcare ecosystem with 
                specialized features for each user type.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-melophile-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <UserCheck className="h-8 w-8 text-melophile-600" />
                </div>
                <h3 className="text-2xl font-bold text-melophile-800 mb-4">Individual Users</h3>
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-start">
                    <span className="text-melophile-500 mr-2">✓</span>
                    Search for medications
                  </li>
                  <li className="flex items-start">
                    <span className="text-melophile-500 mr-2">✓</span>
                    Set medication reminders
                  </li>
                  <li className="flex items-start">
                    <span className="text-melophile-500 mr-2">✓</span>
                    Check drug interactions
                  </li>
                  <li className="flex items-start">
                    <span className="text-melophile-500 mr-2">✓</span>
                    View health tips
                  </li>
                  <li className="flex items-start">
                    <span className="text-melophile-500 mr-2">✓</span>
                    Track medication history
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="w-full bg-melophile-600 hover:bg-melophile-700">
                    Register as Individual
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 10h-14v-1.5c0-1.93 1.57-3.5 3.5-3.5h7c1.93 0 3.5 1.57 3.5 3.5v1.5z"></path>
                    <path d="M12 3v4"></path>
                    <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-10"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-teal-800 mb-4">Pharmacy Owners</h3>
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">✓</span>
                    Manage inventory
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">✓</span>
                    Update store information
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">✓</span>
                    Verify prescriptions
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">✓</span>
                    Post notifications
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">✓</span>
                    View analytics
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Register as Pharmacy
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                    <path d="M22 10 A2 2 0 0 0 20 12 A2 2 0 0 0 22 10"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-orange-800 mb-4">Health Consultants</h3>
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">✓</span>
                    Provide telemedicine
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">✓</span>
                    Schedule appointments
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">✓</span>
                    Offer health advice
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">✓</span>
                    Create health plans
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">✓</span>
                    Access patient records
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Register as Consultant
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 px-4 bg-melophile-600 text-white">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-lg text-melophile-100 mb-8 max-w-3xl mx-auto">
              Join Melophile today and get access to all the features that make 
              medication management and healthcare insights easier for Ethiopians.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register">
                <Button className="bg-white text-melophile-600 hover:bg-melophile-50 px-8 py-3 rounded-md font-medium">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="text-white hover:bg-melophile-700 border-white px-8 py-3 rounded-md font-medium">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-8 sm:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-1 sm:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Melophile</h2>
              </div>
              <p className="mb-4 text-sm sm:text-base">
                Melophile is a comprehensive healthcare app designed for Ethiopia 
                that connects patients, pharmacies, and healthcare providers.
              </p>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li><a href="#features" className="hover:text-melophile-400">Features</a></li>
                <li><a href="#roles" className="hover:text-melophile-400">User Roles</a></li>
                <li><a href="#about" className="hover:text-melophile-400">About</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li><a href="#" className="hover:text-melophile-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-melophile-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-melophile-400">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm sm:text-base">© 2023 Melophile. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="#" className="hover:text-melophile-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-melophile-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.195 4.919 4.919 0 00-8.384 4.482 13.98 13.98 0 01-10.15-5.147 4.913 4.913 0 001.523 6.574 4.945 4.945 0 01-2.23-.618v.063a4.924 4.924 0 003.946 4.827 4.968 4.968 0 01-2.224.084 4.926 4.926 0 004.6 3.42 9.868 9.868 0 01-6.115 2.107 9.97 9.97 0 01-1.174-.07 13.935 13.935 0 007.567 2.209c9.054 0 14-7.496 14-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-melophile-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@melophile_pharma?is_from_webapp=1&sender_device=pc" 
                className="hover:text-melophile-400" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg 
                  className="h-5 w-5" 
                  fill="currentColor" 
                  viewBox="0 0 448 512"
                >
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
