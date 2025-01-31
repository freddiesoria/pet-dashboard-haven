import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PartnerOrgFieldsProps {
  required?: boolean;
}

export function PartnerOrgFields({ required = true }: PartnerOrgFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Enter organization name" required={required} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="orgType">Type of Organization</Label>
        <Select name="orgType" required={required}>
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
    </>
  );
}