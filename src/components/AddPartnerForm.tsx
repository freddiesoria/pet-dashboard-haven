import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { PartnerOrgFields } from "./partner/PartnerOrgFields";
import { PartnerContactFields } from "./partner/PartnerContactFields";
import { PartnerAddressFields } from "./partner/PartnerAddressFields";

export function AddPartnerForm() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const partnerData = {
      name: String(formData.get("name")),
      email: String(formData.get("email")),
      phone: String(formData.get("phone")),
      street1: String(formData.get("street1")),
      street2: formData.get("street2") ? String(formData.get("street2")) : null,
      city: String(formData.get("city")),
      state: String(formData.get("state")),
      country: String(formData.get("country")),
      zip_code: String(formData.get("zipCode")),
      organization_type: String(formData.get("orgType")),
      user_id: (await supabase.auth.getUser()).data.user?.id,
    };

    try {
      const { data, error } = await supabase
        .from("partners")
        .insert(partnerData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Partner has been created successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ["partners"] });
      setOpen(false);
      navigate(`/partners/${data.id}`);
    } catch (error) {
      console.error("Error creating partner:", error);
      toast({
        title: "Error",
        description: "There was an error creating the partner.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <Building className="h-4 w-4" />
        Add New Partner
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <Link to="/partners" className="text-muted-foreground hover:text-primary">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Building className="h-5 w-5" />
                Add New Partner
              </DialogTitle>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Start from scratch or begin typing to search for an existing organization in Pawlytics.
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PartnerOrgFields />
              <PartnerContactFields />
              <PartnerAddressFields />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}