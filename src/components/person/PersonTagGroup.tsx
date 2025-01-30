import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { PersonFormValues } from "@/schemas/personFormSchema";

interface TagOption {
  name: keyof PersonFormValues;
  label: string;
}

interface PersonTagGroupProps {
  form: UseFormReturn<PersonFormValues>;
  title: string;
  color?: string;
  options: TagOption[];
}

const PersonTagGroup = ({ form, title, color = "purple", options }: PersonTagGroupProps) => {
  return (
    <div className="space-y-4">
      <h3 className={`font-medium text-${color}-600`}>{title}</h3>
      {options.map((option) => (
        <FormField
          key={option.name}
          control={form.control}
          name={option.name}
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="!m-0">{option.label}</FormLabel>
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};

export default PersonTagGroup;