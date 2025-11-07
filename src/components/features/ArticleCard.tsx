import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Eye } from 'lucide-react';
import { Article } from '../../types/article';
import { formatDate } from '../../utils/format';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link
      to={`/actualites/${article.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={article.cover_image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-orange-600 text-white text-xs font-semibold rounded-full">
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDate(article.published_at)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={14} />
            <span>{article.views}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {article.excerpt}
        </p>

        <div className="flex items-center text-orange-600 font-semibold text-sm group-hover:gap-2 transition-all duration-300">
          <span>Lire la suite</span>
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
        </div>
      </div>
    </Link>
  );
};
