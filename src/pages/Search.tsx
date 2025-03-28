
import MedicationSearch from "@/components/features/MedicationSearch";

const Search = () => {
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
