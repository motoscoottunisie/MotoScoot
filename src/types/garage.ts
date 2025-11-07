export interface Garage {
  id: string;
  name: string;
  description: string;
  address: string;
  gouvernorat: string;
  phone: string;
  email?: string;
  specialties: string[];
  brands: string[];
  rating: number;
  image_url?: string;
  opening_hours: string;
  website?: string;
  created_at: string;
}
