export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: 'actualites' | 'essais' | 'annonces' | 'conseils';
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  featured?: boolean;
}

export type ArticleCategory = 'actualites' | 'essais' | 'annonces' | 'conseils';
