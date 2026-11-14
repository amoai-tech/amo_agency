// Generated schema snapshot augmented with forward-only migration 20261114082405.
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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          action: string
          activity_type: string | null
          created_at: string
          description: string | null
          detail: string
          id: string
          metadata: Json
          project_id: string | null
          session_id: string | null
          title: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          action?: string
          activity_type?: string | null
          created_at?: string
          description?: string | null
          detail?: string
          id?: string
          metadata?: Json
          project_id?: string | null
          session_id?: string | null
          title?: string | null
          type?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          activity_type?: string | null
          created_at?: string
          description?: string | null
          detail?: string
          id?: string
          metadata?: Json
          project_id?: string | null
          session_id?: string | null
          title?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_assignments: {
        Row: {
          agent_slug: string
          assigned_by: string
          created_at: string
          first_task: string | null
          id: string
          last_output_summary: string | null
          last_run_at: string | null
          project_id: string
          role_description: string | null
          status: string
          updated_at: string
        }
        Insert: {
          agent_slug: string
          assigned_by: string
          created_at?: string
          first_task?: string | null
          id?: string
          last_output_summary?: string | null
          last_run_at?: string | null
          project_id: string
          role_description?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          agent_slug?: string
          assigned_by?: string
          created_at?: string
          first_task?: string | null
          id?: string
          last_output_summary?: string | null
          last_run_at?: string | null
          project_id?: string
          role_description?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_assignments_agent_slug_fkey"
            columns: ["agent_slug"]
            isOneToOne: false
            referencedRelation: "agent_catalog"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "agent_assignments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_catalog: {
        Row: {
          color: string | null
          created_at: string
          description: string
          division: string
          emoji: string | null
          file_path: string
          id: string
          is_active: boolean
          is_curated: boolean
          line_count: number | null
          name: string
          sections: Json | null
          slug: string
          tags: string[] | null
          updated_at: string
          vibe: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description: string
          division: string
          emoji?: string | null
          file_path: string
          id?: string
          is_active?: boolean
          is_curated?: boolean
          line_count?: number | null
          name: string
          sections?: Json | null
          slug: string
          tags?: string[] | null
          updated_at?: string
          vibe?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string
          division?: string
          emoji?: string | null
          file_path?: string
          id?: string
          is_active?: boolean
          is_curated?: boolean
          line_count?: number | null
          name?: string
          sections?: Json | null
          slug?: string
          tags?: string[] | null
          updated_at?: string
          vibe?: string | null
        }
        Relationships: []
      }
      agent_jobs: {
        Row: {
          action_type: string
          agent_slug: string
          approved_at: string | null
          approved_by: string | null
          attempts: number
          completed_at: string | null
          created_at: string
          error: string | null
          estimated_cost_cents: number | null
          id: string
          max_attempts: number
          next_job_id: string | null
          payload: Json
          phase_id: string | null
          priority: string
          project_id: string | null
          requires_approval: boolean
          result: Json | null
          started_at: string | null
          status: string
          token_count: number | null
          trigger_condition: string | null
          user_id: string
        }
        Insert: {
          action_type: string
          agent_slug: string
          approved_at?: string | null
          approved_by?: string | null
          attempts?: number
          completed_at?: string | null
          created_at?: string
          error?: string | null
          estimated_cost_cents?: number | null
          id?: string
          max_attempts?: number
          next_job_id?: string | null
          payload?: Json
          phase_id?: string | null
          priority?: string
          project_id?: string | null
          requires_approval?: boolean
          result?: Json | null
          started_at?: string | null
          status?: string
          token_count?: number | null
          trigger_condition?: string | null
          user_id: string
        }
        Update: {
          action_type?: string
          agent_slug?: string
          approved_at?: string | null
          approved_by?: string | null
          attempts?: number
          completed_at?: string | null
          created_at?: string
          error?: string | null
          estimated_cost_cents?: number | null
          id?: string
          max_attempts?: number
          next_job_id?: string | null
          payload?: Json
          phase_id?: string | null
          priority?: string
          project_id?: string | null
          requires_approval?: boolean
          result?: Json | null
          started_at?: string | null
          status?: string
          token_count?: number | null
          trigger_condition?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_jobs_next_job_id_fkey"
            columns: ["next_job_id"]
            isOneToOne: false
            referencedRelation: "agent_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_jobs_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "roadmap_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_runs: {
        Row: {
          agent_slug: string
          created_at: string
          duration_ms: number | null
          error_message: string | null
          full_output: Json | null
          id: string
          input_summary: string | null
          model: string | null
          output_summary: string | null
          project_id: string | null
          route: string
          success: boolean
          tokens_input: number | null
          tokens_output: number | null
          user_id: string
        }
        Insert: {
          agent_slug: string
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          full_output?: Json | null
          id?: string
          input_summary?: string | null
          model?: string | null
          output_summary?: string | null
          project_id?: string | null
          route: string
          success?: boolean
          tokens_input?: number | null
          tokens_output?: number | null
          user_id: string
        }
        Update: {
          agent_slug?: string
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          full_output?: Json | null
          id?: string
          input_summary?: string | null
          model?: string | null
          output_summary?: string | null
          project_id?: string | null
          route?: string
          success?: boolean
          tokens_input?: number | null
          tokens_output?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_runs_agent_slug_fkey"
            columns: ["agent_slug"]
            isOneToOne: false
            referencedRelation: "agent_catalog"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "agent_runs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_team_templates: {
        Row: {
          company_size: string | null
          created_at: string
          description: string | null
          goal: string
          id: string
          industry: string
          is_active: boolean
          name: string
        }
        Insert: {
          company_size?: string | null
          created_at?: string
          description?: string | null
          goal: string
          id?: string
          industry: string
          is_active?: boolean
          name: string
        }
        Update: {
          company_size?: string | null
          created_at?: string
          description?: string | null
          goal?: string
          id?: string
          industry?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      agent_team_templates_agents: {
        Row: {
          agent_slug: string
          first_task: string | null
          id: string
          role: string
          sort_order: number
          template_id: string
        }
        Insert: {
          agent_slug: string
          first_task?: string | null
          id?: string
          role: string
          sort_order?: number
          template_id: string
        }
        Update: {
          agent_slug?: string
          first_task?: string | null
          id?: string
          role?: string
          sort_order?: number
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_team_templates_agents_agent_slug_fkey"
            columns: ["agent_slug"]
            isOneToOne: false
            referencedRelation: "agent_catalog"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "agent_team_templates_agents_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "agent_team_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_cache: {
        Row: {
          created_at: string
          expires_at: string
          input_hash: string
          model: string
          response: Json
          tokens_used: number
        }
        Insert: {
          created_at?: string
          expires_at?: string
          input_hash: string
          model?: string
          response?: Json
          tokens_used?: number
        }
        Update: {
          created_at?: string
          expires_at?: string
          input_hash?: string
          model?: string
          response?: Json
          tokens_used?: number
        }
        Relationships: []
      }
      ai_run_logs: {
        Row: {
          created_at: string
          duration_ms: number
          error_message: string | null
          id: string
          model: string
          org_id: string | null
          prompt_type: string
          session_id: string | null
          success: boolean
          tokens_used: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          duration_ms?: number
          error_message?: string | null
          id?: string
          model?: string
          org_id?: string | null
          prompt_type?: string
          session_id?: string | null
          success?: boolean
          tokens_used?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          duration_ms?: number
          error_message?: string | null
          id?: string
          model?: string
          org_id?: string | null
          prompt_type?: string
          session_id?: string | null
          success?: boolean
          tokens_used?: number
          user_id?: string | null
        }
        Relationships: []
      }
      automation_opportunities: {
        Row: {
          canvas_id: string | null
          complexity: string
          created_at: string
          current_state: string | null
          description: string
          estimated_cost: string | null
          estimated_weeks: number | null
          id: string
          impact_score: number
          process_area: string | null
          proposed_state: string | null
          recommended_system: string | null
          roi_estimate: string | null
          session_id: string | null
          status: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          canvas_id?: string | null
          complexity?: string
          created_at?: string
          current_state?: string | null
          description: string
          estimated_cost?: string | null
          estimated_weeks?: number | null
          id?: string
          impact_score?: number
          process_area?: string | null
          proposed_state?: string | null
          recommended_system?: string | null
          roi_estimate?: string | null
          session_id?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          canvas_id?: string | null
          complexity?: string
          created_at?: string
          current_state?: string | null
          description?: string
          estimated_cost?: string | null
          estimated_weeks?: number | null
          id?: string
          impact_score?: number
          process_area?: string | null
          proposed_state?: string | null
          recommended_system?: string | null
          roi_estimate?: string | null
          session_id?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "automation_opportunities_canvas_id_fkey"
            columns: ["canvas_id"]
            isOneToOne: false
            referencedRelation: "lean_canvases"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          contact_email: string
          contact_name: string
          created_at: string
          created_by: string | null
          health_score: number
          id: string
          industry: string
          name: string
          notes: string
          revenue: number
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          contact_email?: string
          contact_name?: string
          created_at?: string
          created_by?: string | null
          health_score?: number
          id?: string
          industry?: string
          name: string
          notes?: string
          revenue?: number
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          contact_email?: string
          contact_name?: string
          created_at?: string
          created_by?: string | null
          health_score?: number
          id?: string
          industry?: string
          name?: string
          notes?: string
          revenue?: number
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      crm_contacts: {
        Row: {
          client_id: string
          created_at: string
          email: string
          id: string
          is_primary: boolean
          name: string
          phone: string
          role: string
          user_id: string | null
        }
        Insert: {
          client_id: string
          created_at?: string
          email?: string
          id?: string
          is_primary?: boolean
          name: string
          phone?: string
          role?: string
          user_id?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string
          email?: string
          id?: string
          is_primary?: boolean
          name?: string
          phone?: string
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_contacts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_deals: {
        Row: {
          client_id: string | null
          contact_id: string | null
          created_at: string
          expected_close_date: string | null
          id: string
          notes: string
          owner_id: string | null
          pipeline_id: string
          probability: number
          session_id: string | null
          stage_changed_at: string
          stage_id: string
          title: string
          updated_at: string
          user_id: string | null
          value: number
        }
        Insert: {
          client_id?: string | null
          contact_id?: string | null
          created_at?: string
          expected_close_date?: string | null
          id?: string
          notes?: string
          owner_id?: string | null
          pipeline_id: string
          probability?: number
          session_id?: string | null
          stage_changed_at?: string
          stage_id: string
          title: string
          updated_at?: string
          user_id?: string | null
          value?: number
        }
        Update: {
          client_id?: string | null
          contact_id?: string | null
          created_at?: string
          expected_close_date?: string | null
          id?: string
          notes?: string
          owner_id?: string | null
          pipeline_id?: string
          probability?: number
          session_id?: string | null
          stage_changed_at?: string
          stage_id?: string
          title?: string
          updated_at?: string
          user_id?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "crm_deals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "crm_pipelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "crm_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_interactions: {
        Row: {
          created_at: string
          created_by: string | null
          deal_id: string
          id: string
          summary: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          deal_id: string
          id?: string
          summary: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          deal_id?: string
          id?: string
          summary?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_interactions_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_pipelines: {
        Row: {
          created_at: string
          created_by: string | null
          description: string
          id: string
          is_default: boolean
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          is_default?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          is_default?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      crm_stages: {
        Row: {
          color: string
          created_at: string
          id: string
          is_closed_lost: boolean
          is_closed_won: boolean
          name: string
          pipeline_id: string
          position: number
        }
        Insert: {
          color?: string
          created_at?: string
          id?: string
          is_closed_lost?: boolean
          is_closed_won?: boolean
          name: string
          pipeline_id: string
          position: number
        }
        Update: {
          color?: string
          created_at?: string
          id?: string
          is_closed_lost?: boolean
          is_closed_won?: boolean
          name?: string
          pipeline_id?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "crm_stages_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "crm_pipelines"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_documents: {
        Row: {
          ai_summary: string | null
          category: string
          created_at: string
          file_size: number
          file_type: string
          id: string
          mime_type: string
          name: string
          project_id: string | null
          project_name: string | null
          storage_path: string
          updated_at: string
          uploaded_by: string | null
          uploaded_by_name: string | null
          user_id: string | null
          version: number
        }
        Insert: {
          ai_summary?: string | null
          category?: string
          created_at?: string
          file_size?: number
          file_type?: string
          id?: string
          mime_type?: string
          name?: string
          project_id?: string | null
          project_name?: string | null
          storage_path: string
          updated_at?: string
          uploaded_by?: string | null
          uploaded_by_name?: string | null
          user_id?: string | null
          version?: number
        }
        Update: {
          ai_summary?: string | null
          category?: string
          created_at?: string
          file_size?: number
          file_type?: string
          id?: string
          mime_type?: string
          name?: string
          project_id?: string | null
          project_name?: string | null
          storage_path?: string
          updated_at?: string
          uploaded_by?: string | null
          uploaded_by_name?: string | null
          user_id?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "dashboard_documents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_invoices: {
        Row: {
          amount: number
          client_id: string | null
          client_name: string
          created_at: string
          due_date: string
          id: string
          invoice_number: string
          issue_date: string
          line_items: Json
          notes: string | null
          payment_date: string | null
          project_id: string | null
          project_name: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number
          client_id?: string | null
          client_name?: string
          created_at?: string
          due_date: string
          id?: string
          invoice_number: string
          issue_date?: string
          line_items?: Json
          notes?: string | null
          payment_date?: string | null
          project_id?: string | null
          project_name?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          client_id?: string | null
          client_name?: string
          created_at?: string
          due_date?: string
          id?: string
          invoice_number?: string
          issue_date?: string
          line_items?: Json
          notes?: string | null
          payment_date?: string | null
          project_id?: string | null
          project_name?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dashboard_invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          invoice_id: string
          method: string | null
          notes: string | null
          payment_date: string
          recorded_by: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          invoice_id: string
          method?: string | null
          notes?: string | null
          payment_date?: string
          recorded_by?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          invoice_id?: string
          method?: string | null
          notes?: string | null
          payment_date?: string
          recorded_by?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dashboard_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "dashboard_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_scores: {
        Row: {
          agent_slug: string
          deal_id: string
          expires_at: string | null
          health_score: number
          id: string
          recommendation: string | null
          risk_label: string | null
          scored_at: string
          scoring_breakdown: Json | null
        }
        Insert: {
          agent_slug: string
          deal_id: string
          expires_at?: string | null
          health_score?: number
          id?: string
          recommendation?: string | null
          risk_label?: string | null
          scored_at?: string
          scoring_breakdown?: Json | null
        }
        Update: {
          agent_slug?: string
          deal_id?: string
          expires_at?: string | null
          health_score?: number
          id?: string
          recommendation?: string | null
          risk_label?: string | null
          scored_at?: string
          scoring_breakdown?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "deal_scores_agent_slug_fkey"
            columns: ["agent_slug"]
            isOneToOne: false
            referencedRelation: "agent_catalog"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "deal_scores_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
        ]
      }
      insight_cards: {
        Row: {
          action_label: string | null
          action_url: string | null
          agent_slug: string
          body: string
          created_at: string
          expires_at: string | null
          id: string
          impact_label: string | null
          priority: string
          project_id: string
          status: string
          title: string
        }
        Insert: {
          action_label?: string | null
          action_url?: string | null
          agent_slug: string
          body: string
          created_at?: string
          expires_at?: string | null
          id?: string
          impact_label?: string | null
          priority?: string
          project_id: string
          status?: string
          title: string
        }
        Update: {
          action_label?: string | null
          action_url?: string | null
          agent_slug?: string
          body?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          impact_label?: string | null
          priority?: string
          project_id?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "insight_cards_agent_slug_fkey"
            columns: ["agent_slug"]
            isOneToOne: false
            referencedRelation: "agent_catalog"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "insight_cards_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      lean_canvas_versions: {
        Row: {
          canvas_id: string
          change_summary: string | null
          changed_by: string | null
          created_at: string
          id: string
          snapshot: Json
          user_id: string | null
          version: number
        }
        Insert: {
          canvas_id: string
          change_summary?: string | null
          changed_by?: string | null
          created_at?: string
          id?: string
          snapshot: Json
          user_id?: string | null
          version: number
        }
        Update: {
          canvas_id?: string
          change_summary?: string | null
          changed_by?: string | null
          created_at?: string
          id?: string
          snapshot?: Json
          user_id?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "lean_canvas_versions_canvas_id_fkey"
            columns: ["canvas_id"]
            isOneToOne: false
            referencedRelation: "lean_canvases"
            referencedColumns: ["id"]
          },
        ]
      }
      lean_canvases: {
        Row: {
          channels: Json
          cost_structure: Json
          created_at: string
          customer_segments: Json
          id: string
          is_current: boolean
          key_metrics: Json
          metadata: Json
          problem: Json
          project_id: string | null
          revenue_streams: Json
          session_id: string | null
          solution: Json
          unfair_advantage: Json
          updated_at: string
          user_id: string | null
          value_proposition: Json
          version: number
        }
        Insert: {
          channels?: Json
          cost_structure?: Json
          created_at?: string
          customer_segments?: Json
          id?: string
          is_current?: boolean
          key_metrics?: Json
          metadata?: Json
          problem?: Json
          project_id?: string | null
          revenue_streams?: Json
          session_id?: string | null
          solution?: Json
          unfair_advantage?: Json
          updated_at?: string
          user_id?: string | null
          value_proposition?: Json
          version?: number
        }
        Update: {
          channels?: Json
          cost_structure?: Json
          created_at?: string
          customer_segments?: Json
          id?: string
          is_current?: boolean
          key_metrics?: Json
          metadata?: Json
          problem?: Json
          project_id?: string | null
          revenue_streams?: Json
          session_id?: string | null
          solution?: Json
          unfair_advantage?: Json
          updated_at?: string
          user_id?: string | null
          value_proposition?: Json
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "lean_canvases_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      phase_gates: {
        Row: {
          check_query: string | null
          check_type: string
          created_at: string
          criterion: string
          description: string | null
          evaluated_at: string | null
          evaluated_by: string | null
          evidence: string | null
          id: string
          phase_id: string
          sort_order: number
          status: string
          user_id: string
        }
        Insert: {
          check_query?: string | null
          check_type?: string
          created_at?: string
          criterion: string
          description?: string | null
          evaluated_at?: string | null
          evaluated_by?: string | null
          evidence?: string | null
          id?: string
          phase_id: string
          sort_order?: number
          status?: string
          user_id: string
        }
        Update: {
          check_query?: string | null
          check_type?: string
          created_at?: string
          criterion?: string
          description?: string | null
          evaluated_at?: string | null
          evaluated_by?: string | null
          evidence?: string | null
          id?: string
          phase_id?: string
          sort_order?: number
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "phase_gates_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "roadmap_phases"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          client_id: string | null
          company_size: string
          created_at: string
          current_phase: number
          description: string
          id: string
          industry: string
          name: string
          selected_systems: Json
          status: string
          total_investment: string
          total_weeks: number
          updated_at: string
          user_id: string | null
          wizard_session_id: string | null
          wizard_snapshot: Json | null
        }
        Insert: {
          client_id?: string | null
          company_size?: string
          created_at?: string
          current_phase?: number
          description?: string
          id?: string
          industry?: string
          name: string
          selected_systems?: Json
          status?: string
          total_investment?: string
          total_weeks?: number
          updated_at?: string
          user_id?: string | null
          wizard_session_id?: string | null
          wizard_snapshot?: Json | null
        }
        Update: {
          client_id?: string | null
          company_size?: string
          created_at?: string
          current_phase?: number
          description?: string
          id?: string
          industry?: string
          name?: string
          selected_systems?: Json
          status?: string
          total_investment?: string
          total_weeks?: number
          updated_at?: string
          user_id?: string | null
          wizard_session_id?: string | null
          wizard_snapshot?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_wizard_session_id_fkey"
            columns: ["wizard_session_id"]
            isOneToOne: false
            referencedRelation: "wizard_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmap_phases: {
        Row: {
          assigned_agents: Json | null
          created_at: string
          deliverables: Json
          dependencies: Json
          description: string | null
          duration_weeks: number | null
          estimated_cost: string
          gate_keeper: string | null
          gate_status: string | null
          id: string
          milestones: Json
          name: string | null
          nexus_phase: number | null
          phase_number: number
          progress: number
          roadmap_id: string
          status: string
          systems: Json
          title: string
          user_id: string | null
          week_range: string
        }
        Insert: {
          assigned_agents?: Json | null
          created_at?: string
          deliverables?: Json
          dependencies?: Json
          description?: string | null
          duration_weeks?: number | null
          estimated_cost?: string
          gate_keeper?: string | null
          gate_status?: string | null
          id?: string
          milestones?: Json
          name?: string | null
          nexus_phase?: number | null
          phase_number: number
          progress?: number
          roadmap_id: string
          status?: string
          systems?: Json
          title?: string
          user_id?: string | null
          week_range?: string
        }
        Update: {
          assigned_agents?: Json | null
          created_at?: string
          deliverables?: Json
          dependencies?: Json
          description?: string | null
          duration_weeks?: number | null
          estimated_cost?: string
          gate_keeper?: string | null
          gate_status?: string | null
          id?: string
          milestones?: Json
          name?: string | null
          nexus_phase?: number | null
          phase_number?: number
          progress?: number
          roadmap_id?: string
          status?: string
          systems?: Json
          title?: string
          user_id?: string | null
          week_range?: string
        }
        Relationships: [
          {
            foreignKeyName: "roadmap_phases_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmaps"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmaps: {
        Row: {
          ai_response: Json | null
          created_at: string
          id: string
          project_id: string
          quick_wins: Json
          risk_factors: Json
          success_metrics: Json
          title: string
          total_investment: string
          total_weeks: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          ai_response?: Json | null
          created_at?: string
          id?: string
          project_id: string
          quick_wins?: Json
          risk_factors?: Json
          success_metrics?: Json
          title?: string
          total_investment?: string
          total_weeks?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          ai_response?: Json | null
          created_at?: string
          id?: string
          project_id?: string
          quick_wins?: Json
          risk_factors?: Json
          success_metrics?: Json
          title?: string
          total_investment?: string
          total_weeks?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roadmaps_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      strategy_actions: {
        Row: {
          action_type: string
          agent_name: string
          canvas_id: string | null
          created_at: string
          duration_ms: number
          error_message: string | null
          id: string
          input_summary: string | null
          output_summary: string | null
          session_id: string | null
          success: boolean
          tokens_used: number
          user_id: string | null
        }
        Insert: {
          action_type: string
          agent_name: string
          canvas_id?: string | null
          created_at?: string
          duration_ms?: number
          error_message?: string | null
          id?: string
          input_summary?: string | null
          output_summary?: string | null
          session_id?: string | null
          success?: boolean
          tokens_used?: number
          user_id?: string | null
        }
        Update: {
          action_type?: string
          agent_name?: string
          canvas_id?: string | null
          created_at?: string
          duration_ms?: number
          error_message?: string | null
          id?: string
          input_summary?: string | null
          output_summary?: string | null
          session_id?: string | null
          success?: boolean
          tokens_used?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strategy_actions_canvas_id_fkey"
            columns: ["canvas_id"]
            isOneToOne: false
            referencedRelation: "lean_canvases"
            referencedColumns: ["id"]
          },
        ]
      }
      strategy_agent_memory: {
        Row: {
          agent_name: string
          canvas_id: string
          content: Json
          created_at: string
          expires_at: string | null
          id: string
          memory_type: string
          relevance_score: number
          superseded_by: string | null
          user_id: string | null
        }
        Insert: {
          agent_name: string
          canvas_id: string
          content: Json
          created_at?: string
          expires_at?: string | null
          id?: string
          memory_type: string
          relevance_score?: number
          superseded_by?: string | null
          user_id?: string | null
        }
        Update: {
          agent_name?: string
          canvas_id?: string
          content?: Json
          created_at?: string
          expires_at?: string | null
          id?: string
          memory_type?: string
          relevance_score?: number
          superseded_by?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strategy_agent_memory_canvas_id_fkey"
            columns: ["canvas_id"]
            isOneToOne: false
            referencedRelation: "lean_canvases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strategy_agent_memory_superseded_by_fkey"
            columns: ["superseded_by"]
            isOneToOne: false
            referencedRelation: "strategy_agent_memory"
            referencedColumns: ["id"]
          },
        ]
      }
      strategy_budgets: {
        Row: {
          analyses_today: number
          analysis_count_this_month: number
          budget_month: string | null
          canvas_id: string
          created_at: string
          id: string
          last_analysis_at: string | null
          max_analyses_per_day: number
          min_analysis_interval_minutes: number
          monthly_token_limit: number
          tokens_used_this_month: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          analyses_today?: number
          analysis_count_this_month?: number
          budget_month?: string | null
          canvas_id: string
          created_at?: string
          id?: string
          last_analysis_at?: string | null
          max_analyses_per_day?: number
          min_analysis_interval_minutes?: number
          monthly_token_limit?: number
          tokens_used_this_month?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          analyses_today?: number
          analysis_count_this_month?: number
          budget_month?: string | null
          canvas_id?: string
          created_at?: string
          id?: string
          last_analysis_at?: string | null
          max_analyses_per_day?: number
          min_analysis_interval_minutes?: number
          monthly_token_limit?: number
          tokens_used_this_month?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strategy_budgets_canvas_id_fkey"
            columns: ["canvas_id"]
            isOneToOne: false
            referencedRelation: "lean_canvases"
            referencedColumns: ["id"]
          },
        ]
      }
      strategy_event_triggers: {
        Row: {
          agent_name: string
          cooldown_minutes: number
          created_at: string
          enabled: boolean
          event_type: string
          id: string
          last_triggered_at: string | null
          user_id: string | null
        }
        Insert: {
          agent_name: string
          cooldown_minutes?: number
          created_at?: string
          enabled?: boolean
          event_type: string
          id?: string
          last_triggered_at?: string | null
          user_id?: string | null
        }
        Update: {
          agent_name?: string
          cooldown_minutes?: number
          created_at?: string
          enabled?: boolean
          event_type?: string
          id?: string
          last_triggered_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      strategy_events: {
        Row: {
          canvas_id: string | null
          created_at: string
          event_type: string
          id: string
          payload: Json
          processed: boolean
          processed_at: string | null
          source_id: string | null
          source_table: string
          user_id: string | null
        }
        Insert: {
          canvas_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          payload?: Json
          processed?: boolean
          processed_at?: string | null
          source_id?: string | null
          source_table: string
          user_id?: string | null
        }
        Update: {
          canvas_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          payload?: Json
          processed?: boolean
          processed_at?: string | null
          source_id?: string | null
          source_table?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strategy_events_canvas_id_fkey"
            columns: ["canvas_id"]
            isOneToOne: false
            referencedRelation: "lean_canvases"
            referencedColumns: ["id"]
          },
        ]
      }
      strategy_insights: {
        Row: {
          action_taken: string | null
          agent_name: string
          canvas_id: string | null
          confidence: number | null
          created_at: string
          data_sources: Json
          description: string
          expires_at: string | null
          id: string
          impact_score: number | null
          insight_type: string
          priority: string
          session_id: string | null
          status: string
          title: string
          user_id: string | null
        }
        Insert: {
          action_taken?: string | null
          agent_name: string
          canvas_id?: string | null
          confidence?: number | null
          created_at?: string
          data_sources?: Json
          description: string
          expires_at?: string | null
          id?: string
          impact_score?: number | null
          insight_type: string
          priority?: string
          session_id?: string | null
          status?: string
          title: string
          user_id?: string | null
        }
        Update: {
          action_taken?: string | null
          agent_name?: string
          canvas_id?: string | null
          confidence?: number | null
          created_at?: string
          data_sources?: Json
          description?: string
          expires_at?: string | null
          id?: string
          impact_score?: number | null
          insight_type?: string
          priority?: string
          session_id?: string | null
          status?: string
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strategy_insights_canvas_id_fkey"
            columns: ["canvas_id"]
            isOneToOne: false
            referencedRelation: "lean_canvases"
            referencedColumns: ["id"]
          },
        ]
      }
      strategy_recommendations: {
        Row: {
          agent_name: string
          approval_status: string
          approved_at: string | null
          approved_by: string | null
          canvas_id: string | null
          created_at: string
          id: string
          proposed_changes: Json
          rationale: string
          recommendation_type: string
          session_id: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          agent_name: string
          approval_status?: string
          approved_at?: string | null
          approved_by?: string | null
          canvas_id?: string | null
          created_at?: string
          id?: string
          proposed_changes?: Json
          rationale: string
          recommendation_type: string
          session_id?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          agent_name?: string
          approval_status?: string
          approved_at?: string | null
          approved_by?: string | null
          canvas_id?: string | null
          created_at?: string
          id?: string
          proposed_changes?: Json
          rationale?: string
          recommendation_type?: string
          session_id?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strategy_recommendations_canvas_id_fkey"
            columns: ["canvas_id"]
            isOneToOne: false
            referencedRelation: "lean_canvases"
            referencedColumns: ["id"]
          },
        ]
      }
      strategy_roles: {
        Row: {
          canvas_id: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          canvas_id: string
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          canvas_id?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "strategy_roles_canvas_id_fkey"
            columns: ["canvas_id"]
            isOneToOne: false
            referencedRelation: "lean_canvases"
            referencedColumns: ["id"]
          },
        ]
      }
      strategy_signals: {
        Row: {
          canvas_id: string | null
          collected_at: string
          id: string
          previous_value: number | null
          signal_category: string
          signal_name: string
          source: string | null
          trend: string
          unit: string
          user_id: string | null
          value: number
        }
        Insert: {
          canvas_id?: string | null
          collected_at?: string
          id?: string
          previous_value?: number | null
          signal_category: string
          signal_name: string
          source?: string | null
          trend?: string
          unit?: string
          user_id?: string | null
          value: number
        }
        Update: {
          canvas_id?: string | null
          collected_at?: string
          id?: string
          previous_value?: number | null
          signal_category?: string
          signal_name?: string
          source?: string | null
          trend?: string
          unit?: string
          user_id?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "strategy_signals_canvas_id_fkey"
            columns: ["canvas_id"]
            isOneToOne: false
            referencedRelation: "lean_canvases"
            referencedColumns: ["id"]
          },
        ]
      }
      wizard_answers: {
        Row: {
          ai_results: Json | null
          answers: Json
          created_at: string
          id: string
          screen_id: string | null
          session_id: string
          step_number: number
          updated_at: string
        }
        Insert: {
          ai_results?: Json | null
          answers?: Json
          created_at?: string
          id?: string
          screen_id?: string | null
          session_id: string
          step_number: number
          updated_at?: string
        }
        Update: {
          ai_results?: Json | null
          answers?: Json
          created_at?: string
          id?: string
          screen_id?: string | null
          session_id?: string
          step_number?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "wizard_answers_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "wizard_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      wizard_sessions: {
        Row: {
          context_snapshot: Json | null
          created_at: string
          current_step: number
          form_data: Json
          id: string
          org_id: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          context_snapshot?: Json | null
          created_at?: string
          current_step?: number
          form_data?: Json
          id?: string
          org_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          context_snapshot?: Json | null
          created_at?: string
          current_step?: number
          form_data?: Json
          id?: string
          org_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      workflow_executions: {
        Row: {
          action_results: Json | null
          created_at: string
          duration_ms: number
          error_message: string | null
          id: string
          is_dry_run: boolean
          status: string
          trigger_data: Json | null
          user_id: string | null
          workflow_id: string
          workflow_name: string | null
        }
        Insert: {
          action_results?: Json | null
          created_at?: string
          duration_ms?: number
          error_message?: string | null
          id?: string
          is_dry_run?: boolean
          status?: string
          trigger_data?: Json | null
          user_id?: string | null
          workflow_id: string
          workflow_name?: string | null
        }
        Update: {
          action_results?: Json | null
          created_at?: string
          duration_ms?: number
          error_message?: string | null
          id?: string
          is_dry_run?: boolean
          status?: string
          trigger_data?: Json | null
          user_id?: string | null
          workflow_id?: string
          workflow_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_executions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          actions: Json
          conditions: Json
          created_at: string
          description: string
          fail_count: number
          id: string
          last_run_at: string | null
          name: string
          status: string
          success_count: number
          trigger: Json | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          actions?: Json
          conditions?: Json
          created_at?: string
          description?: string
          fail_count?: number
          id?: string
          last_run_at?: string | null
          name?: string
          status?: string
          success_count?: number
          trigger?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          actions?: Json
          conditions?: Json
          created_at?: string
          description?: string
          fail_count?: number
          id?: string
          last_run_at?: string | null
          name?: string
          status?: string
          success_count?: number
          trigger?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      consume_ai_rate_limit: {
        Args: {
          p_user_id: string
          p_limit: number
          p_window_seconds: number
        }
        Returns: {
          allowed: boolean
          remaining: number
          retry_after: number
        }[]
      }
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
