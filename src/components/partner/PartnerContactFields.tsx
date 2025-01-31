import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PartnerContactFieldsProps {
  required?: boolean;
}

export function PartnerContactFields({ required = true }: PartnerContactFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="Enter email" required={required} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" type="tel" placeholder="+1" required={required} />
      </div>
    </>
  );
}