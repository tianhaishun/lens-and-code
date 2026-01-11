import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 数据库类型
export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  coverImage: string
  featured: boolean
  created_at?: string
  updated_at?: string
}

export interface Comment {
  id: string
  articleId: string
  author: string
  content: string
  email?: string
  created_at?: string
}

export interface Project {
  id: string
  title: string
  description: string
  githubUrl: string
  demoUrl?: string
  language: string
  topics: string[]
  created_at?: string
}
