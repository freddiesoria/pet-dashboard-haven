import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { AddPartnerForm } from "@/components/AddPartnerForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Building } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Partners = () => {
  const navigate = useNavigate();
  const [selectedUserId, setSelectedUserId] = useState<string | "all">("all");

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

  const { data: partners, isLoading } = useQuery({
    queryKey: ["partners", selectedUserId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      let query = supabase
        .from("partners")
        .select("*")
        .order("created_at", { ascending: false });

      // If a specific user is selected and we're super admin, filter by that user
      if (selectedUserId !== "all") {
        query = query.eq("user_id", selectedUserId);
      } else if (!isSuperAdmin) {
        // If not super admin, only show their own partners
        query = query.eq("user_id", user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching partners:", error);
        return [];
      }
      return data;
    },
  });

  const isSuperAdmin = users && users.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Partners</h1>
        <AddPartnerForm />
      </div>

      {isSuperAdmin && (
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Filter by user:</span>
            <Select
              value={selectedUserId}
              onValueChange={(value) => setSelectedUserId(value as string)}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="All users" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All users</SelectItem>
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
              <TableHead>Organization</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : partners?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No partners found. Add your first partner using the button above.
                </TableCell>
              </TableRow>
            ) : (
              partners?.map((partner) => (
                <TableRow
                  key={partner.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/partners/${partner.id}`)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {partner.name}
                    </div>
                  </TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell>{partner.phone}</TableCell>
                  <TableCell>
                    {partner.city}, {partner.state}
                  </TableCell>
                  <TableCell>{partner.organization_type}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Partners;