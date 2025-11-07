export interface Listing {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  location: string;
  images: string[];
  brand: string;
  model: string;
  category: 'moto' | 'scooter' | 'accessoires';
  condition: 'excellent' | 'très bon' | 'bon' | 'correct';
  description: string;
  sellerId: string;
  sellerName: string;
  createdAt: Date;
  isFavorite?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  rating: number;
  totalSales: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  listingId: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
}

export interface SearchFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  mileageMax?: number;
  location?: string;
  brand?: string;
  condition?: string;
}