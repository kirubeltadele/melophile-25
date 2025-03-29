
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, PackageOpen, Users } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Sample data for analytics
const dailyData = [
  { name: '12 AM', sales: 4, revenue: 800 },
  { name: '4 AM', sales: 3, revenue: 600 },
  { name: '8 AM', sales: 12, revenue: 2400 },
  { name: '12 PM', sales: 25, revenue: 5000 },
  { name: '4 PM', sales: 30, revenue: 6000 },
  { name: '8 PM', sales: 15, revenue: 3000 },
  { name: '11 PM', sales: 8, revenue: 1600 },
];

const monthlyData = [
  { name: 'Jan', sales: 140, revenue: 28000 },
  { name: 'Feb', sales: 125, revenue: 25000 },
  { name: 'Mar', sales: 180, revenue: 36000 },
  { name: 'Apr', sales: 190, revenue: 38000 },
  { name: 'May', sales: 210, revenue: 42000 },
  { name: 'Jun', sales: 250, revenue: 50000 },
  { name: 'Jul', sales: 280, revenue: 56000 },
  { name: 'Aug', sales: 260, revenue: 52000 },
  { name: 'Sep', sales: 290, revenue: 58000 },
  { name: 'Oct', sales: 320, revenue: 64000 },
  { name: 'Nov', sales: 350, revenue: 70000 },
  { name: 'Dec', sales: 380, revenue: 76000 },
];

const yearlyData = [
  { name: '2020', sales: 2800, revenue: 560000 },
  { name: '2021', sales: 3200, revenue: 640000 },
  { name: '2022', sales: 3600, revenue: 720000 },
  { name: '2023', sales: 4200, revenue: 840000 },
  { name: '2024', sales: 2800, revenue: 560000 }, // Current year (partial)
];

const topSellingProducts = [
  { name: 'Paracetamol', sales: 356, change: '+12%' },
  { name: 'Amoxicillin', sales: 289, change: '+8%' },
  { name: 'Vitamin C', sales: 245, change: '+23%' },
  { name: 'Ibuprofen', sales: 210, change: '-5%' },
  { name: 'Azithromycin', sales: 198, change: '+2%' },
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('monthly');

  const getChangeClass = (change: string) => {
    return change.startsWith('+') 
      ? "text-green-600 bg-green-50 px-2 py-1 rounded text-xs" 
      : "text-red-600 bg-red-50 px-2 py-1 rounded text-xs";
  };

  const getActiveData = () => {
    switch(timeRange) {
      case 'daily': return dailyData;
      case 'yearly': return yearlyData;
      default: return monthlyData;
    }
  };

  const activeData = getActiveData();
  const totalSales = activeData.reduce((sum, item) => sum + item.sales, 0);
  const totalRevenue = activeData.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-melophile-800">Analytics</h1>
        <p className="text-gray-600">Track your pharmacy's performance and sales metrics</p>
      </div>
      
      <Tabs value={timeRange} onValueChange={setTimeRange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSales}</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from previous period
              </p>
              <div className="h-[60px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={300}
                    height={60}
                    data={activeData}
                    margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                  >
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">ETB {totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +18.2% from previous period
              </p>
              <div className="h-[60px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    width={300}
                    height={60}
                    data={activeData}
                    margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                  >
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(totalSales * 0.8)}</div>
              <p className="text-xs text-muted-foreground">
                +5.2% from previous period
              </p>
              <div className="h-[60px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={300}
                    height={60}
                    data={activeData}
                    margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                  >
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#ff7c43"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
              <PackageOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">ETB {Math.round(totalRevenue / totalSales)}</div>
              <p className="text-xs text-muted-foreground">
                +2.5% from previous period
              </p>
              <div className="h-[60px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={300}
                    height={60}
                    data={activeData.slice(0, 5)}
                    margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                  >
                    <Bar dataKey="revenue" fill="#413ea0" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Sales Overview</CardTitle>
              <CardDescription>Your pharmacy sales throughout the day</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={dailyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="sales" fill="#8884d8" name="Sales" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue (ETB)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales Overview</CardTitle>
              <CardDescription>Your pharmacy performance this year</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={monthlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#8884d8" name="Sales" />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue (ETB)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="yearly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Yearly Sales Overview</CardTitle>
              <CardDescription>Your pharmacy performance over the years</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={300}
                  data={yearlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Area yAxisId="left" type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} name="Sales" />
                  <Area yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} name="Revenue (ETB)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>Your best performing products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSellingProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} units sold</p>
                </div>
                <span className={getChangeClass(product.change)}>{product.change}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
