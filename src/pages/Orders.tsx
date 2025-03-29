
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter, ArrowUpDown, CheckCircle, Clock, X, ShoppingBag } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data for orders
const orders = [
  {
    id: "ORD-001",
    customer: "Abebe Kebede",
    items: [
      { name: "Paracetamol", quantity: 2, price: 45 },
      { name: "Vitamin C", quantity: 1, price: 120 }
    ],
    status: "Completed",
    total: 210,
    date: "2023-06-01",
    address: "Bole Road, Addis Ababa"
  },
  {
    id: "ORD-002",
    customer: "Sara Hailu",
    items: [
      { name: "Amoxicillin", quantity: 1, price: 120 }
    ],
    status: "Processing",
    total: 120,
    date: "2023-06-01",
    address: "Piazza, Addis Ababa"
  },
  {
    id: "ORD-003",
    customer: "Daniel Tesfaye",
    items: [
      { name: "Ibuprofen", quantity: 1, price: 85 },
      { name: "Bandages", quantity: 1, price: 50 }
    ],
    status: "Pending",
    total: 135,
    date: "2023-05-31",
    address: "Kazanchis, Addis Ababa"
  },
  {
    id: "ORD-004",
    customer: "Hiwot Girma",
    items: [
      { name: "Blood Pressure Monitor", quantity: 1, price: 300 },
      { name: "Multivitamins", quantity: 1, price: 155 }
    ],
    status: "Completed",
    total: 455,
    date: "2023-05-30",
    address: "Megenagna, Addis Ababa"
  },
  {
    id: "ORD-005",
    customer: "Solomon Bekele",
    items: [
      { name: "Azithromycin", quantity: 1, price: 180 },
      { name: "Face Masks", quantity: 10, price: 10 }
    ],
    status: "Cancelled",
    total: 280,
    date: "2023-05-29",
    address: "Lideta, Addis Ababa"
  },
];

const Orders = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [viewDetails, setViewDetails] = useState(false);
  
  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === "all" || order.status.toLowerCase() === filter;
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  const handleViewDetails = (order: typeof orders[0]) => {
    setSelectedOrder(order);
    setViewDetails(true);
  };
  
  const getBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "processing":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "cancelled":
        return <X className="h-4 w-4 text-red-600" />;
      default:
        return <ShoppingBag className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-melophile-800">Orders</h1>
        <p className="text-gray-600">Manage customer orders and fulfillment</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search by order ID or customer..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-shrink-0">
          <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <Card>
        <CardHeader className="p-4">
          <div className="flex justify-between items-center">
            <CardTitle>Order List</CardTitle>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell className="text-right">ETB {order.total}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={getBadgeClass(order.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(order)}
                        >
                          View
                        </Button>
                        {order.status === "Pending" && (
                          <Button variant="outline" size="sm" className="ml-2">
                            Process
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No orders found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
      
      {viewDetails && selectedOrder && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Order Details - {selectedOrder.id}</CardTitle>
              <CardDescription>Details for order placed on {selectedOrder.date}</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setViewDetails(false)}>
              Close Details
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Customer Information</h3>
                <p className="font-medium">{selectedOrder.customer}</p>
                <p className="text-sm text-gray-600">{selectedOrder.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Status</h3>
                <Badge className={`${getBadgeClass(selectedOrder.status)} mt-1`}>
                  {selectedOrder.status}
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Order Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrder.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">ETB {item.price}</TableCell>
                      <TableCell className="text-right">ETB {item.quantity * item.price}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
                    <TableCell className="text-right font-bold">ETB {selectedOrder.total}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            {selectedOrder.status === "Pending" && (
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel Order</Button>
                <Button>Process Order</Button>
              </div>
            )}
            
            {selectedOrder.status === "Processing" && (
              <div className="flex justify-end gap-2">
                <Button>Mark as Completed</Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Orders;
