import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

const People = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">People</h1>
        <Button onClick={() => navigate("/people/add")} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Person
        </Button>
      </div>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Adoption Seekers</h2>
        <p className="text-gray-600">Manage potential adopters and their profiles.</p>
      </Card>
    </div>
  );
};

export default People;