
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingBag, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  ClipboardCheck,
  Activity,
  Bell
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { medications } from "@/data/mockData";

const PharmacyDashboard = () => {
  const navigate = useNavigate();
  const lowStockItems = medications.filter(med => med.stockStatus === "low");
  const outOfStockItems = medications.filter(med => med.stockStatus === "unavailable");
  
  // For the sample data
  const recentOrders = [
    { id: "ORD-001", customer: "Abebe Kebede", items: 3, status: "Completed", total: 305, date: "2023-06-01" },
    { id: "ORD-002", customer: "Sara Hailu", items: 1, status: "Processing", total: 120, date: "2023-06-01" },
    { id: "ORD-003", customer: "Daniel Tesfaye", items: 2, status: "Pending", total: 200, date: "2023-05-31" },
    { id: "ORD-004", customer: "Hiwot Girma", items: 4, status: "Completed", total: 455, date: "2023-05-31" },
  ];

  const getBadgeClass = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 px-2.5 py-0.5 rounded text-xs font-medium";
      case "Processing":
        return "bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded text-xs font-medium";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded text-xs font-medium";
      default:
        return "bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded text-xs font-medium";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-melophile-800">Pharmacy Dashboard</h1>
        <p className="text-gray-600">Manage your inventory and pharmacy operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-melophile-100 p-2 rounded-full">
                  <ShoppingBag className="h-5 w-5 text-melophile-600" />
                </div>
                <span className="text-2xl font-bold">{medications.length}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-melophile-600"
                onClick={() => navigate('/inventory')}
              >
                View All
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
                <span className="text-2xl font-bold">{lowStockItems.length}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-yellow-600"
                onClick={() => navigate('/inventory', { state: { filter: 'low' } })}
              >
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-2xl font-bold">{outOfStockItems.length}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-600"
                onClick={() => navigate('/inventory', { state: { filter: 'unavailable' } })}
              >
                Order
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Today's Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-2xl font-bold">ETB 2,450</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-green-600"
                onClick={() => navigate('/analytics')}
              >
                Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest prescription fills and OTC purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>
                      <span className={getBadgeClass(order.status)}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">ETB {order.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" onClick={() => navigate('/orders')}>View All Orders</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common pharmacy tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full bg-melophile-600 hover:bg-melophile-700 flex items-center justify-start"
              onClick={() => navigate('/inventory')}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Update Inventory
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-start"
            >
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Verify Prescription
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-start"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="mr-2 h-4 w-4" />
              Send Notification
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-start"
            >
              <Activity className="mr-2 h-4 w-4" />
              Emergency Alert
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-start"
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Staff
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
