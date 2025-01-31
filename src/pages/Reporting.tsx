import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer } from 'recharts';
import { PieChart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfYear, endOfYear, format, eachMonthOfInterval } from "date-fns";

const Reporting = () => {
  const currentYear = new Date().getFullYear();
  const startDate = startOfYear(new Date(currentYear, 0));
  const endDate = endOfYear(new Date(currentYear, 0));

  // Query pets data
  const { data: pets, isLoading } = useQuery({
    queryKey: ["pets-intake"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("status", "available")
        .gte("intake_date", startDate.toISOString())
        .lte("intake_date", endDate.toISOString());

      if (error) throw error;
      return data;
    },
  });

  // Transform data for the chart
  const months = eachMonthOfInterval({
    start: startDate,
    end: endDate,
  });

  const chartData = months.map(month => {
    const monthPets = pets?.filter(pet => {
      const petDate = new Date(pet.intake_date);
      return petDate.getMonth() === month.getMonth();
    }) || [];

    return {
      name: format(month, "MMM yyyy"),
      dog: monthPets.filter(pet => pet.species?.toLowerCase() === "dog").length,
      cat: monthPets.filter(pet => pet.species?.toLowerCase() === "cat").length,
      "small animal": monthPets.filter(pet => pet.species?.toLowerCase() === "small animal").length,
      "guinea pig": monthPets.filter(pet => pet.species?.toLowerCase() === "guinea pig").length,
      rabbit: monthPets.filter(pet => pet.species?.toLowerCase() === "rabbit").length,
    };
  });

  const chartConfig = {
    dog: {
      theme: {
        light: "#F2FCE2",
        dark: "#F2FCE2",
      },
    },
    cat: {
      theme: {
        light: "#D3E4FD",
        dark: "#D3E4FD",
      },
    },
    "small animal": {
      theme: {
        light: "#FEF7CD",
        dark: "#FEF7CD",
      },
    },
    "guinea pig": {
      theme: {
        light: "#E5DEFF",
        dark: "#E5DEFF",
      },
    },
    rabbit: {
      theme: {
        light: "#FFDEE2",
        dark: "#FFDEE2",
      },
    },
  };

  // Sample data for the other charts (you can replace this with real data later)
  const sampleTimelineData = [
    { name: "Jan", value: 10 },
    { name: "Feb", value: 15 },
    { name: "Mar", value: 8 },
    // Add more months as needed
  ];

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
            <h3 className="text-lg font-semibold mb-4">Annual Intake Sum by Month {currentYear}</h3>
            <div className="h-[300px]">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-purple-600">Loading data...</p>
                </div>
              ) : chartData.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-purple-600">No pets returned for that filter set.</p>
                </div>
              ) : (
                <ChartContainer config={chartConfig}>
                  <>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="dog" stackId="a" fill="var(--color-dog)" name="Dog" />
                      <Bar dataKey="cat" stackId="a" fill="var(--color-cat)" name="Cat" />
                      <Bar dataKey="small animal" stackId="a" fill="var(--color-small animal)" name="Small Animal" />
                      <Bar dataKey="guinea pig" stackId="a" fill="var(--color-guinea pig)" name="Guinea Pig" />
                      <Bar dataKey="rabbit" stackId="a" fill="var(--color-rabbit)" name="Rabbit" />
                    </BarChart>
                    <ChartLegend content={<ChartLegendContent />} />
                  </>
                </ChartContainer>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Annual Outcome Sum by Month {currentYear}</h3>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-purple-600">Coming soon</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Annual Intake Timeline by Month {currentYear}</h3>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-purple-600">Coming soon</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Annual Outcome Timeline by Month {currentYear}</h3>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-purple-600">Coming soon</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reporting;