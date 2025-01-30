import * as z from "zod";

export const personFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  street1: z.string().min(1, "Street address is required"),
  street2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  // Tags
  adopter: z.boolean().default(false),
  potentialAdopter: z.boolean().default(false),
  adoptWaitlist: z.boolean().default(false),
  doNotAdopt: z.boolean().default(false),
  // Foster Tags
  foster: z.boolean().default(false),
  availableFoster: z.boolean().default(false),
  currentFoster: z.boolean().default(false),
  dormantFoster: z.boolean().default(false),
  fosterWaitlist: z.boolean().default(false),
  doNotFoster: z.boolean().default(false),
  // Volunteer Tags
  volunteer: z.boolean().default(false),
  doNotVolunteer: z.boolean().default(false),
  // Misc Tags
  donor: z.boolean().default(false),
  boardMember: z.boolean().default(false),
  hasDogs: z.boolean().default(false),
  hasCats: z.boolean().default(false),
  hasKids: z.boolean().default(false),
  processingApplication: z.boolean().default(false),
  ownerSurrender: z.boolean().default(false),
});

export type PersonFormValues = z.infer<typeof personFormSchema>;