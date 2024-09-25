"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  FileSpreadsheet,
  MoreHorizontal,
  Plus,
  ArrowUpIcon,
  ArrowDownIcon,
  Search,
  Filter,
  ArrowUpDown,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

export default function OrderPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showSearch, setShowSearch] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for the small charts
  const chartData = [
    { value: 400 },
    { value: 300 },
    { value: 500 },
    { value: 350 },
    { value: 450 },
    { value: 400 },
    { value: 500 },
  ];

  // Sample data for the orders table
  const allOrders = [
    {
      id: "ORD001",
      date: "2023-06-01",
      customerName: "John Doe",
      paymentStatus: "Success",
      totalPrice: "$150.00",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD002",
      date: "2023-06-02",
      customerName: "Jane Smith",
      paymentStatus: "Pending",
      totalPrice: "$75.50",
      fulfillmentStatus: "Processing",
    },
    {
      id: "ORD003",
      date: "2023-06-03",
      customerName: "Alice Johnson",
      paymentStatus: "Failed",
      totalPrice: "$200.00",
      fulfillmentStatus: "Cancelled",
    },
    {
      id: "ORD004",
      date: "2023-06-04",
      customerName: "Bob Williams",
      paymentStatus: "Success",
      totalPrice: "$120.00",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD005",
      date: "2023-06-05",
      customerName: "Emma Brown",
      paymentStatus: "Pending",
      totalPrice: "$90.75",
      fulfillmentStatus: "Processing",
    },
    {
      id: "ORD006",
      date: "2023-06-06",
      customerName: "Michael Davis",
      paymentStatus: "Success",
      totalPrice: "$180.50",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD007",
      date: "2023-06-07",
      customerName: "Sarah Miller",
      paymentStatus: "Failed",
      totalPrice: "$50.25",
      fulfillmentStatus: "Cancelled",
    },
    {
      id: "ORD008",
      date: "2023-06-08",
      customerName: "David Wilson",
      paymentStatus: "Success",
      totalPrice: "$300.00",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD009",
      date: "2023-06-09",
      customerName: "Emily Taylor",
      paymentStatus: "Pending",
      totalPrice: "$85.00",
      fulfillmentStatus: "Processing",
    },
    {
      id: "ORD010",
      date: "2023-06-10",
      customerName: "James Anderson",
      paymentStatus: "Success",
      totalPrice: "$220.75",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD011",
      date: "2023-06-11",
      customerName: "Olivia Thomas",
      paymentStatus: "Failed",
      totalPrice: "$45.50",
      fulfillmentStatus: "Cancelled",
    },
    {
      id: "ORD012",
      date: "2023-06-12",
      customerName: "William Jackson",
      paymentStatus: "Success",
      totalPrice: "$175.25",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD013",
      date: "2023-06-13",
      customerName: "Sophia White",
      paymentStatus: "Pending",
      totalPrice: "$95.00",
      fulfillmentStatus: "Processing",
    },
    {
      id: "ORD014",
      date: "2023-06-14",
      customerName: "Liam Harris",
      paymentStatus: "Success",
      totalPrice: "$260.50",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD015",
      date: "2023-06-15",
      customerName: "Ava Martin",
      paymentStatus: "Failed",
      totalPrice: "$70.75",
      fulfillmentStatus: "Cancelled",
    },
    {
      id: "ORD016",
      date: "2023-06-16",
      customerName: "Noah Thompson",
      paymentStatus: "Success",
      totalPrice: "$190.00",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD017",
      date: "2023-06-17",
      customerName: "Isabella Garcia",
      paymentStatus: "Pending",
      totalPrice: "$110.25",
      fulfillmentStatus: "Processing",
    },
    {
      id: "ORD018",
      date: "2023-06-18",
      customerName: "Mason Martinez",
      paymentStatus: "Success",
      totalPrice: "$285.50",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD019",
      date: "2023-06-19",
      customerName: "Charlotte Robinson",
      paymentStatus: "Failed",
      totalPrice: "$55.75",
      fulfillmentStatus: "Cancelled",
    },
    {
      id: "ORD020",
      date: "2023-06-20",
      customerName: "Elijah Clark",
      paymentStatus: "Success",
      totalPrice: "$230.00",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD021",
      date: "2023-06-21",
      customerName: "Amelia Rodriguez",
      paymentStatus: "Pending",
      totalPrice: "$80.50",
      fulfillmentStatus: "Processing",
    },
    {
      id: "ORD022",
      date: "2023-06-22",
      customerName: "Oliver Lewis",
      paymentStatus: "Success",
      totalPrice: "$195.75",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD023",
      date: "2023-06-23",
      customerName: "Mia Lee",
      paymentStatus: "Failed",
      totalPrice: "$40.25",
      fulfillmentStatus: "Cancelled",
    },
    {
      id: "ORD024",
      date: "2023-06-24",
      customerName: "Daniel Walker",
      paymentStatus: "Success",
      totalPrice: "$310.00",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD025",
      date: "2023-06-25",
      customerName: "Evelyn Hall",
      paymentStatus: "Pending",
      totalPrice: "$100.50",
      fulfillmentStatus: "Processing",
    },
    {
      id: "ORD026",
      date: "2023-06-26",
      customerName: "Alexander Allen",
      paymentStatus: "Success",
      totalPrice: "$245.75",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD027",
      date: "2023-06-27",
      customerName: "Harper Young",
      paymentStatus: "Failed",
      totalPrice: "$65.25",
      fulfillmentStatus: "Cancelled",
    },
    {
      id: "ORD028",
      date: "2023-06-28",
      customerName: "Benjamin Hernandez",
      paymentStatus: "Success",
      totalPrice: "$205.00",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD029",
      date: "2023-06-29",
      customerName: "Abigail King",
      paymentStatus: "Pending",
      totalPrice: "$115.50",
      fulfillmentStatus: "Processing",
    },
    {
      id: "ORD030",
      date: "2023-06-30",
      customerName: "Ethan Wright",
      paymentStatus: "Success",
      totalPrice: "$270.75",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD031",
      date: "2023-07-01",
      customerName: "Sofia Lopez",
      paymentStatus: "Failed",
      totalPrice: "$60.25",
      fulfillmentStatus: "Cancelled",
    },
    {
      id: "ORD032",
      date: "2023-07-02",
      customerName: "Matthew Hill",
      paymentStatus: "Success",
      totalPrice: "$235.00",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD033",
      date: "2023-07-03",
      customerName: "Scarlett Scott",
      paymentStatus: "Pending",
      totalPrice: "$85.50",
      fulfillmentStatus: "Processing",
    },
    {
      id: "ORD034",
      date: "2023-07-04",
      customerName: "Aiden Green",
      paymentStatus: "Success",
      totalPrice: "$190.75",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD035",
      date: "2023-07-05",
      customerName: "Grace Adams",
      paymentStatus: "Failed",
      totalPrice: "$45.25",
      fulfillmentStatus: "Cancelled",
    },
    {
      id: "ORD036",
      date: "2023-07-06",
      customerName: "Lucas Baker",
      paymentStatus: "Success",
      totalPrice: "$320.00",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD037",
      date: "2023-07-07",
      customerName: "Chloe Gonzalez",
      paymentStatus: "Pending",
      totalPrice: "$105.50",
      fulfillmentStatus: "Processing",
    },
    {
      id: "ORD038",
      date: "2023-07-08",
      customerName: "Jackson Nelson",
      paymentStatus: "Success",
      totalPrice: "$250.75",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD039",
      date: "2023-07-09",
      customerName: "Lily Carter",
      paymentStatus: "Failed",
      totalPrice: "$70.25",
      fulfillmentStatus: "Cancelled",
    },
    {
      id: "ORD040",
      date: "2023-07-10",
      customerName: "Wyatt Mitchell",
      paymentStatus: "Success",
      totalPrice: "$210.00",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD041",
      date: "2023-07-11",
      customerName: "Layla Perez",
      paymentStatus: "Pending",
      totalPrice: "$120.50",
      fulfillmentStatus: "Processing",
    },
    {
      id: "ORD042",
      date: "2023-07-12",
      customerName: "Owen Roberts",
      paymentStatus: "Success",
      totalPrice: "$275.75",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD043",
      date: "2023-07-13",
      customerName: "Zoe Turner",
      paymentStatus: "Failed",
      totalPrice: "$65.25",
      fulfillmentStatus: "Cancelled",
    },
    {
      id: "ORD044",
      date: "2023-07-14",
      customerName: "Gabriel Phillips",
      paymentStatus: "Success",
      totalPrice: "$240.00",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD045",
      date: "2023-07-15",
      customerName: "Penelope Campbell",
      paymentStatus: "Pending",
      totalPrice: "$90.50",
      fulfillmentStatus: "Processing",
    },
    {
      id: "ORD046",
      date: "2023-07-16",
      customerName: "Leo Parker",
      paymentStatus: "Success",
      totalPrice: "$195.75",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD047",
      date: "2023-07-17",
      customerName: "Victoria Evans",
      paymentStatus: "Failed",
      totalPrice: "$50.25",
      fulfillmentStatus: "Cancelled",
    },
    {
      id: "ORD048",
      date: "2023-07-18",
      customerName: "Julian Edwards",
      paymentStatus: "Success",
      totalPrice: "$330.00",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD049",
      date: "2023-07-19",
      customerName: "Madelyn Collins",
      paymentStatus: "Pending",
      totalPrice: "$110.50",
      fulfillmentStatus: "Processing",
    },
    {
      id: "ORD050",
      date: "2023-07-20",
      customerName: "Christopher Stewart",
      paymentStatus: "Success",
      totalPrice: "$255.75",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD051",
      date: "2023-07-21",
      customerName: "Aubrey Sanchez",
      paymentStatus: "Failed",
      totalPrice: "$75.25",
      fulfillmentStatus: "Cancelled",
    },
    {
      id: "ORD052",
      date: "2023-07-22",
      customerName: "Landon Morris",
      paymentStatus: "Success",
      totalPrice: "$215.00",
      fulfillmentStatus: "Shipped",
    },
    {
      id: "ORD053",
      date: "2023-07-23",
      customerName: "Nora Rogers",
      paymentStatus: "Pending",
      totalPrice: "$125.50",
      fulfillmentStatus: "Processing",
    },
  ];

  const filteredOrders = allOrders.filter((order) => {
    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "unfulfilled" &&
        order.fulfillmentStatus === "Processing") ||
      (selectedTab === "unpaid" && order.paymentStatus !== "Success") ||
      (selectedTab === "open" &&
        order.fulfillmentStatus !== "Shipped" &&
        order.fulfillmentStatus !== "Cancelled") ||
      (selectedTab === "closed" &&
        (order.fulfillmentStatus === "Shipped" ||
          order.fulfillmentStatus === "Cancelled"));

    const matchesSearch =
      searchTerm === "" ||
      Object.values(order).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <div className="flex flex-row items-center justify-between p-4 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold dark:text-white">Orders</h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-[240px] justify-start text-left font-normal mt-2`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <MoreHorizontal className="mr-2 h-4 w-4" />
                  More Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Print Orders</DropdownMenuItem>
                <DropdownMenuItem>Generate Report</DropdownMenuItem>
                <DropdownMenuItem>Bulk Edit</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Order
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Total Orders
                </span>
                <span className="text-2xl font-bold dark:text-white">
                  1,234
                </span>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500">
                      5.2% from last week
                    </span>
                  </div>
                  <div className="w-20 h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#10B981"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Successful Orders
                </span>
                <span className="text-2xl font-bold dark:text-white">
                  1,180
                </span>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500">
                      3.7% from last week
                    </span>
                  </div>
                  <div className="w-20 h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#10B981"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Canceled Orders
                </span>
                <span className="text-2xl font-bold dark:text-white">54</span>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-sm text-red-500">
                      1.5% from last week
                    </span>
                  </div>
                  <div className="w-20 h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#EF4444"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={setSelectedTab}
            >
              <TabsList className="rounded-2xl p-2">
                <TabsTrigger
                  value="all"
                  className="transition-colors duration-300 rounded-xl"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="unfulfilled"
                  className="transition-colors duration-300 rounded-xl"
                >
                  Unfulfilled
                </TabsTrigger>
                <TabsTrigger
                  value="unpaid"
                  className="transition-colors duration-300 rounded-xl"
                >
                  Unpaid
                </TabsTrigger>
                <TabsTrigger
                  value="open"
                  className="transition-colors duration-300 rounded-xl"
                >
                  Open
                </TabsTrigger>
                <TabsTrigger
                  value="closed"
                  className="transition-colors duration-300 rounded-xl"
                >
                  Closed
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex space-x-2 items-center">
              {showSearch && (
                <Input
                  type="text"
                  placeholder="Search orders..."
                  className="w-64 transition-all duration-500 ease-in-out"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              )}
              <Button
                variant="outline"
                onClick={() => setShowSearch(!showSearch)}
                className="transition-all duration-300"
              >
                {showSearch ? (
                  <X className="h-4 w-4 transition-transform duration-300" />
                ) : (
                  <Search className="h-4 w-4 transition-transform duration-300" />
                )}
              </Button>
              <Button variant="outline" className="transition-all duration-300">
                <Filter className="h-4 w-4 transition-transform duration-300" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="transition-all duration-300"
                  >
                    <ArrowUpDown className="h-4 w-4 transition-transform duration-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="transition-opacity duration-300">
                  <DropdownMenuItem className="transition-colors duration-300">
                    Sort Ascending
                  </DropdownMenuItem>
                  <DropdownMenuItem className="transition-colors duration-300">
                    Sort Descending
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="transition-all duration-300"
                  >
                    <MoreHorizontal className="h-4 w-4 transition-transform duration-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="transition-opacity duration-300">
                  <DropdownMenuItem className="transition-colors duration-300">
                    More Action 1
                  </DropdownMenuItem>
                  <DropdownMenuItem className="transition-colors duration-300">
                    More Action 2
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="relative">
            <div className="h-[500px] overflow-auto scrollbar-hide">
              <Table>
                <TableHeader className="sticky top-0 bg-white dark:bg-gray-800 z-10">
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Fulfillment Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.paymentStatus === "Success"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </TableCell>
                      <TableCell>{order.totalPrice}</TableCell>
                      <TableCell>{order.fulfillmentStatus}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
