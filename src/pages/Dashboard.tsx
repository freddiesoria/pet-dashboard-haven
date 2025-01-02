import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";

const data = [
  { value: 10 },
  { value: 15 },
  { value: 20 },
  { value: 25 },
  { value: 30 },
  { value: 40 },
];

const StatCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
  <Card className="relative overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="h-[80px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Citics Solutions S.L.</h1>
        <Button variant="outline" asChild>
          <Link to="/organization-settings">Organization Settings</Link>
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Quick Stats</h2>
          <div className="flex gap-2 rounded-full bg-muted p-1">
            <Button variant="ghost" size="sm" className="rounded-full">Month</Button>
            <Button variant="ghost" size="sm" className="rounded-full">Year</Button>
            <Button variant="ghost" size="sm" className="rounded-full">All Time</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Intake" value={0} color="#9b87f5" />
          <StatCard title="Adopted" value={0} color="#60A5FA" />
          <StatCard title="Transferred" value={0} color="#FFA07A" />
          <StatCard title="Euthanized" value={0} color="#F87171" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create Forms to Embed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Needing to embed an Adoption Application, Foster Application, or Volunteer Application into your website?</p>
            <p>
              Submit your{" "}
              <Link to="/application-requests" className="text-primary hover:underline">
                application requests
              </Link>{" "}
              here to receive your code to embed into your website.
            </p>
            <p>Completed applications will appear in your Applications tab and can be attached to a pet's file.</p>
            <p>
              Go to{" "}
              <Link to="/organization-settings" className="text-primary hover:underline">
                Organization Setting → Form Settings
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Click here to find helpful articles on{" "}
              <Link to="/help" className="text-primary hover:underline">
                how to use Pawlytics
              </Link>
            </p>
            <p>Wondering what we are working on? See what we are developing for you!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;