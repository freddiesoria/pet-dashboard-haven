import { Route } from "react-router-dom";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import BlogManagement from "@/pages/BlogManagement";
import DashboardLayout from "@/components/DashboardLayout";

export const BlogRoutes = () => {
  return (
    <>
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route
        path="/blog-management"
        element={
          <DashboardLayout>
            <BlogManagement />
          </DashboardLayout>
        }
      />
    </>
  );
};