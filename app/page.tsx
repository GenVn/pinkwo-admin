"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

const data = {
  day: [
    { name: "Mon", revenue: 4000 },
    { name: "Tue", revenue: 3000 },
    { name: "Wed", revenue: 5000 },
    { name: "Thu", revenue: 2780 },
    { name: "Fri", revenue: 1890 },
    { name: "Sat", revenue: 2390 },
    { name: "Sun", revenue: 3490 },
  ],
  week: [
    { name: "Week 1", revenue: 24000 },
    { name: "Week 2", revenue: 21000 },
    { name: "Week 3", revenue: 28000 },
    { name: "Week 4", revenue: 22000 },
  ],
  month: [
    { name: "Jan", revenue: 65000 },
    { name: "Feb", revenue: 59000 },
    { name: "Mar", revenue: 80000 },
    { name: "Apr", revenue: 81000 },
    { name: "May", revenue: 56000 },
    { name: "Jun", revenue: 55000 },
  ],
  year: [
    { name: "2020", revenue: 800000 },
    { name: "2021", revenue: 950000 },
    { name: "2022", revenue: 1100000 },
    { name: "2023", revenue: 1250000 },
  ],
};

const monthData = Array.from({ length: 35 }, (_, i) => ({
  day: i + 1,
  orders: i < 31 ? Math.floor(Math.random() * 10) : 0,
}));

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("day");
  const [selectedOverview, setSelectedOverview] = useState("weekly");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getColor = (orders: number) => {
    const maxOrders = Math.max(...monthData.map((d) => d.orders));
    const percentage = (orders / maxOrders) * 100;
    if (percentage > 80) return "bg-blue-500 dark:bg-blue-700";
    if (percentage > 60) return "bg-blue-400 dark:bg-blue-600";
    if (percentage > 40) return "bg-blue-300 dark:bg-blue-500";
    if (percentage > 20) return "bg-blue-200 dark:bg-blue-400";
    if (orders > 0) return "bg-blue-100 dark:bg-blue-300";
    return "bg-gray-200 dark:bg-gray-700";
  };

  if (!mounted) return null;

  return (
    <div className="flex gap-4 p-6 bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col gap-4 w-2/3">
        <div className="flex gap-4">
          <Card className="w-1/3 rounded-2xl">
            <CardContent className="flex flex-col items-start justify-center p-6">
              <p className="text-3xl font-bold mb-2 dark:text-white">1,000</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Total Sales
              </p>
              <Badge
                variant="secondary"
                className="bg-green-500 text-white dark:bg-green-700"
              >
                +5.2%
              </Badge>
            </CardContent>
          </Card>
          <Card className="w-1/3 rounded-2xl">
            <CardContent className="flex flex-col items-start justify-center p-6">
              <p className="text-3xl font-bold mb-2 dark:text-white">500</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Total Orders
              </p>
              <Badge
                variant="secondary"
                className="bg-green-500 text-white dark:bg-green-700"
              >
                +2.1%
              </Badge>
            </CardContent>
          </Card>
          <Card className="w-1/3 rounded-2xl">
            <CardContent className="flex flex-col items-start justify-center p-6">
              <p className="text-3xl font-bold mb-2 dark:text-white">$50,000</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Total Revenue
              </p>
              <Badge
                variant="secondary"
                className="bg-green-500 text-white dark:bg-green-700"
              >
                +8.5%
              </Badge>
            </CardContent>
          </Card>
        </div>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="dark:text-white">Revenue Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="day" onValueChange={setSelectedPeriod}>
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
              <TabsContent value={selectedPeriod}>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={data[selectedPeriod as keyof typeof data]}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="name"
                      stroke={theme === "dark" ? "#9ca3af" : "#4b5563"}
                    />
                    <YAxis stroke={theme === "dark" ? "#9ca3af" : "#4b5563"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor:
                          theme === "dark" ? "#1f2937" : "#ffffff",
                        color: theme === "dark" ? "#ffffff" : "#000000",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke={theme === "dark" ? "#60a5fa" : "#3b82f6"}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <div className="w-1/3 flex flex-col gap-4 bg-gray-100 dark:bg-gray-900">
        <Card className="rounded-2xl bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="dark:text-white">Orders</CardTitle>
            <Select
              value={selectedOverview}
              onValueChange={setSelectedOverview}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {weekdays.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium dark:text-gray-300"
                >
                  {day}
                </div>
              ))}
              {monthData.map((day) => (
                <TooltipProvider key={day.day}>
                  <TooltipUI>
                    <TooltipTrigger>
                      <div
                        className={`w-8 h-8 flex items-center justify-center cursor-pointer rounded-lg mx-auto ${getColor(
                          day.orders
                        )} ${
                          day.orders > 0
                            ? "text-white text-sm"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      ></div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Orders: {day.orders}</p>
                    </TooltipContent>
                  </TooltipUI>
                </TooltipProvider>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
