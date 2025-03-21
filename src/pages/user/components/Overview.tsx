import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Plane, Package, DollarSign, Clock } from "lucide-react";

interface OverviewProps {
  className?: string;
}

export function Overview({ className }: OverviewProps) {
  const [role, setRole] = useState<"traveler" | "sender">("traveler");

  const travelerData = [
    {
      name: "Jan",
      trips: 4,
      earnings: 400,
    },
    {
      name: "Feb",
      trips: 3,
      earnings: 350,
    },
    {
      name: "Mar",
      trips: 5,
      earnings: 500,
    },
    {
      name: "Apr",
      trips: 7,
      earnings: 650,
    },
    {
      name: "May",
      trips: 6,
      earnings: 550,
    },
    {
      name: "Jun",
      trips: 8,
      earnings: 700,
    },
  ];

  const senderData = [
    {
      name: "Jan",
      packages: 2,
      cost: 150,
    },
    {
      name: "Feb",
      packages: 4,
      cost: 300,
    },
    {
      name: "Mar",
      packages: 3,
      cost: 250,
    },
    {
      name: "Apr",
      packages: 5,
      cost: 400,
    },
    {
      name: "May",
      packages: 4,
      cost: 350,
    },
    {
      name: "Jun",
      packages: 6,
      cost: 450,
    },
  ];

  const travelerStatusData = [
    { name: "Completed", value: 12, color: "#10b981" },
    { name: "In Progress", value: 3, color: "#3b82f6" },
    { name: "Pending", value: 2, color: "#f59e0b" },
  ];

  const senderStatusData = [
    { name: "Delivered", value: 8, color: "#10b981" },
    { name: "In Transit", value: 4, color: "#3b82f6" },
    { name: "Pending", value: 3, color: "#f59e0b" },
  ];

  const travelerStats = [
    {
      title: "Total Trips",
      value: "33",
      icon: Plane,
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Earnings",
      value: "$2,650",
      icon: DollarSign,
      change: "+18%",
      changeType: "positive",
    },
    {
      title: "Pending Trips",
      value: "5",
      icon: Clock,
      change: "-2",
      changeType: "negative",
    },
    {
      title: "Packages Delivered",
      value: "28",
      icon: Package,
      change: "+8",
      changeType: "positive",
    },
  ];

  const senderStats = [
    {
      title: "Total Packages",
      value: "15",
      icon: Package,
      change: "+5",
      changeType: "positive",
    },
    {
      title: "Spending",
      value: "$1,250",
      icon: DollarSign,
      change: "+10%",
      changeType: "negative",
    },
    {
      title: "Pending Packages",
      value: "3",
      icon: Clock,
      change: "-1",
      changeType: "positive",
    },
    {
      title: "Delivered Packages",
      value: "12",
      icon: Plane,
      change: "+4",
      changeType: "positive",
    },
  ];

  // Custom tooltip component with proper null checks
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length || !payload[0] || !payload[1]) {
      return null;
    }

    return (
      <ChartTooltip>
        <ChartTooltipContent>
          <div>
            <p className="text-sm font-medium">{label || ""}</p>
            <p className="text-sm">
              {role === "traveler" ? "Trips" : "Packages"}:{" "}
              {payload[0].value || 0}
            </p>
            <p className="text-sm">
              {role === "traveler" ? "Earnings" : "Cost"}: $
              {payload[1].value || 0}
            </p>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    );
  };

  // Custom tooltip component for pie chart
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length || !payload[0]) {
      return null;
    }

    return (
      <ChartTooltip>
        <ChartTooltipContent>
          <div>
            <p className="text-sm font-medium">{payload[0].name || ""}</p>
            <p className="text-sm">Count: {payload[0].value || 0}</p>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    );
  };

  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          View your{" "}
          {role === "traveler" ? "trips and earnings" : "packages and spending"}
          .
        </CardDescription>
        <Tabs
          defaultValue={role}
          className="w-full"
          onValueChange={(value) => setRole(value as "traveler" | "sender")}
        >
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="traveler" className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              <span>Traveler</span>
            </TabsTrigger>
            <TabsTrigger value="sender" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>Sender</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="traveler">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
              {travelerStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between space-x-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </span>
                        <span className="text-2xl font-bold">{stat.value}</span>
                        <Badge
                          variant={
                            stat.changeType === "positive"
                              ? "default"
                              : "destructive"
                          }
                          className="mt-1 w-fit"
                        >
                          {stat.change}
                        </Badge>
                      </div>
                      <div className="rounded-full bg-primary/10 p-2">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trips & Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={travelerData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <RechartsTooltip content={<CustomBarTooltip />} />
                        <Bar yAxisId="left" dataKey="trips" fill="#3b82f6" />
                        <Bar
                          yAxisId="right"
                          dataKey="earnings"
                          fill="#10b981"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Trip Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={travelerStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {travelerStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip content={<CustomPieTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="sender">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
              {senderStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between space-x-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </span>
                        <span className="text-2xl font-bold">{stat.value}</span>
                        <Badge
                          variant={
                            stat.changeType === "positive"
                              ? "default"
                              : "destructive"
                          }
                          className="mt-1 w-fit"
                        >
                          {stat.change}
                        </Badge>
                      </div>
                      <div className="rounded-full bg-primary/10 p-2">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Packages & Spending</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={senderData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <RechartsTooltip content={<CustomBarTooltip />} />
                        <Bar yAxisId="left" dataKey="packages" fill="#3b82f6" />
                        <Bar yAxisId="right" dataKey="cost" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Package Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={senderStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {senderStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip content={<CustomPieTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
}
