import { Card } from "@/components/ui/card";

const People = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">People</h1>
      </div>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Adoption Seekers</h2>
        <p className="text-gray-600">Manage potential adopters and their profiles.</p>
      </Card>
    </div>
  );
};

export default People;