
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { medications } from "@/data/mockData";
import MedicationCard from "./MedicationCard";

const MedicationSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  // Get unique categories for filter
  const categories = Array.from(new Set(medications.map(med => med.category)));

  // Filter medications based on search query and filters
  const filteredMedications = medications.filter(med => {
    const matchesSearch = searchQuery === "" || 
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || med.category === categoryFilter;
    
    const matchesStock = stockFilter === "all" || 
      (stockFilter === "available" && med.stockStatus === "available") ||
      (stockFilter === "low" && med.stockStatus === "low") ||
      (stockFilter === "unavailable" && med.stockStatus === "unavailable");
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search medications by name or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-40">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-40">
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Availability</SelectItem>
                <SelectItem value="available">In Stock</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="unavailable">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedications.length > 0 ? (
          filteredMedications.map(medication => (
            <MedicationCard key={medication.id} medication={medication} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No medications found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationSearch;
