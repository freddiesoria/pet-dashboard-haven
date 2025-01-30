import { Card } from "@/components/ui/card";
import { AddPetForm } from "@/components/AddPetForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Pets = () => {
  const navigate = useNavigate();
  
  const { data: pets, isLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pets</h1>
        <AddPetForm />
      </div>
      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Intake Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : pets?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No pets found
                </TableCell>
              </TableRow>
            ) : (
              pets?.map((pet) => (
                <TableRow 
                  key={pet.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/pets/${pet.id}`)}
                >
                  <TableCell>
                    {pet.image_url ? (
                      <img
                        src={`https://hxkyacytbqzhagolavbb.supabase.co/storage/v1/object/public/pets/${pet.image_url}`}
                        alt={pet.name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        N/A
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{pet.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        pet.status === "available"
                          ? "default"
                          : pet.status === "adopted"
                          ? "success"
                          : "secondary"
                      }
                    >
                      {pet.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {pet.intake_date
                      ? format(new Date(pet.intake_date), "MMM d, yyyy")
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Pets;