import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PartnerAddressFieldsProps {
  required?: boolean;
}

export function PartnerAddressFields({ required = true }: PartnerAddressFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="street1">Street 1</Label>
        <Input id="street1" name="street1" placeholder="Enter street address" required={required} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="street2">Street 2</Label>
        <Input id="street2" name="street2" placeholder="Enter street address" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input id="city" name="city" placeholder="Enter city" required={required} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Select name="state" required={required}>
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
        <Select name="country" required={required}>
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
        <Input id="zipCode" name="zipCode" placeholder="Enter zip code" required={required} />
      </div>
    </>
  );
}