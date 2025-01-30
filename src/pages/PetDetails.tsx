import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Edit } from "lucide-react";

const PetDetails = () => {
  const { id } = useParams();

  const { data: pet, isLoading } = useQuery({
    queryKey: ["pet", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!pet) {
    return <div className="p-8">Pet not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/pets">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Pets
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <div className="space-y-6">
          <div className="aspect-square rounded-lg overflow-hidden">
            {pet.image_url ? (
              <img
                src={`https://hxkyacytbqzhagolavbb.supabase.co/storage/v1/object/public/pets/${pet.image_url}`}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                No Image
              </div>
            )}
          </div>

          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Internal ID</label>
                <p>{pet.internal_id}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Species</label>
                <p>{pet.species || "Unknown"}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Breed</label>
                <p>{pet.breed || "Mixed"}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Gender</label>
                <p>{pet.gender || "Unknown"}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Altered</label>
                <p>{pet.altered ? "Yes" : "No"}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{pet.name}</h1>
              <p className="text-muted-foreground">
                Status: {pet.status}
              </p>
            </div>
            <Button size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="intake">Intake/Outcome</TabsTrigger>
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Current Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground">Current Location</label>
                    <p>Unknown</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Weight</label>
                    <p>{pet.weight ? `${pet.weight} ${pet.weight_unit}` : "Unknown"}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <p className="text-muted-foreground">No description available</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Behavior Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Gets Along with Dogs</label>
                    <p>Unknown</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Gets Along with Cats</label>
                    <p>Unknown</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Gets Along with Children</label>
                    <p>Unknown</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">House Trained</label>
                    <p>Unknown</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="intake">Intake/Outcome information</TabsContent>
            <TabsContent value="medical">Medical information</TabsContent>
            <TabsContent value="notes">Notes</TabsContent>
            <TabsContent value="files">Files</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;