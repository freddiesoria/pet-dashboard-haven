import { Card } from "@/components/ui/card";

const Applications = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Applications</h1>
      </div>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Adoption Applications</h2>
        <p className="text-gray-600">Review and manage adoption applications.</p>
      </Card>
    </div>
  );
};

export default Applications;