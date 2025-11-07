import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArticleCategory } from '../types/article';
import { mockArticles } from '../data/articles';
import { ArticleCard } from '../components/features/ArticleCard';
import { FeaturedArticle } from '../components/features/FeaturedArticle';
import { NewsFilters } from '../components/features/NewsFilters';
import { NewsletterSection } from '../components/features/NewsletterSection';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredArticle = mockArticles.find(article => article.featured);

  const filteredArticles = useMemo(() => {
    return mockArticles
      .filter(article => !article.featured)
      .filter(article => {
        const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div
          className="relative height: '65vh' bg-cover bg-center flex items-center"
          style={{ backgroundImage: 'url(/hero-background.webp)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Actualités et Conseils Moto
              </h1>
              <p className="text-lg lg:text-xl text-gray-200 max-w-3xl">
                Restez informé des dernières tendances, annonces et conseils pour passionnés de deux-roues.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {featuredArticle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <FeaturedArticle article={featuredArticle} />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <NewsFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </motion.div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Aucun article trouvé pour cette recherche.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <NewsletterSection />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default News;
