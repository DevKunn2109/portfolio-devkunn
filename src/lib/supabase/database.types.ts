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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          created_by: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          user_id?: string
        }
        Relationships: []
      }
      article_topics: {
        Row: {
          article_id: string
          topic_id: string
        }
        Insert: {
          article_id: string
          topic_id: string
        }
        Update: {
          article_id?: string
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_topics_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_topics_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      article_translations: {
        Row: {
          article_id: string
          content: Json
          created_at: string
          excerpt: string
          locale: string
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          reviewed_at: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
        }
        Insert: {
          article_id: string
          content?: Json
          created_at?: string
          excerpt: string
          locale: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reviewed_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
        }
        Update: {
          article_id?: string
          content?: Json
          created_at?: string
          excerpt?: string
          locale?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reviewed_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_translations_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          cover_media_id: string | null
          created_at: string
          id: string
          published_at: string | null
          reading_minutes: number | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          cover_media_id?: string | null
          created_at?: string
          id?: string
          published_at?: string | null
          reading_minutes?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          cover_media_id?: string | null
          created_at?: string
          id?: string
          published_at?: string | null
          reading_minutes?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_cover_media_id_fkey"
            columns: ["cover_media_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_notes: {
        Row: {
          author_id: string
          contact_request_id: string
          created_at: string
          id: string
          note: string
          updated_at: string
        }
        Insert: {
          author_id: string
          contact_request_id: string
          created_at?: string
          id?: string
          note: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          contact_request_id?: string
          created_at?: string
          id?: string
          note?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_notes_contact_request_id_fkey"
            columns: ["contact_request_id"]
            isOneToOne: false
            referencedRelation: "contact_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_requests: {
        Row: {
          budget: string | null
          company: string | null
          consent_at: string
          created_at: string
          email: string
          id: string
          kind: Database["public"]["Enums"]["contact_kind"]
          message: string
          name: string
          source_locale: string | null
          source_path: string | null
          status: Database["public"]["Enums"]["contact_status"]
          timeline: string | null
          updated_at: string
        }
        Insert: {
          budget?: string | null
          company?: string | null
          consent_at: string
          created_at?: string
          email: string
          id?: string
          kind: Database["public"]["Enums"]["contact_kind"]
          message: string
          name: string
          source_locale?: string | null
          source_path?: string | null
          status?: Database["public"]["Enums"]["contact_status"]
          timeline?: string | null
          updated_at?: string
        }
        Update: {
          budget?: string | null
          company?: string | null
          consent_at?: string
          created_at?: string
          email?: string
          id?: string
          kind?: Database["public"]["Enums"]["contact_kind"]
          message?: string
          name?: string
          source_locale?: string | null
          source_path?: string | null
          status?: Database["public"]["Enums"]["contact_status"]
          timeline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      education: {
        Row: {
          created_at: string
          ended_on: string | null
          id: string
          institution: string
          published_at: string | null
          sort_order: number
          started_on: string | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          ended_on?: string | null
          id?: string
          institution: string
          published_at?: string | null
          sort_order?: number
          started_on?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          ended_on?: string | null
          id?: string
          institution?: string
          published_at?: string | null
          sort_order?: number
          started_on?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: []
      }
      education_translations: {
        Row: {
          created_at: string
          description: string | null
          education_id: string
          field_of_study: string | null
          locale: string
          published_at: string | null
          qualification: string
          reviewed_at: string | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          education_id: string
          field_of_study?: string | null
          locale: string
          published_at?: string | null
          qualification: string
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          education_id?: string
          field_of_study?: string | null
          locale?: string
          published_at?: string | null
          qualification?: string
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_translations_education_id_fkey"
            columns: ["education_id"]
            isOneToOne: false
            referencedRelation: "education"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_translations: {
        Row: {
          created_at: string
          experience_id: string
          highlights: Json
          locale: string
          published_at: string | null
          reviewed_at: string | null
          status: Database["public"]["Enums"]["content_status"]
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          experience_id: string
          highlights?: Json
          locale: string
          published_at?: string | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          experience_id?: string
          highlights?: Json
          locale?: string
          published_at?: string | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_translations_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          created_at: string
          ended_on: string | null
          id: string
          is_current: boolean
          location: string | null
          organization: string
          published_at: string | null
          sort_order: number
          started_on: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          ended_on?: string | null
          id?: string
          is_current?: boolean
          location?: string | null
          organization: string
          published_at?: string | null
          sort_order?: number
          started_on: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          ended_on?: string | null
          id?: string
          is_current?: boolean
          location?: string | null
          organization?: string
          published_at?: string | null
          sort_order?: number
          started_on?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          bucket_id: string
          created_at: string
          height: number | null
          id: string
          is_public: boolean
          kind: Database["public"]["Enums"]["media_kind"]
          mime_type: string
          object_path: string
          published_at: string | null
          size_bytes: number | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          width: number | null
        }
        Insert: {
          bucket_id: string
          created_at?: string
          height?: number | null
          id?: string
          is_public?: boolean
          kind?: Database["public"]["Enums"]["media_kind"]
          mime_type: string
          object_path: string
          published_at?: string | null
          size_bytes?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          width?: number | null
        }
        Update: {
          bucket_id?: string
          created_at?: string
          height?: number | null
          id?: string
          is_public?: boolean
          kind?: Database["public"]["Enums"]["media_kind"]
          mime_type?: string
          object_path?: string
          published_at?: string | null
          size_bytes?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          width?: number | null
        }
        Relationships: []
      }
      media_translations: {
        Row: {
          alt_text: string
          caption: string | null
          created_at: string
          locale: string
          media_id: string
          updated_at: string
        }
        Insert: {
          alt_text: string
          caption?: string | null
          created_at?: string
          locale: string
          media_id: string
          updated_at?: string
        }
        Update: {
          alt_text?: string
          caption?: string | null
          created_at?: string
          locale?: string
          media_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_translations_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_translations: {
        Row: {
          bio: Json
          created_at: string
          display_name: string
          headline: string | null
          locale: string
          meta_description: string | null
          meta_title: string | null
          profile_id: string
          published_at: string | null
          reviewed_at: string | null
          role: string
          short_bio: string | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          bio?: Json
          created_at?: string
          display_name: string
          headline?: string | null
          locale: string
          meta_description?: string | null
          meta_title?: string | null
          profile_id: string
          published_at?: string | null
          reviewed_at?: string | null
          role: string
          short_bio?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          bio?: Json
          created_at?: string
          display_name?: string
          headline?: string | null
          locale?: string
          meta_description?: string | null
          meta_title?: string | null
          profile_id?: string
          published_at?: string | null
          reviewed_at?: string | null
          role?: string
          short_bio?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_translations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          availability: string | null
          created_at: string
          id: string
          location: string | null
          public_email: string | null
          published_at: string | null
          social_links: Json
          status: Database["public"]["Enums"]["content_status"]
          timezone: string | null
          updated_at: string
        }
        Insert: {
          availability?: string | null
          created_at?: string
          id?: string
          location?: string | null
          public_email?: string | null
          published_at?: string | null
          social_links?: Json
          status?: Database["public"]["Enums"]["content_status"]
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          availability?: string | null
          created_at?: string
          id?: string
          location?: string | null
          public_email?: string | null
          published_at?: string | null
          social_links?: Json
          status?: Database["public"]["Enums"]["content_status"]
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      project_translations: {
        Row: {
          challenges: Json
          context: Json
          created_at: string
          limitations: Json
          locale: string
          meta_description: string | null
          meta_title: string | null
          project_id: string
          published_at: string | null
          reviewed_at: string | null
          role_description: Json
          scope: Json
          slug: string
          solution: Json
          status: Database["public"]["Enums"]["content_status"]
          summary: string
          title: string
          updated_at: string
          verified_results: Json
        }
        Insert: {
          challenges?: Json
          context?: Json
          created_at?: string
          limitations?: Json
          locale: string
          meta_description?: string | null
          meta_title?: string | null
          project_id: string
          published_at?: string | null
          reviewed_at?: string | null
          role_description?: Json
          scope?: Json
          slug: string
          solution?: Json
          status?: Database["public"]["Enums"]["content_status"]
          summary: string
          title: string
          updated_at?: string
          verified_results?: Json
        }
        Update: {
          challenges?: Json
          context?: Json
          created_at?: string
          limitations?: Json
          locale?: string
          meta_description?: string | null
          meta_title?: string | null
          project_id?: string
          published_at?: string | null
          reviewed_at?: string | null
          role_description?: Json
          scope?: Json
          slug?: string
          solution?: Json
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string
          title?: string
          updated_at?: string
          verified_results?: Json
        }
        Relationships: [
          {
            foreignKeyName: "project_translations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          cover_media_id: string | null
          created_at: string
          demo_url: string | null
          ended_on: string | null
          id: string
          is_featured: boolean
          kind: Database["public"]["Enums"]["project_kind"]
          published_at: string | null
          sort_order: number
          source_url: string | null
          started_on: string | null
          status: Database["public"]["Enums"]["content_status"]
          technology_stack: string[]
          updated_at: string
        }
        Insert: {
          cover_media_id?: string | null
          created_at?: string
          demo_url?: string | null
          ended_on?: string | null
          id?: string
          is_featured?: boolean
          kind?: Database["public"]["Enums"]["project_kind"]
          published_at?: string | null
          sort_order?: number
          source_url?: string | null
          started_on?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          technology_stack?: string[]
          updated_at?: string
        }
        Update: {
          cover_media_id?: string | null
          created_at?: string
          demo_url?: string | null
          ended_on?: string | null
          id?: string
          is_featured?: boolean
          kind?: Database["public"]["Enums"]["project_kind"]
          published_at?: string | null
          sort_order?: number
          source_url?: string | null
          started_on?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          technology_stack?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_cover_media_id_fkey"
            columns: ["cover_media_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      resume_files: {
        Row: {
          bucket_id: string
          created_at: string
          file_name: string
          id: string
          locale: string
          mime_type: string
          object_path: string
          published_at: string | null
          size_bytes: number | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          bucket_id?: string
          created_at?: string
          file_name: string
          id?: string
          locale: string
          mime_type?: string
          object_path: string
          published_at?: string | null
          size_bytes?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          file_name?: string
          id?: string
          locale?: string
          mime_type?: string
          object_path?: string
          published_at?: string | null
          size_bytes?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: []
      }
      service_translations: {
        Row: {
          created_at: string
          deliverables: Json
          locale: string
          meta_description: string | null
          meta_title: string | null
          needs: Json
          process: Json
          published_at: string | null
          reviewed_at: string | null
          scope: Json
          service_id: string
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deliverables?: Json
          locale: string
          meta_description?: string | null
          meta_title?: string | null
          needs?: Json
          process?: Json
          published_at?: string | null
          reviewed_at?: string | null
          scope?: Json
          service_id: string
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deliverables?: Json
          locale?: string
          meta_description?: string | null
          meta_title?: string | null
          needs?: Json
          process?: Json
          published_at?: string | null
          reviewed_at?: string | null
          scope?: Json
          service_id?: string
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_translations_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string
          id: string
          published_at: string | null
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          published_at?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          published_at?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          is_public: boolean
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          id?: string
          is_public?: boolean
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          created_at?: string
          id?: string
          is_public?: boolean
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      skill_translations: {
        Row: {
          created_at: string
          description: string | null
          label: string
          locale: string
          published_at: string | null
          reviewed_at: string | null
          skill_id: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          label: string
          locale: string
          published_at?: string | null
          reviewed_at?: string | null
          skill_id: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          label?: string
          locale?: string
          published_at?: string | null
          reviewed_at?: string | null
          skill_id?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_translations_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string
          created_at: string
          evidence_url: string | null
          id: string
          is_featured: boolean
          key: string
          proficiency: number | null
          published_at: string | null
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          evidence_url?: string | null
          id?: string
          is_featured?: boolean
          key: string
          proficiency?: number | null
          published_at?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          evidence_url?: string | null
          id?: string
          is_featured?: boolean
          key?: string
          proficiency?: number | null
          published_at?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: []
      }
      slug_redirects: {
        Row: {
          content_type: string
          created_at: string
          http_status: number
          id: string
          locale: string
          new_slug: string
          old_slug: string
        }
        Insert: {
          content_type: string
          created_at?: string
          http_status?: number
          id?: string
          locale: string
          new_slug: string
          old_slug: string
        }
        Update: {
          content_type?: string
          created_at?: string
          http_status?: number
          id?: string
          locale?: string
          new_slug?: string
          old_slug?: string
        }
        Relationships: []
      }
      topic_translations: {
        Row: {
          created_at: string
          locale: string
          name: string
          published_at: string | null
          reviewed_at: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          topic_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          locale: string
          name: string
          published_at?: string | null
          reviewed_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          topic_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          locale?: string
          name?: string
          published_at?: string | null
          reviewed_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          topic_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "topic_translations_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          created_at: string
          id: string
          key: string
          published_at: string | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          published_at?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          published_at?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      submit_contact_request: {
        Args: {
          p_budget: string
          p_company: string
          p_consent: boolean
          p_email: string
          p_kind: Database["public"]["Enums"]["contact_kind"]
          p_message: string
          p_name: string
          p_source_locale: unknown
          p_source_path: string
          p_timeline: string
        }
        Returns: undefined
      }
    }
    Enums: {
      contact_kind: "recruitment" | "project" | "other"
      contact_status: "new" | "in_conversation" | "qualified" | "won" | "closed"
      content_status: "draft" | "published" | "archived"
      media_kind: "image" | "document" | "other"
      project_kind: "personal" | "academic" | "client" | "other"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      contact_kind: ["recruitment", "project", "other"],
      contact_status: ["new", "in_conversation", "qualified", "won", "closed"],
      content_status: ["draft", "published", "archived"],
      media_kind: ["image", "document", "other"],
      project_kind: ["personal", "academic", "client", "other"],
    },
  },
} as const
