import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface BlogFormFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export function BlogFormFields({ register, errors }: BlogFormFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{String(errors.title.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          {...register("slug", { required: "Slug is required" })}
        />
        {errors.slug && (
          <p className="text-sm text-red-500">{String(errors.slug.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Input
          id="excerpt"
          {...register("excerpt")}
        />
      </div>
    </>
  );
}