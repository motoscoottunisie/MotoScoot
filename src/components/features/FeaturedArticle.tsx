import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { Article } from '../../types/article';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { useImageLoader } from '../../hooks/useImageLoader';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';

interface FeaturedArticleProps {
  article: Article;
}

const categoryLabels: Record<string, string> = {
  actualites: 'Actualités',
  essais: 'Essais',
  annonces: 'Annonces',
  conseils: 'Conseils',
};

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  const imageLoaded = useImageLoader(article.coverImage);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl mb-12">
      <div className="grid lg:grid-cols-2 gap-0">
        <div className="relative h-80 lg:h-auto overflow-hidden">
          {!imageLoaded ? (
            <ImagePlaceholder />
          ) : (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute top-6 left-6">
            <Badge variant="primary">
              {categoryLabels[article.category]}
            </Badge>
          </div>
        </div>

        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
              Article du mois
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            {article.title}
          </h2>

          <p className="text-gray-300 text-lg mb-6 line-clamp-3">
            {article.excerpt}
          </p>

          <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-700">
            <Avatar src={article.author.avatar} alt={article.author.name} size="md" />
            <div>
              <p className="text-white font-medium">{article.author.name}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{article.readTime} min de lecture</span>
                </span>
              </div>
            </div>
          </div>

          <Link
            to={`/news/${article.slug}`}
            className="inline-flex items-center space-x-2 text-orange-500 font-semibold hover:text-orange-400 transition-colors group"
          >
            <span>Lire l'article complet</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
