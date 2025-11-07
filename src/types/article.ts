export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  category: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  views: number;
}

export type ArticleCategory = 'général' | 'événements' | 'presse' | 'innovations';
