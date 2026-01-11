import { supabase } from './supabase'
import { Article } from './supabase'

// 检查用户是否是管理员
export async function checkIsAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('admin_users')
    .select('is_admin')
    .eq('user_id', userId)
    .single()

  if (error || !data) return false
  return data.is_admin || false
}

// 获取所有文章
export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching articles:', error)
    return []
  }

  return data || []
}

// 根据ID获取文章
export async function getArticleById(id: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching article:', error)
    return null
  }

  return data
}

// 创建文章
export async function createArticle(article: Omit<Article, 'created_at' | 'updated_at'>): Promise<boolean> {
  const { error } = await supabase
    .from('articles')
    .insert(article)

  if (error) {
    console.error('Error creating article:', error)
    return false
  }

  return true
}

// 更新文章
export async function updateArticle(id: string, article: Partial<Article>): Promise<boolean> {
  const { error } = await supabase
    .from('articles')
    .update({ ...article, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    console.error('Error updating article:', error)
    return false
  }

  return true
}

// 删除文章
export async function deleteArticle(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting article:', error)
    return false
  }

  return true
}

// 获取文章的所有评论
export async function getCommentsByArticleId(articleId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('articleId', articleId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching comments:', error)
    return []
  }

  return data || []
}

// 创建评论
export async function createComment(comment: {
  id: string
  articleId: string
  author: string
  content: string
  email?: string
}): Promise<boolean> {
  const { error } = await supabase
    .from('comments')
    .insert(comment)

  if (error) {
    console.error('Error creating comment:', error)
    return false
  }

  return true
}

// 删除评论
export async function deleteComment(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting comment:', error)
    return false
  }

  return true
}

// 设置用户为管理员（需要手动在数据库执行）
export async function setUserAsAdmin(userId: string): Promise<boolean> {
  const { error } = await supabase
    .from('admin_users')
    .insert({ user_id: userId, is_admin: true })

  if (error) {
    console.error('Error setting user as admin:', error)
    return false
  }

  return true
}
