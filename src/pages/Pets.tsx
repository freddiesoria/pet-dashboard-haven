import { Card } from "@/components/ui/card";
import { AddPetForm } from "@/components/AddPetForm";

const Pets = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pets</h1>
        <AddPetForm />
      </div>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Available Pets</h2>
        <p className="text-gray-600">Manage your available pets for adoption here.</p>
      </Card>
    </div>
  );
};

export default Pets;