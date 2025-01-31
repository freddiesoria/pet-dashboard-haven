import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BlogPostFormProps {
  post?: any;
  onSuccess: () => void;
}

interface FormData {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  published: boolean;
  featured_image?: string;
}

export function BlogPostForm({ post, onSuccess }: BlogPostFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: post
      ? {
          title: post.title,
          content: post.content,
          excerpt: post.excerpt || "",
          slug: post.slug,
          published: post.published,
          featured_image: post.featured_image,
        }
      : {
          published: false,
        },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = post
        ? await supabase
            .from("blog_posts")
            .update({
              ...data,
              updated_at: new Date().toISOString(),
            })
            .eq("id", post.id)
        : await supabase.from("blog_posts").insert([
            {
              ...data,
              author_id: (await supabase.auth.getUser()).data.user?.id,
            },
          ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Blog post ${post ? "updated" : "created"} successfully`,
      });
      onSuccess();
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast({
        title: "Error",
        description: `Failed to ${post ? "update" : "create"} blog post`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          {...register("slug", { required: "Slug is required" })}
        />
        {errors.slug && (
          <p className="text-sm text-red-500">{errors.slug.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          {...register("excerpt")}
          placeholder="Brief description of the post"
        />
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          {...register("content", { required: "Content is required" })}
          className="min-h-[200px]"
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="featured_image">Featured Image URL</Label>
        <Input
          id="featured_image"
          type="url"
          {...register("featured_image")}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="published"
          {...register("published")}
        />
        <Label htmlFor="published">Published</Label>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : post ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
}