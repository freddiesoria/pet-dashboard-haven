import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export function AddPartnerForm() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const partnerData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      street1: formData.get("street1"),
      street2: formData.get("street2") || null,
      city: formData.get("city"),
      state: formData.get("state"),
      country: formData.get("country"),
      zip_code: formData.get("zipCode"),
      organization_type: formData.get("orgType"),
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
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Enter organization name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Enter email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+1" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="street1">Street 1</Label>
                <Input id="street1" name="street1" placeholder="Enter street address" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="street2">Street 2</Label>
                <Input id="street2" name="street2" placeholder="Enter street address" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" placeholder="Enter city" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select name="state" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select name="country" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip code</Label>
                <Input id="zipCode" name="zipCode" placeholder="Enter zip code" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="orgType">Type of Organization</Label>
                <Select name="orgType" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shelter">Shelter</SelectItem>
                    <SelectItem value="rescue">Rescue</SelectItem>
                    <SelectItem value="sanctuary">Sanctuary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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