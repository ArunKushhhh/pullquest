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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      acts: {
        Row: {
          created_at: string
          end_date: string
          id: string
          is_active: boolean
          start_date: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          is_active?: boolean
          start_date: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          is_active?: boolean
          start_date?: string
        }
        Relationships: []
      }
      issues: {
        Row: {
          created_at: string | null
          difficulty: string
          github_issue_id: string
          id: string
          is_active: boolean | null
          repository_id: string
          stake_amount: number
        }
        Insert: {
          created_at?: string | null
          difficulty: string
          github_issue_id: string
          id?: string
          is_active?: boolean | null
          repository_id: string
          stake_amount: number
        }
        Update: {
          created_at?: string | null
          difficulty?: string
          github_issue_id?: string
          id?: string
          is_active?: boolean | null
          repository_id?: string
          stake_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "issues_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          id: string
          joined_at: string
          org_id: string
          role: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          org_id: string
          role: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          org_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          credibility_score: number
          github_org_id: string
          id: string
          name: string
          subscription_status: string | null
          treasury_balance: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          credibility_score?: number
          github_org_id: string
          id?: string
          name: string
          subscription_status?: string | null
          treasury_balance?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          credibility_score?: number
          github_org_id?: string
          id?: string
          name?: string
          subscription_status?: string | null
          treasury_balance?: number
          updated_at?: string
        }
        Relationships: []
      }
      pull_requests: {
        Row: {
          created_at: string | null
          github_pr_id: string
          id: string
          issue_id: string
          outcome: string | null
          user_id: string
          xp_awarded: number | null
        }
        Insert: {
          created_at?: string | null
          github_pr_id: string
          id?: string
          issue_id: string
          outcome?: string | null
          user_id: string
          xp_awarded?: number | null
        }
        Update: {
          created_at?: string | null
          github_pr_id?: string
          id?: string
          issue_id?: string
          outcome?: string | null
          user_id?: string
          xp_awarded?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pull_requests_issue_id_fkey"
            columns: ["issue_id"]
            isOneToOne: false
            referencedRelation: "issues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pull_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      repositories: {
        Row: {
          contributors_count: number | null
          created_at: string | null
          github_repo_id: string
          id: string
          is_private: boolean | null
          name: string
          org_id: string
          stars: number | null
          updated_at: string | null
        }
        Insert: {
          contributors_count?: number | null
          created_at?: string | null
          github_repo_id: string
          id?: string
          is_private?: boolean | null
          name: string
          org_id: string
          stars?: number | null
          updated_at?: string | null
        }
        Update: {
          contributors_count?: number | null
          created_at?: string | null
          github_repo_id?: string
          id?: string
          is_private?: boolean | null
          name?: string
          org_id?: string
          stars?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "repositories_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      stakes: {
        Row: {
          created_at: string | null
          id: string
          issue_id: string
          stake_amount: number
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          issue_id: string
          stake_amount: number
          status: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          issue_id?: string
          stake_amount?: number
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stakes_issue_id_fkey"
            columns: ["issue_id"]
            isOneToOne: false
            referencedRelation: "issues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stakes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tiers: {
        Row: {
          base_coins: number
          drop_to: string | null
          max_xp: number | null
          min_xp: number
          name: string
        }
        Insert: {
          base_coins: number
          drop_to?: string | null
          max_xp?: number | null
          min_xp: number
          name: string
        }
        Update: {
          base_coins?: number
          drop_to?: string | null
          max_xp?: number | null
          min_xp?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tiers_drop_to_fkey"
            columns: ["drop_to"]
            isOneToOne: false
            referencedRelation: "tiers"
            referencedColumns: ["name"]
          },
        ]
      }
      treasury_transactions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          org_id: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          org_id?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          org_id?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "treasury_transactions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "treasury_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_tokens: {
        Row: {
          created_at: string | null
          encrypted_pat: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          encrypted_pat: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          encrypted_pat?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          coins_balance: number
          created_at: string | null
          github_id: string
          id: string
          pat_verified: boolean
          purchased_coins: number
          tier: string
          updated_at: string | null
          username: string
          xp: number
        }
        Insert: {
          avatar_url?: string | null
          coins_balance?: number
          created_at?: string | null
          github_id: string
          id: string
          pat_verified?: boolean
          purchased_coins?: number
          tier?: string
          updated_at?: string | null
          username: string
          xp?: number
        }
        Update: {
          avatar_url?: string | null
          coins_balance?: number
          created_at?: string | null
          github_id?: string
          id?: string
          pat_verified?: boolean
          purchased_coins?: number
          tier?: string
          updated_at?: string | null
          username?: string
          xp?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      apply_xp: {
        Args: { p_user_id: string; p_xp: number }
        Returns: undefined
      }
      get_tier_from_xp: { Args: { p_xp: number }; Returns: string }
      reset_act: { Args: never; Returns: undefined }
      resolve_pull_request: {
        Args: { p_outcome: string; p_pr_id: string; p_xp?: number }
        Returns: undefined
      }
      stake_coins: {
        Args: { p_issue_id: string; p_user_id: string }
        Returns: undefined
      }
      tier_midpoint: { Args: { p_tier: string }; Returns: number }
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
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
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
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
