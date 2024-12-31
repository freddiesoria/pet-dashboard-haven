import { Card } from "@/components/ui/card";

const Partners = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Partners</h1>
      </div>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Partner Organizations</h2>
        <p className="text-gray-600">Manage relationships with shelters and rescue organizations.</p>
      </Card>
    </div>
  );
};

export default Partners;