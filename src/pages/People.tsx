import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const People = () => {
  const navigate = useNavigate();

  const { data: people, isLoading } = useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("people")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching people:", error);
        return [];
      }
      return data;
    },
  });

  const getAdopterTags = (person: any) => {
    const tags = [];
    if (person.adopter) tags.push("Adopter");
    if (person.potential_adopter) tags.push("Potential Adopter");
    if (person.adopt_waitlist) tags.push("Adopt Waitlist");
    if (person.do_not_adopt) tags.push("Do Not Adopt");
    return tags;
  };

  const getFosterTags = (person: any) => {
    const tags = [];
    if (person.foster) tags.push("Foster");
    if (person.available_foster) tags.push("Available Foster");
    if (person.current_foster) tags.push("Current Foster");
    if (person.dormant_foster) tags.push("Dormant Foster");
    if (person.foster_waitlist) tags.push("Foster Waitlist");
    if (person.do_not_foster) tags.push("Do Not Foster");
    return tags;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">People</h1>
        <Button onClick={() => navigate("/people/add")} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Person
        </Button>
      </div>

      <Card className="p-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Adopter Tags</TableHead>
                <TableHead>Foster Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {people?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
                    No people found. Add your first person using the button above.
                  </TableCell>
                </TableRow>
              ) : (
                people?.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell>
                      {person.first_name} {person.last_name}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 flex-wrap">
                        {getAdopterTags(person).map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 flex-wrap">
                        {getFosterTags(person).map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default People;