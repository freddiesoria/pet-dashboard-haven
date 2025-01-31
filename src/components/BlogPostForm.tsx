import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import RichTextEditor from "./RichTextEditor";
import { CategorySelect } from "./CategorySelect";
import { TagSelect } from "./TagSelect";
import { useUserRole } from "@/hooks/useUserRole";

interface BlogPostFormProps {
  post?: any;
  isEditing?: boolean;
  onSuccess?: () => void;
}

export function BlogPostForm({ post, isEditing, onSuccess }: BlogPostFormProps) {
  const { isAdmin, isEditor } = useUserRole();
  const [content, setContent] = useState(post?.content || "");
  const [categories, setCategories] = useState<string[]>(post?.categories || []);
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const { toast } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      excerpt: post?.excerpt || "",
    },
  });

  if (!isAdmin && !isEditor) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p>You need to be an admin or editor to manage blog posts.</p>
      </div>
    );
  }

  const onSubmit = async (formData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const postData = {
        ...formData,
        content,
        author_id: user.id,
      };

      let savedPost;
      if (isEditing) {
        const { data, error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", post.id)
          .select()
          .single();

        if (error) throw error;
        savedPost = data;
      } else {
        const { data, error } = await supabase
          .from("blog_posts")
          .insert(postData)
          .select()
          .single();

        if (error) throw error;
        savedPost = data;
      }

      // Handle categories
      if (categories.length > 0) {
        const categoryLinks = categories.map(categoryId => ({
          post_id: savedPost.id,
          category_id: categoryId,
        }));

        if (isEditing) {
          await supabase
            .from("post_categories")
            .delete()
            .eq("post_id", savedPost.id);
        }

        const { error: categoryError } = await supabase
          .from("post_categories")
          .insert(categoryLinks);

        if (categoryError) throw categoryError;
      }

      // Handle tags
      if (tags.length > 0) {
        const tagLinks = tags.map(tagId => ({
          post_id: savedPost.id,
          tag_id: tagId,
        }));

        if (isEditing) {
          await supabase
            .from("post_tags")
            .delete()
            .eq("post_id", savedPost.id);
        }

        const { error: tagError } = await supabase
          .from("post_tags")
          .insert(tagLinks);

        if (tagError) throw tagError;
      }

      toast({
        title: "Success",
        description: isEditing ? "Post updated successfully" : "Post created successfully",
      });

      onSuccess?.();
      navigate("/blog-management");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      <div className="space-y-2">
        <Label>Categories</Label>
        <CategorySelect
          value={categories}
          onChange={setCategories}
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <TagSelect
          value={tags}
          onChange={setTags}
        />
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <RichTextEditor
          content={content}
          onChange={setContent}
        />
      </div>

      <Button type="submit">
        {isEditing ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
}