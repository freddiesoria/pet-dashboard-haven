import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  role: z.enum(["admin", "manager", "petSpecialist", "analyst"], {
    required_error: "Please select a role",
  }),
});

const InviteUserForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      role: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${values.email}`,
    });
    navigate("/users");
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/users")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Users
      </Button>

      <h1 className="text-3xl font-bold mb-8">
        Invite someone to join Citics Solutions S.L.
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Enter email address" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name (optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter name" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="petSpecialist">Pet Specialist</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Invite</Button>
          </div>
        </form>
      </Form>

      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Roles and Permissions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Admin</h3>
            <p className="text-sm text-gray-600">
              Can manage all aspects of the organization, Organization Settings,
              Pets, People, Reports, Users, Applications, Partners, Payments (for
              US-based organizations)
            </p>
          </div>
          <div>
            <h3 className="font-medium">Manager</h3>
            <p className="text-sm text-gray-600">
              Pets, People, Reports, Users, Applications, Partners, Payments (for
              US-based organizations)
            </p>
          </div>
          <div>
            <h3 className="font-medium">Analyst</h3>
            <p className="text-sm text-gray-600">Pets, Reports</p>
          </div>
          <div>
            <h3 className="font-medium">Pet Specialist</h3>
            <p className="text-sm text-gray-600">Pets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteUserForm;