
import { useEffect } from "react";
import MedicationSearch from "@/components/features/MedicationSearch";

// Define the window interface with google maps
declare global {
  interface Window {
    google?: {
      maps?: any;
    };
  }
}

const Search = () => {
  useEffect(() => {
    // Check if the Google Maps script is already loaded
    if (!document.getElementById("google-maps-script") && !window.google?.maps) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-melophile-800">Find Medications</h1>
        <p className="text-gray-600">Search for medications and check availability at nearby pharmacies</p>
      </div>
      
      <MedicationSearch />
    </div>
  );
};

export default Search;
