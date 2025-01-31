import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useUserRole() {
  const { data: roles } = useQuery({
    queryKey: ["user-roles"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      // First check if user is super admin
      const { data: superAdminCheck } = await supabase.rpc('is_super_admin', {
        user_id: user.id
      });

      if (superAdminCheck) {
        return ['admin', 'editor'];  // Super admin has all roles
      }

      // If not super admin, check regular roles
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      if (error) throw error;
      return data.map(r => r.role);
    },
  });

  return {
    isAdmin: roles?.includes("admin") ?? false,
    isEditor: roles?.includes("editor") ?? false,
    roles: roles ?? [],
  };
}