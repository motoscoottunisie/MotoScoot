/*
  # Add Performance Indexes to Garages Table

  1. Indexes
    - Add index on `gouvernorat` for location-based filtering
    - Add index on `rating` for sorting
    - Add composite index on `gouvernorat` and `rating` for combined queries
    - Add GIN index on `specialties` array for specialty filtering

  2. Performance Benefits
    - Faster queries when filtering by location
    - Faster sorting by rating
    - Optimized combined location + rating queries
    - Efficient array searching for specialties
*/

-- Index for gouvernorat filtering
CREATE INDEX IF NOT EXISTS idx_garages_gouvernorat
ON garages(gouvernorat);

-- Index for rating sorting
CREATE INDEX IF NOT EXISTS idx_garages_rating
ON garages(rating DESC);

-- Composite index for location + rating queries
CREATE INDEX IF NOT EXISTS idx_garages_gouvernorat_rating
ON garages(gouvernorat, rating DESC);

-- GIN index for array searching on specialties
CREATE INDEX IF NOT EXISTS idx_garages_specialties
ON garages USING GIN(specialties);

-- GIN index for array searching on brands
CREATE INDEX IF NOT EXISTS idx_garages_brands
ON garages USING GIN(brands);

-- Analyze table to update statistics
ANALYZE garages;
