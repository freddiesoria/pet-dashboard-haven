import { UseFormReturn } from "react-hook-form";
import { PersonFormValues } from "@/schemas/personFormSchema";
import PersonTagGroup from "./PersonTagGroup";

interface PersonTagFieldsProps {
  form: UseFormReturn<PersonFormValues>;
}

const PersonTagFields = ({ form }: PersonTagFieldsProps) => {
  const adopterTags = [
    { name: "adopter" as const, label: "Adopter" },
    { name: "potentialAdopter" as const, label: "Potential Adopter" },
    { name: "adoptWaitlist" as const, label: "Adopt Waitlist" },
    { name: "doNotAdopt" as const, label: "Do Not Adopt" },
  ];

  const fosterTags = [
    { name: "foster" as const, label: "Foster" },
    { name: "availableFoster" as const, label: "Available Foster" },
    { name: "currentFoster" as const, label: "Current Foster" },
    { name: "dormantFoster" as const, label: "Dormant Foster" },
    { name: "fosterWaitlist" as const, label: "Foster Waitlist" },
    { name: "doNotFoster" as const, label: "Do Not Foster" },
  ];

  const volunteerTags = [
    { name: "volunteer" as const, label: "Volunteer" },
    { name: "doNotVolunteer" as const, label: "Do Not Volunteer" },
  ];

  const miscTags = [
    { name: "donor" as const, label: "Donor" },
    { name: "boardMember" as const, label: "Board Member" },
    { name: "hasDogs" as const, label: "Has Dogs" },
    { name: "hasCats" as const, label: "Has Cats" },
    { name: "hasKids" as const, label: "Has Kids" },
    { name: "processingApplication" as const, label: "Processing Application" },
    { name: "ownerSurrender" as const, label: "Owner Surrender" },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Tags</h2>
      <div className="grid md:grid-cols-4 gap-8">
        <PersonTagGroup form={form} title="Adopter Tags" options={adopterTags} />
        <PersonTagGroup form={form} title="Foster Tags" options={fosterTags} />
        <PersonTagGroup form={form} title="Volunteer" options={volunteerTags} />
        <PersonTagGroup form={form} title="Misc Tags" options={miscTags} />
      </div>
    </div>
  );
};

export default PersonTagFields;