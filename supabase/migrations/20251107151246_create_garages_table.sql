/*
  # Create garages table

  1. New Tables
    - `garages`
      - `id` (uuid, primary key) - Unique identifier for each garage
      - `name` (text) - Name of the garage
      - `description` (text) - Description of services offered
      - `address` (text) - Street address of the garage
      - `gouvernorat` (text) - Governorate/region location
      - `phone` (text) - Contact phone number
      - `email` (text) - Contact email address
      - `specialties` (text array) - Array of specialties (repair, accessories, etc.)
      - `brands` (text array) - Motorcycle/scooter brands they work with
      - `rating` (numeric) - Average rating (0-5)
      - `image_url` (text) - URL to garage image
      - `opening_hours` (text) - Opening hours information
      - `website` (text, optional) - Garage website URL
      - `created_at` (timestamptz) - Timestamp of creation

  2. Security
    - Enable RLS on `garages` table
    - Add policy for public read access (anyone can view garages)
    - Add policy for authenticated users to insert/update garages (for future garage owner features)
*/

CREATE TABLE IF NOT EXISTS garages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  address text NOT NULL,
  gouvernorat text NOT NULL,
  phone text NOT NULL,
  email text,
  specialties text[] NOT NULL DEFAULT '{}',
  brands text[] NOT NULL DEFAULT '{}',
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  image_url text,
  opening_hours text DEFAULT 'Lun-Sam: 8h-18h',
  website text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE garages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view garages"
  ON garages
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert garages"
  ON garages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update garages"
  ON garages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample data
INSERT INTO garages (name, description, address, gouvernorat, phone, email, specialties, brands, rating, image_url, opening_hours, website) VALUES
('Moto Expert Tunis', 'Garage spécialisé dans la réparation et l''entretien de toutes marques de motos et scooters. Vente d''accessoires et pièces détachées.', '45 Avenue Habib Bourguiba', 'Tunis', '+216 71 123 456', 'contact@motoexpert.tn', ARRAY['Réparation', 'Entretien', 'Accessoires', 'Pièces détachées'], ARRAY['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'BMW'], 4.5, 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg', 'Lun-Sam: 8h-18h', 'www.motoexpert.tn'),
('Scooter Center Ariana', 'Spécialiste scooters neufs et occasions. Réparation toutes marques, vente d''accessoires et équipements.', '12 Rue de la République', 'Ariana', '+216 71 234 567', 'info@scootercenter.tn', ARRAY['Réparation', 'Vente neuf', 'Vente occasion', 'Accessoires'], ARRAY['Vespa', 'Piaggio', 'Peugeot', 'Yamaha', 'Honda'], 4.2, 'https://images.pexels.com/photos/1149601/pexels-photo-1149601.jpeg', 'Lun-Sam: 9h-19h, Dim: 9h-13h', NULL),
('Garage Moto Sport Sfax', 'Réparation et customisation de motos sportives. Pièces performance et accessoires haut de gamme.', '78 Avenue Hedi Chaker', 'Sfax', '+216 74 345 678', 'contact@motosport-sfax.tn', ARRAY['Réparation', 'Customisation', 'Performance', 'Accessoires'], ARRAY['Kawasaki', 'Yamaha', 'Suzuki', 'Honda', 'Ducati', 'KTM'], 4.8, 'https://images.pexels.com/photos/2317712/pexels-photo-2317712.jpeg', 'Lun-Sam: 8h30-18h30', 'www.motosport-sfax.tn'),
('Atelier Deux Roues Sousse', 'Garage familial avec 20 ans d''expérience. Réparation, entretien et diagnostic électronique.', '23 Rue de France', 'Sousse', '+216 73 456 789', 'atelier2roues@gmail.com', ARRAY['Réparation', 'Entretien', 'Diagnostic électronique', 'Pneus'], ARRAY['Toutes marques'], 4.3, 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg', 'Lun-Ven: 8h-17h, Sam: 8h-13h', NULL),
('Moto Service Bizerte', 'Service rapide et professionnel. Réparation, entretien et vente d''accessoires pour motos et scooters.', '56 Avenue de la Corniche', 'Bizerte', '+216 72 567 890', 'service@motobizerte.tn', ARRAY['Réparation', 'Entretien', 'Accessoires', 'Pneumatiques'], ARRAY['Honda', 'Yamaha', 'Suzuki', 'Piaggio', 'Peugeot'], 4.1, 'https://images.pexels.com/photos/1619860/pexels-photo-1619860.jpeg', 'Lun-Sam: 8h-18h', NULL),
('Premium Moto Nabeul', 'Garage haut de gamme spécialisé dans les motos de luxe et sportives. Service premium et pièces d''origine.', '15 Route de la Plage', 'Nabeul', '+216 72 678 901', 'premium@motonabeul.tn', ARRAY['Réparation', 'Entretien premium', 'Pièces d''origine', 'Accessoires'], ARRAY['BMW', 'Ducati', 'Triumph', 'Harley-Davidson', 'KTM'], 4.7, 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg', 'Lun-Sam: 9h-19h', 'www.premiummotonabeul.tn'),
('Garage Central Monastir', 'Centre de service complet pour motos et scooters. Réparation, vente et location.', '89 Boulevard de l''Environnement', 'Monastir', '+216 73 789 012', 'central@motomonastir.tn', ARRAY['Réparation', 'Entretien', 'Location', 'Vente accessoires'], ARRAY['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'Vespa'], 4.0, 'https://images.pexels.com/photos/2519370/pexels-photo-2519370.jpeg', 'Lun-Sam: 8h-19h', NULL),
('Moto Passion Kairouan', 'Réparation et entretien de motos et scooters. Large choix d''accessoires et équipements de sécurité.', '34 Avenue de la République', 'Kairouan', '+216 77 890 123', 'passion@motokairouan.tn', ARRAY['Réparation', 'Entretien', 'Accessoires', 'Équipements'], ARRAY['Toutes marques'], 4.4, 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg', 'Lun-Sam: 8h-18h', NULL);
