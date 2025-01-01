import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <Button onClick={() => navigate("/users/invite")}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">System Users</h2>
        <p className="text-gray-600">Manage staff and administrator accounts.</p>
      </Card>
    </div>
  );
};

export default Users;