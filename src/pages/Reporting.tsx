import { Card } from "@/components/ui/card";

const Reporting = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reporting</h1>
      </div>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Analytics & Reports</h2>
        <p className="text-gray-600">View adoption statistics and generate reports.</p>
      </Card>
    </div>
  );
};

export default Reporting;