import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { personFormSchema, type PersonFormValues } from "@/schemas/personFormSchema";
import PersonProfileFields from "./person/PersonProfileFields";
import PersonTagFields from "./person/PersonTagFields";

const AddPersonForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<PersonFormValues>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
  });

  const onSubmit = async (values: PersonFormValues) => {
    try {
      setIsSubmitting(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to add a person",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("people").insert({
        first_name: values.firstName,
        last_name: values.lastName,
        phone: values.phone,
        email: values.email,
        street1: values.street1,
        street2: values.street2 || null,
        city: values.city,
        state: values.state,
        country: values.country,
        zip_code: values.zipCode,
        adopter: values.adopter,
        potential_adopter: values.potentialAdopter,
        adopt_waitlist: values.adoptWaitlist,
        do_not_adopt: values.doNotAdopt,
        foster: values.foster,
        available_foster: values.availableFoster,
        current_foster: values.currentFoster,
        dormant_foster: values.dormantFoster,
        foster_waitlist: values.fosterWaitlist,
        do_not_foster: values.doNotFoster,
        volunteer: values.volunteer,
        do_not_volunteer: values.doNotVolunteer,
        donor: values.donor,
        board_member: values.boardMember,
        has_dogs: values.hasDogs,
        has_cats: values.hasCats,
        has_kids: values.hasKids,
        processing_application: values.processingApplication,
        owner_surrender: values.ownerSurrender,
        user_id: user.id,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Person added successfully",
      });

      navigate("/people");
    } catch (error) {
      console.error("Error adding person:", error);
      toast({
        title: "Error",
        description: "Failed to add person. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/people")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to People
      </Button>

      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <span className="i-lucide-users h-8 w-8" />
        Add Person
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <PersonProfileFields form={form} />
          <PersonTagFields form={form} />

          <div className="flex justify-end gap-4">
            <Button 
              type="submit" 
              size="lg" 
              disabled={isSubmitting}
              className="min-w-[150px]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="i-lucide-loader-2 animate-spin" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Add Person
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddPersonForm;