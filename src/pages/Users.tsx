import { Card } from "@/components/ui/card";

const Users = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
      </div>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">System Users</h2>
        <p className="text-gray-600">Manage staff and administrator accounts.</p>
      </Card>
    </div>
  );
};

export default Users;