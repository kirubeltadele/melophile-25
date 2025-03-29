
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Plus, 
  AlertTriangle, 
  ShoppingBag,
  Filter,
  Clock,
  ArrowUpDown
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { medications } from "@/data/mockData";

interface Medication {
  id: string;
  name: string;
  brandName: string;
  genericName: string;
  category: string;
  stockQuantity: number;
  stockStatus: "available" | "low" | "unavailable";
  price: number;
  expiryDate?: string;
}

const Inventory = () => {
  const [inventory, setInventory] = useState<Medication[]>(medications);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMedication, setNewMedication] = useState<Omit<Medication, "id">>({
    name: "",
    brandName: "",
    genericName: "",
    category: "",
    stockQuantity: 0,
    stockStatus: "available",
    price: 0,
    expiryDate: ""
  });
  
  // Get unique categories for filter
  const categories = Array.from(new Set(medications.map(med => med.category)));
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "stockQuantity" || name === "price") {
      setNewMedication({
        ...newMedication,
        [name]: parseFloat(value) || 0
      });
    } else {
      setNewMedication({
        ...newMedication,
        [name]: value
      });
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setNewMedication({
      ...newMedication,
      [name]: value
    });
  };
  
  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine stock status based on quantity
    let stockStatus: "available" | "low" | "unavailable" = "available";
    if (newMedication.stockQuantity <= 0) {
      stockStatus = "unavailable";
    } else if (newMedication.stockQuantity < 10) {
      stockStatus = "low";
    }
    
    const newMed: Medication = {
      ...newMedication,
      id: `med-${Date.now()}`,
      stockStatus
    };
    
    setInventory([...inventory, newMed]);
    toast.success(`Added ${newMed.name} to inventory`);
    
    // Reset form and close dialog
    setNewMedication({
      name: "",
      brandName: "",
      genericName: "",
      category: "",
      stockQuantity: 0,
      stockStatus: "available",
      price: 0,
      expiryDate: ""
    });
    setIsAddDialogOpen(false);
  };
  
  // Filter medications based on search query, category, and stock status
  const filteredMedications = inventory.filter(med => {
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
  
  // Sort medications
  const sortedMedications = [...filteredMedications].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "brand":
        comparison = a.brandName.localeCompare(b.brandName);
        break;
      case "quantity":
        comparison = a.stockQuantity - b.stockQuantity;
        break;
      case "price":
        comparison = a.price - b.price;
        break;
      default:
        comparison = a.name.localeCompare(b.name);
    }
    
    return sortDir === "asc" ? comparison : -comparison;
  });
  
  // Get counts for dashboard cards
  const totalMedications = inventory.length;
  const lowStockItems = inventory.filter(med => med.stockStatus === "low").length;
  const outOfStockItems = inventory.filter(med => med.stockStatus === "unavailable").length;
  
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDir("asc");
    }
  };
  
  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <span className="bg-green-100 text-green-800 px-2.5 py-0.5 rounded text-xs font-medium">In Stock</span>;
      case "low":
        return <span className="bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded text-xs font-medium">Low Stock</span>;
      case "unavailable":
        return <span className="bg-red-100 text-red-800 px-2.5 py-0.5 rounded text-xs font-medium">Out of Stock</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded text-xs font-medium">Unknown</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-melophile-800">Inventory Management</h1>
          <p className="text-gray-600">Manage your pharmacy's medication inventory</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-melophile-600 hover:bg-melophile-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Medication
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Medication</DialogTitle>
              <DialogDescription>
                Enter the details of the medication to add to your inventory.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddMedication}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Medication Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newMedication.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brandName">Brand Name</Label>
                    <Input
                      id="brandName"
                      name="brandName"
                      value={newMedication.brandName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="genericName">Generic Name</Label>
                    <Input
                      id="genericName"
                      name="genericName"
                      value={newMedication.genericName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stockQuantity">Quantity</Label>
                    <Input
                      id="stockQuantity"
                      name="stockQuantity"
                      type="number"
                      min="0"
                      value={newMedication.stockQuantity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (ETB)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={newMedication.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="date"
                      value={newMedication.expiryDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-melophile-600 hover:bg-melophile-700">Add to Inventory</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-melophile-100 p-2 rounded-full">
                  <ShoppingBag className="h-5 w-5 text-melophile-600" />
                </div>
                <span className="text-2xl font-bold">{totalMedications}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-melophile-600">
                Details
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold">{lowStockItems}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-yellow-600">
                View All
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Out of Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-2xl font-bold">{outOfStockItems}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-red-600">
                Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 mb-4">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="low">Low Stock</TabsTrigger>
            <TabsTrigger value="unavailable">Out of Stock</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search medications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="category-filter" className="w-[160px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead onClick={() => handleSort("name")} className="cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center">
                          Name 
                          {sortBy === "name" && <ArrowUpDown className="ml-1 h-4 w-4" />}
                        </div>
                      </TableHead>
                      <TableHead onClick={() => handleSort("brand")} className="cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center">
                          Brand 
                          {sortBy === "brand" && <ArrowUpDown className="ml-1 h-4 w-4" />}
                        </div>
                      </TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead onClick={() => handleSort("quantity")} className="cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center">
                          Quantity 
                          {sortBy === "quantity" && <ArrowUpDown className="ml-1 h-4 w-4" />}
                        </div>
                      </TableHead>
                      <TableHead onClick={() => handleSort("price")} className="cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center">
                          Price 
                          {sortBy === "price" && <ArrowUpDown className="ml-1 h-4 w-4" />}
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedMedications.length > 0 ? (
                      sortedMedications.map((medication) => (
                        <TableRow key={medication.id}>
                          <TableCell className="font-medium">{medication.name}</TableCell>
                          <TableCell>{medication.brandName}</TableCell>
                          <TableCell>{medication.category}</TableCell>
                          <TableCell>{medication.stockQuantity}</TableCell>
                          <TableCell>ETB {medication.price.toFixed(2)}</TableCell>
                          <TableCell>
                            {getStockStatusBadge(medication.stockStatus)}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              {medication.stockStatus !== "available" && (
                                <Button variant="outline" size="sm">Order</Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No medications found matching your criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventory.filter(med => med.stockStatus === "low").length > 0 ? (
                      inventory
                        .filter(med => med.stockStatus === "low")
                        .map((medication) => (
                          <TableRow key={medication.id}>
                            <TableCell className="font-medium">{medication.name}</TableCell>
                            <TableCell>{medication.brandName}</TableCell>
                            <TableCell>{medication.category}</TableCell>
                            <TableCell>{medication.stockQuantity}</TableCell>
                            <TableCell>ETB {medication.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <span className="bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded text-xs font-medium">Low Stock</span>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Order</Button>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No low stock medications found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unavailable">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventory.filter(med => med.stockStatus === "unavailable").length > 0 ? (
                      inventory
                        .filter(med => med.stockStatus === "unavailable")
                        .map((medication) => (
                          <TableRow key={medication.id}>
                            <TableCell className="font-medium">{medication.name}</TableCell>
                            <TableCell>{medication.brandName}</TableCell>
                            <TableCell>{medication.category}</TableCell>
                            <TableCell>{medication.stockQuantity}</TableCell>
                            <TableCell>ETB {medication.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <span className="bg-red-100 text-red-800 px-2.5 py-0.5 rounded text-xs font-medium">Out of Stock</span>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Order</Button>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No out of stock medications found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;
