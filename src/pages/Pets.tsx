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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Pets = () => {
  const navigate = useNavigate();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  // Fetch all users for super admin
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data: profile } = await supabase
        .from("profiles")
        .select("email")
        .eq("id", user.id)
        .single();

      // Only fetch users if super admin
      if (profile?.email === "info@hoozzee.com") {
        const { data } = await supabase
          .from("profiles")
          .select("id, email")
          .order("email");
        return data || [];
      }
      return [];
    },
  });

  const { data: pets, isLoading } = useQuery({
    queryKey: ["pets", selectedUserId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      let query = supabase
        .from("pets")
        .select("*, profiles(email)")
        .order("created_at", { ascending: false });

      // If a specific user is selected and we're super admin, filter by that user
      if (selectedUserId) {
        query = query.eq("user_id", selectedUserId);
      } else {
        // Otherwise, show only the current user's pets
        query = query.eq("user_id", user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching pets:", error);
        return [];
      }
      return data;
    },
  });

  const isSuperAdmin = users && users.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pets</h1>
        <AddPetForm />
      </div>

      {isSuperAdmin && (
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Filter by user:</span>
            <Select
              value={selectedUserId || ""}
              onValueChange={(value) => setSelectedUserId(value || null)}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="All users" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All users</SelectItem>
                {users?.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Intake Date</TableHead>
              {isSuperAdmin && <TableHead>User</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={isSuperAdmin ? 5 : 4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : pets?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isSuperAdmin ? 5 : 4} className="text-center">
                  No pets found. Add your first pet using the button above.
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
                  {isSuperAdmin && (
                    <TableCell className="text-muted-foreground">
                      {(pet.profiles as any)?.email}
                    </TableCell>
                  )}
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
