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
      movie_recommendations: {
        Row: {
          cast_members: string[] | null
          created_at: string
          description: string | null
          director: string | null
          genre: string
          id: string
          movie_id: string
          poster: string | null
          preferences_id: string
          rating: number
          recommendation_score: number | null
          title: string
          user_id: string
          year: number
        }
        Insert: {
          cast_members?: string[] | null
          created_at?: string
          description?: string | null
          director?: string | null
          genre: string
          id?: string
          movie_id: string
          poster?: string | null
          preferences_id: string
          rating: number
          recommendation_score?: number | null
          title: string
          user_id: string
          year: number
        }
        Update: {
          cast_members?: string[] | null
          created_at?: string
          description?: string | null
          director?: string | null
          genre?: string
          id?: string
          movie_id?: string
          poster?: string | null
          preferences_id?: string
          rating?: number
          recommendation_score?: number | null
          title?: string
          user_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "movie_recommendations_preferences_id_fkey"
            columns: ["preferences_id"]
            isOneToOne: false
            referencedRelation: "user_preferences"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      user_feedback: {
        Row: {
          created_at: string
          feedback_text: string | null
          id: string
          liked: boolean | null
          movie_recommendation_id: string
          rating: number | null
          user_id: string
          would_watch_again: boolean | null
        }
        Insert: {
          created_at?: string
          feedback_text?: string | null
          id?: string
          liked?: boolean | null
          movie_recommendation_id: string
          rating?: number | null
          user_id: string
          would_watch_again?: boolean | null
        }
        Update: {
          created_at?: string
          feedback_text?: string | null
          id?: string
          liked?: boolean | null
          movie_recommendation_id?: string
          rating?: number | null
          user_id?: string
          would_watch_again?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "user_feedback_movie_recommendation_id_fkey"
            columns: ["movie_recommendation_id"]
            isOneToOne: false
            referencedRelation: "movie_recommendations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string
          current_mood: string | null
          id: string
          last_movie: string | null
          preferred_genre: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_mood?: string | null
          id?: string
          last_movie?: string | null
          preferred_genre?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_mood?: string | null
          id?: string
          last_movie?: string | null
          preferred_genre?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_watch_history: {
        Row: {
          created_at: string
          genre: string | null
          id: string
          movie_title: string
          rating_given: number | null
          user_id: string
          watched_date: string
        }
        Insert: {
          created_at?: string
          genre?: string | null
          id?: string
          movie_title: string
          rating_given?: number | null
          user_id: string
          watched_date?: string
        }
        Update: {
          created_at?: string
          genre?: string | null
          id?: string
          movie_title?: string
          rating_given?: number | null
          user_id?: string
          watched_date?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
