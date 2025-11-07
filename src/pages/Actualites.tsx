import React, { useEffect, useState } from 'react';
import { Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Article, ArticleCategory } from '../types/article';
import { ArticleCard } from '../components/features/ArticleCard';
import AdsBanner from '../components/AdsBanner';
import { Button } from '../components/ui/Button';

const categories: ArticleCategory[] = ['général', 'événements', 'presse', 'innovations'];

export const Actualites: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative text-white min-h-[67vh] lg:min-h-[73vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale"
          style={{
            backgroundImage: 'url(/hero-background.webp)',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#E65100',
            opacity: 0.95,
            mixBlendMode: 'multiply',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
            Les Dernières Actualités
            <br />
            <span className="text-orange-200">sur l'univers de la moto</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Découvrez nos nouveautés, événements et articles exclusifs
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            {selectedCategory ? `Catégorie : ${selectedCategory}` : 'Tous les articles'}
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Filter size={20} />
              <span className="font-medium">Filtrer par :</span>
            </div>
            <Button
              variant={selectedCategory === null ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Tous
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">Aucun article trouvé dans cette catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        <div className="mt-16">
          <AdsBanner />
        </div>
      </div>
    </div>
  );
};
