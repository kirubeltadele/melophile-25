
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "lucide-react";
import { type Medication } from "@/data/mockData";
import MedicationDetailsModal from "./MedicationDetailsModal";

interface MedicationCardProps {
  medication: Medication;
}

const MedicationCard = ({ medication }: MedicationCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "low":
        return "bg-amber-500";
      case "unavailable":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStockStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "In Stock";
      case "low":
        return "Low Stock";
      case "unavailable":
        return "Out of Stock";
      default:
        return "Unknown Status";
    }
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className={`h-2 ${getStockStatusColor(medication.stockStatus)}`}></div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-semibold">{medication.name}</CardTitle>
              <p className="text-sm text-gray-500">
                {medication.brandName} ({medication.genericName})
              </p>
            </div>
            <Badge variant="outline" className="capitalize">
              {medication.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{medication.description}</p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Pill className="h-4 w-4 mr-1 text-melophile-600" />
              <span>{medication.dosage}</span>
            </div>
            
            <div className="flex items-center">
              <span className={`inline-block w-2 h-2 rounded-full ${getStockStatusColor(medication.stockStatus)} mr-2`}></span>
              <span>{getStockStatusText(medication.stockStatus)}</span>
            </div>
          </div>
          
          <p className="mt-3 font-semibold">${medication.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-3">
          <Button variant="outline" size="sm" onClick={() => setShowDetails(true)}>Details</Button>
          <Button 
            className="bg-melophile-600 hover:bg-melophile-700"
            size="sm"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>

      <MedicationDetailsModal
        medication={medication}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};

export default MedicationCard;
