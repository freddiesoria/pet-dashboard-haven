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
          id: string
          trial_start?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string | null;
          slug: string;
          published: boolean;
          featured_image: string | null;
          author_id: string;
          created_at: string;
          updated_at: string;
        }
        Insert: {
          id?: string;
          title: string;
          content: string;
          excerpt?: string | null;
          slug: string;
          published: boolean;
          featured_image?: string | null;
          author_id: string;
          created_at?: string;
          updated_at?: string;
        }
        Update: {
          id?: string;
          title?: string;
          content?: string;
          excerpt?: string | null;
          slug?: string;
          published?: boolean;
          featured_image?: string | null;
          author_id?: string;
          created_at?: string;
          updated_at?: string;
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
