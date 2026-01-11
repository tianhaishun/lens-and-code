export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  coverImage: string;
  featured: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  demoUrl?: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  date: string;
  avatar?: string;
}
