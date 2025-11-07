import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';
import { Article } from '../../types/article';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { useImageLoader } from '../../hooks/useImageLoader';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';

interface ArticleCardProps {
  article: Article;
}

const categoryLabels: Record<string, string> = {
  actualites: 'Actualités',
  essais: 'Essais',
  annonces: 'Annonces',
  conseils: 'Conseils',
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const imageLoaded = useImageLoader(article.coverImage);

  return (
    <Link
      to={`/news/${article.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {!imageLoaded ? (
          <ImagePlaceholder />
        ) : (
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute top-4 left-4">
          <Badge variant={article.category === 'actualites' ? 'primary' : 'secondary'}>
            {categoryLabels[article.category]}
          </Badge>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <Avatar src={article.author.avatar} alt={article.author.name} size="sm" />
            <div>
              <p className="text-sm font-medium text-gray-900">{article.author.name}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Calendar size={12} />
                <span>{new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <Clock size={14} />
            <span className="text-xs">{article.readTime} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
