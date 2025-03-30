
import { useEffect } from "react";
import MedicationSearch from "@/components/features/MedicationSearch";
import { loadGoogleMapsScript } from "@/utils/googleMapsLoader";

const Search = () => {
  useEffect(() => {
    // Load the Google Maps script on component mount
    loadGoogleMapsScript('YOUR_API_KEY');
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
