
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pill, AlertCircle, CalendarClock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { type Medication } from "@/data/mockData";

interface MedicationDetailsModalProps {
  medication: Medication | null;
  isOpen: boolean;
  onClose: () => void;
}

const MedicationDetailsModal = ({
  medication,
  isOpen,
  onClose,
}: MedicationDetailsModalProps) => {
  const [isAdding, setIsAdding] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsAdding(false);
    }
  }, [isOpen]);

  if (!medication) return null;

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-green-500";
      case "low":
        return "text-amber-500";
      case "unavailable":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStockIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle2 className={`h-5 w-5 ${getStockStatusColor(status)}`} />;
      case "low":
        return <AlertCircle className={`h-5 w-5 ${getStockStatusColor(status)}`} />;
      case "unavailable":
        return <AlertCircle className={`h-5 w-5 ${getStockStatusColor(status)}`} />;
      default:
        return <AlertCircle className={`h-5 w-5 ${getStockStatusColor(status)}`} />;
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

  const handleAddToMyMedications = () => {
    setIsAdding(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAdding(false);
      toast.success(`${medication.name} added to your medications`);
      onClose();
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{medication.name}</DialogTitle>
          <DialogDescription className="text-sm">
            {medication.brandName} ({medication.genericName})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Pill className="h-5 w-5 text-melophile-600" />
              <span className="font-medium">{medication.dosage}</span>
            </div>
            <div className="flex items-center space-x-2">
              {getStockIcon(medication.stockStatus)}
              <span className={getStockStatusColor(medication.stockStatus)}>
                {getStockStatusText(medication.stockStatus)}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-1">Description</h4>
            <p className="text-gray-700">{medication.description}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-1">Usage Instructions</h4>
            <p className="text-gray-700">{medication.usageInstructions || "Take as directed by your healthcare provider."}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-1">Side Effects</h4>
            <p className="text-gray-700">{medication.sideEffects || "Common side effects may include nausea, dizziness, or headache. Consult your doctor if you experience severe side effects."}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CalendarClock className="h-5 w-5 text-melophile-600" />
              <span className="text-gray-600">Typical Course: {medication.typicalCourse || "As prescribed"}</span>
            </div>
            <span className="font-bold">${medication.price.toFixed(2)}</span>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button 
            className="bg-melophile-600 hover:bg-melophile-700"
            onClick={handleAddToMyMedications}
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add to My Medications"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MedicationDetailsModal;
