export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agent_profile: {
        Row: {
          created_at: string
          experience_years: string
          id: string
          name: string
          paragraphs: string[]
          signature: string
          stats: Json
          subtitle: string
          title: string
        }
        Insert: {
          created_at?: string
          experience_years: string
          id?: string
          name: string
          paragraphs: string[]
          signature: string
          stats: Json
          subtitle: string
          title: string
        }
        Update: {
          created_at?: string
          experience_years?: string
          id?: string
          name?: string
          paragraphs?: string[]
          signature?: string
          stats?: Json
          subtitle?: string
          title?: string
        }
      }
      inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          interest: string
          message: string
          name: string
          phone: string
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          interest: string
          message: string
          name: string
          phone: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          interest?: string
          message?: string
          name?: string
          phone?: string
          status?: string
        }
      }
      properties: {
        Row: {
          baths: number
          beds: number
          created_at: string
          id: string
          image: string
          location: string
          price: string
          sqft: string
          tag: string
          title: string
        }
        Insert: {
          baths: number
          beds: number
          created_at?: string
          id?: string
          image: string
          location: string
          price: string
          sqft: string
          tag: string
          title: string
        }
        Update: {
          baths?: number
          beds?: number
          created_at?: string
          id?: string
          image?: string
          location?: string
          price?: string
          sqft?: string
          tag?: string
          title?: string
        }
      }
      settings: {
        Row: {
          created_at: string
          email: string
          id: string
          office: string
          phone: string
          telegram: string
          tel: string
          whatsapp: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          office: string
          phone: string
          telegram: string
          tel: string
          whatsapp: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          office?: string
          phone?: string
          telegram?: string
          tel?: string
          whatsapp?: string
        }
      }
      testimonials: {
        Row: {
          content: string
          created_at: string
          id: string
          image: string
          name: string
          role: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image: string
          name: string
          role: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image?: string
          name?: string
          role?: string
        }
      }
    }
  }
}
