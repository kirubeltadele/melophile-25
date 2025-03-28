
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Info } from "lucide-react";
import { Medication } from "@/data/mockData";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface MedicationCardProps {
  medication: Medication;
}

const MedicationCard = ({ medication }: MedicationCardProps) => {
  const getStockBadge = (status: 'available' | 'low' | 'unavailable') => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">In Stock</Badge>;
      case 'low':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Low Stock</Badge>;
      case 'unavailable':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Out of Stock</Badge>;
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-melophile-700">{medication.name}</CardTitle>
          {getStockBadge(medication.stockStatus)}
        </div>
        <CardDescription>
          <span className="block">{medication.brandName}</span>
          <span className="block text-gray-500 text-xs italic">{medication.genericName}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Category:</span>
            <span>{medication.category}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Dosage:</span>
            <span>{medication.dosage}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Price:</span>
            <span className="font-medium">ETB {medication.price.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-melophile-600">
              <Info className="mr-1 h-4 w-4" />
              Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{medication.name} ({medication.dosage})</DialogTitle>
              <DialogDescription>
                {medication.brandName} &bull; {medication.genericName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Description</h4>
                <p className="text-sm text-gray-600">{medication.description}</p>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-1">Side Effects</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {medication.sideEffects.map((effect, index) => (
                    <li key={index}>{effect}</li>
                  ))}
                </ul>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-1">Contraindications</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {medication.contraindications.map((contraindication, index) => (
                    <li key={index}>{contraindication}</li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button variant="default" size="sm" className="bg-melophile-600 hover:bg-melophile-700">
          <MapPin className="mr-1 h-4 w-4" />
          Find Nearby
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MedicationCard;
