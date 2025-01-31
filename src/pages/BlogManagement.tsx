import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BlogPostForm } from "@/components/BlogPostForm";

const BlogManagement = () => {
  const { toast } = useToast();

  const { data: posts, isLoading, refetch } = useQuery({
    queryKey: ["blog-posts-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Blog post deleted successfully",
    });
    refetch();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Blog Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create New Post</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
              <DialogDescription>
                Create a new blog post. Fill in all required fields.
              </DialogDescription>
            </DialogHeader>
            <BlogPostForm onSuccess={() => refetch()} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {posts?.map((post) => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl">{post.title}</CardTitle>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                      <DialogTitle>Edit Blog Post</DialogTitle>
                      <DialogDescription>
                        Make changes to your blog post.
                      </DialogDescription>
                    </DialogHeader>
                    <BlogPostForm 
                      post={post} 
                      isEditing={true}
                      onSuccess={() => refetch()} 
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                  Created: {format(new Date(post.created_at), "MMMM d, yyyy")}
                </span>
                <span className={post.published ? "text-green-500" : "text-yellow-500"}>
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{post.excerpt}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="text-primary hover:underline mt-4 inline-block"
              >
                View Post
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogManagement;