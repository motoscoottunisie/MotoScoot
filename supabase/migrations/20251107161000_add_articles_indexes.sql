/*
  # Add Performance Indexes to Articles Table

  1. Indexes
    - Add index on `category` for category filtering
    - Add index on `is_published` for published/draft filtering
    - Add index on `published_at` for sorting
    - Add composite index for common query patterns

  2. Performance Benefits
    - Faster queries when filtering by category
    - Faster filtering of published articles
    - Optimized date-based sorting
    - Efficient combined queries
*/

-- Index for category filtering
CREATE INDEX IF NOT EXISTS idx_articles_category
ON articles(category);

-- Index for published status
CREATE INDEX IF NOT EXISTS idx_articles_is_published
ON articles(is_published);

-- Index for published date sorting
CREATE INDEX IF NOT EXISTS idx_articles_published_at
ON articles(published_at DESC);

-- Composite index for published articles by category
CREATE INDEX IF NOT EXISTS idx_articles_published_category
ON articles(is_published, category, published_at DESC)
WHERE is_published = true;

-- Analyze table to update statistics
ANALYZE articles;
