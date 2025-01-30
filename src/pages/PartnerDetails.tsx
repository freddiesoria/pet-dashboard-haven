import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Building, Mail, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const PartnerDetails = () => {
  const { id } = useParams();

  const { data: partner, isLoading } = useQuery({
    queryKey: ["partner", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!partner) return <div>Partner not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/partners"
          className="text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Building className="h-6 w-6" />
          {partner.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              {partner.email}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              {partner.phone}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold mb-4">Address</h2>
          <div className="space-y-1 text-muted-foreground">
            <p>{partner.street1}</p>
            {partner.street2 && <p>{partner.street2}</p>}
            <p>
              {partner.city}, {partner.state} {partner.zip_code}
            </p>
            <p>{partner.country}</p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold mb-4">Organization Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <p>{partner.organization_type}</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="animals">Animals</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Partner Overview</h2>
            <p className="text-muted-foreground">
              Overview information will be displayed here.
            </p>
          </Card>
        </TabsContent>
        <TabsContent value="animals" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Animals</h2>
            <p className="text-muted-foreground">
              Animals associated with this partner will be displayed here.
            </p>
          </Card>
        </TabsContent>
        <TabsContent value="applications" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Applications</h2>
            <p className="text-muted-foreground">
              Applications associated with this partner will be displayed here.
            </p>
          </Card>
        </TabsContent>
        <TabsContent value="notes" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Notes</h2>
            <p className="text-muted-foreground">
              Notes about this partner will be displayed here.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PartnerDetails;