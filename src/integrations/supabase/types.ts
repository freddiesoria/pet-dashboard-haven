export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          published: boolean | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      partners: {
        Row: {
          city: string
          country: string
          created_at: string
          email: string
          id: string
          name: string
          organization_type: string
          phone: string
          state: string
          street1: string
          street2: string | null
          updated_at: string
          user_id: string
          zip_code: string
        }
        Insert: {
          city: string
          country: string
          created_at?: string
          email: string
          id?: string
          name: string
          organization_type: string
          phone: string
          state: string
          street1: string
          street2?: string | null
          updated_at?: string
          user_id: string
          zip_code: string
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          organization_type?: string
          phone?: string
          state?: string
          street1?: string
          street2?: string | null
          updated_at?: string
          user_id?: string
          zip_code?: string
        }
        Relationships: []
      }
      people: {
        Row: {
          adopt_waitlist: boolean | null
          adopter: boolean | null
          available_foster: boolean | null
          board_member: boolean | null
          city: string
          country: string
          created_at: string
          current_foster: boolean | null
          do_not_adopt: boolean | null
          do_not_foster: boolean | null
          do_not_volunteer: boolean | null
          donor: boolean | null
          dormant_foster: boolean | null
          email: string
          first_name: string
          foster: boolean | null
          foster_waitlist: boolean | null
          has_cats: boolean | null
          has_dogs: boolean | null
          has_kids: boolean | null
          id: string
          last_name: string
          owner_surrender: boolean | null
          phone: string
          potential_adopter: boolean | null
          processing_application: boolean | null
          state: string
          street1: string
          street2: string | null
          updated_at: string
          user_id: string
          volunteer: boolean | null
          zip_code: string
        }
        Insert: {
          adopt_waitlist?: boolean | null
          adopter?: boolean | null
          available_foster?: boolean | null
          board_member?: boolean | null
          city: string
          country: string
          created_at?: string
          current_foster?: boolean | null
          do_not_adopt?: boolean | null
          do_not_foster?: boolean | null
          do_not_volunteer?: boolean | null
          donor?: boolean | null
          dormant_foster?: boolean | null
          email: string
          first_name: string
          foster?: boolean | null
          foster_waitlist?: boolean | null
          has_cats?: boolean | null
          has_dogs?: boolean | null
          has_kids?: boolean | null
          id?: string
          last_name: string
          owner_surrender?: boolean | null
          phone: string
          potential_adopter?: boolean | null
          processing_application?: boolean | null
          state: string
          street1: string
          street2?: string | null
          updated_at?: string
          user_id: string
          volunteer?: boolean | null
          zip_code: string
        }
        Update: {
          adopt_waitlist?: boolean | null
          adopter?: boolean | null
          available_foster?: boolean | null
          board_member?: boolean | null
          city?: string
          country?: string
          created_at?: string
          current_foster?: boolean | null
          do_not_adopt?: boolean | null
          do_not_foster?: boolean | null
          do_not_volunteer?: boolean | null
          donor?: boolean | null
          dormant_foster?: boolean | null
          email?: string
          first_name?: string
          foster?: boolean | null
          foster_waitlist?: boolean | null
          has_cats?: boolean | null
          has_dogs?: boolean | null
          has_kids?: boolean | null
          id?: string
          last_name?: string
          owner_surrender?: boolean | null
          phone?: string
          potential_adopter?: boolean | null
          processing_application?: boolean | null
          state?: string
          street1?: string
          street2?: string | null
          updated_at?: string
          user_id?: string
          volunteer?: boolean | null
          zip_code?: string
        }
        Relationships: []
      }
      pets: {
        Row: {
          altered: boolean | null
          breed: string | null
          condition_on_intake: string | null
          created_at: string
          date_of_birth: string | null
          gender: string | null
          id: string
          image_url: string | null
          intake_date: string | null
          intake_type: string | null
          internal_id: string
          microchip_number: string | null
          name: string
          species: string | null
          status: string
          updated_at: string
          user_id: string
          weight: number | null
          weight_unit: string | null
        }
        Insert: {
          altered?: boolean | null
          breed?: string | null
          condition_on_intake?: string | null
          created_at?: string
          date_of_birth?: string | null
          gender?: string | null
          id?: string
          image_url?: string | null
          intake_date?: string | null
          intake_type?: string | null
          internal_id: string
          microchip_number?: string | null
          name: string
          species?: string | null
          status: string
          updated_at?: string
          user_id: string
          weight?: number | null
          weight_unit?: string | null
        }
        Update: {
          altered?: boolean | null
          breed?: string | null
          condition_on_intake?: string | null
          created_at?: string
          date_of_birth?: string | null
          gender?: string | null
          id?: string
          image_url?: string | null
          intake_date?: string | null
          intake_type?: string | null
          internal_id?: string
          microchip_number?: string | null
          name?: string
          species?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          weight?: number | null
          weight_unit?: string | null
        }
        Relationships: []
      }
      post_categories: {
        Row: {
          category_id: string
          post_id: string
        }
        Insert: {
          category_id: string
          post_id: string
        }
        Update: {
          category_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          trial_start: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          trial_start?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          trial_start?: string
          updated_at?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          user_id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "editor" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
