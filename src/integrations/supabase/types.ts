export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          title: string
          description: string | null
          property_type: string
          listing_type: 'sell' | 'rent'
          city: string
          locality: string
          address: string | null
          price: number
          area: number
          bedrooms: number | null
          bathrooms: number | null
          amenities: string[]
          images: string[]
          videos: string[]
          floor_plan: string | null
          plan_type: 'free' | 'basic' | 'premium' | 'assisted'
          status: 'active' | 'inactive' | 'sold' | 'rented'
          views: number
          leads: number
          is_verified: boolean
          is_featured: boolean
          expires_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          title: string
          description?: string | null
          property_type: string
          listing_type: 'sell' | 'rent'
          city: string
          locality: string
          address?: string | null
          price: number
          area: number
          bedrooms?: number | null
          bathrooms?: number | null
          amenities?: string[]
          images?: string[]
          videos?: string[]
          floor_plan?: string | null
          plan_type?: 'free' | 'basic' | 'premium' | 'assisted'
          status?: 'active' | 'inactive' | 'sold' | 'rented'
          views?: number
          leads?: number
          is_verified?: boolean
          is_featured?: boolean
          expires_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          title?: string
          description?: string | null
          property_type?: string
          listing_type?: 'sell' | 'rent'
          city?: string
          locality?: string
          address?: string | null
          price?: number
          area?: number
          bedrooms?: number | null
          bathrooms?: number | null
          amenities?: string[]
          images?: string[]
          videos?: string[]
          floor_plan?: string | null
          plan_type?: 'free' | 'basic' | 'premium' | 'assisted'
          status?: 'active' | 'inactive' | 'sold' | 'rented'
          views?: number
          leads?: number
          is_verified?: boolean
          is_featured?: boolean
          expires_at?: string
        }
      }
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          phone: string | null
          name: string | null
          avatar_url: string | null
          is_verified: boolean
          subscription_plan: 'free' | 'basic' | 'premium' | 'assisted'
          subscription_expires: string | null
          total_listings: number
          total_leads: number
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          phone?: string | null
          name?: string | null
          avatar_url?: string | null
          is_verified?: boolean
          subscription_plan?: 'free' | 'basic' | 'premium' | 'assisted'
          subscription_expires?: string | null
          total_listings?: number
          total_leads?: number
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          phone?: string | null
          name?: string | null
          avatar_url?: string | null
          is_verified?: boolean
          subscription_plan?: 'free' | 'basic' | 'premium' | 'assisted'
          subscription_expires?: string | null
          total_listings?: number
          total_leads?: number
        }
      }
      leads: {
        Row: {
          id: string
          created_at: string
          property_id: string
          user_id: string
          lead_type: 'contact' | 'inquiry' | 'view'
          contact_method: 'phone' | 'email' | 'whatsapp'
          status: 'new' | 'contacted' | 'interested' | 'not_interested'
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          property_id: string
          user_id: string
          lead_type: 'contact' | 'inquiry' | 'view'
          contact_method?: 'phone' | 'email' | 'whatsapp'
          status?: 'new' | 'contacted' | 'interested' | 'not_interested'
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          property_id?: string
          user_id?: string
          lead_type?: 'contact' | 'inquiry' | 'view'
          contact_method?: 'phone' | 'email' | 'whatsapp'
          status?: 'new' | 'contacted' | 'interested' | 'not_interested'
          notes?: string | null
        }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DefaultSchemaTableNameOrOptions["schema"] extends keyof DatabaseWithoutInternals
        ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
          DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"]
        : never)
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DefaultSchemaTableNameOrOptions["schema"] extends keyof DatabaseWithoutInternals
      ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"]
      : never)[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DefaultSchemaTableNameOrOptions["schema"] extends keyof DatabaseWithoutInternals
        ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never)
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DefaultSchemaTableNameOrOptions["schema"] extends keyof DatabaseWithoutInternals
      ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
      : never)[TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DefaultSchemaTableNameOrOptions["schema"] extends keyof DatabaseWithoutInternals
        ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never)
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DefaultSchemaTableNameOrOptions["schema"] extends keyof DatabaseWithoutInternals
      ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
      : never)[TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DefaultSchemaEnumNameOrOptions["schema"] extends keyof DatabaseWithoutInternals
        ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
        : never)
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DefaultSchemaEnumNameOrOptions["schema"] extends keyof DatabaseWithoutInternals
      ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
      : never)[EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DefaultSchemaTableNameOrOptions["schema"] extends keyof DatabaseWithoutInternals
        ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never)
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DefaultSchemaTableNameOrOptions["schema"] extends keyof DatabaseWithoutInternals
      ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
      : never)[CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
