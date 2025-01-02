import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { PieChart } from "lucide-react";

const Reporting = () => {
  // Sample data - in a real app this would come from an API
  const data = [
    { name: 'Jan', value: 0 },
    { name: 'Feb', value: 0 },
    { name: 'Mar', value: 0 },
    { name: 'Apr', value: 0 },
    { name: 'May', value: 0 },
    { name: 'Jun', value: 0 },
  ];

  const chartConfig = {
    line: {
      theme: {
        light: "hsl(var(--primary))",
        dark: "hsl(var(--primary))",
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <PieChart className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Reporting</h1>
      </div>

      <div className="space-y-4">
        <Tabs defaultValue="visual" className="w-full">
          <TabsList>
            <TabsTrigger value="visual" className="bg-purple-600 data-[state=active]:bg-purple-700 text-white">
              Visual Reports
            </TabsTrigger>
            <TabsTrigger value="csv">Downloadable CSV Reports</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Annual Intake Sum by Month 2024</h3>
            <div className="h-[300px] flex items-center justify-center">
              {data.length === 0 ? (
                <p className="text-purple-600">No pets returned for that filter set.</p>
              ) : (
                <ChartContainer config={chartConfig}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" />
                  </LineChart>
                </ChartContainer>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Annual Outcome Sum by Month 2024</h3>
            <div className="h-[300px] flex items-center justify-center">
              {data.length === 0 ? (
                <p className="text-purple-600">No pets returned for that filter set.</p>
              ) : (
                <ChartContainer config={chartConfig}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" />
                  </LineChart>
                </ChartContainer>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Annual Intake Timeline by Month 2024</h3>
            <div className="h-[300px] flex items-center justify-center">
              {data.length === 0 ? (
                <p className="text-purple-600">No pets returned for that filter set.</p>
              ) : (
                <ChartContainer config={chartConfig}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" />
                  </LineChart>
                </ChartContainer>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Annual Outcome Timeline by Month 2024</h3>
            <div className="h-[300px] flex items-center justify-center">
              {data.length === 0 ? (
                <p className="text-purple-600">No pets returned for that filter set.</p>
              ) : (
                <ChartContainer config={chartConfig}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" />
                  </LineChart>
                </ChartContainer>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reporting;