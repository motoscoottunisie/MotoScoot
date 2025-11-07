import { Listing, User } from '../types';

export const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Honda CB650R 2021 - Excellent état',
    price: 8500,
    year: 2021,
    mileage: 12000,
    location: 'Paris (75)',
    images: [
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
      'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg'
    ],
    brand: 'Honda',
    model: 'CB650R',
    category: 'moto',
    condition: 'excellent',
    description: 'Moto en excellent état, entretien régulier chez le concessionnaire. Révision récente, pneus neufs.',
    sellerId: 'user1',
    sellerName: 'Pierre Martin',
    createdAt: new Date('2024-01-15'),
    isFavorite: false
  },
  {
    id: '2',
    title: 'Yamaha YZF-R6 2019 - Sportive',
    price: 11200,
    year: 2019,
    mileage: 18500,
    location: 'Lyon (69)',
    images: [
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg'
    ],
    brand: 'Yamaha',
    model: 'YZF-R6',
    category: 'moto',
    condition: 'très bon',
    description: 'Sportive en très bon état, idéale pour les passionnés de vitesse.',
    sellerId: 'user2',
    sellerName: 'Sarah Dubois',
    createdAt: new Date('2024-01-10'),
    isFavorite: false
  },
  {
    id: '3',
    title: 'Vespa Primavera 150 2020',
    price: 3800,
    year: 2020,
    mileage: 8200,
    location: 'Marseille (13)',
    images: [
      'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg'
    ],
    brand: 'Vespa',
    model: 'Primavera',
    category: 'scooter',
    condition: 'excellent',
    description: 'Scooter élégant, parfait pour la ville. Très économique.',
    sellerId: 'user3',
    sellerName: 'Marc Leroy',
    createdAt: new Date('2024-01-12'),
    isFavorite: false
  },
  {
    id: '4',
    title: 'Casque Shark Race-R Pro - Neuf',
    price: 280,
    year: 2024,
    mileage: 0,
    location: 'Toulouse (31)',
    images: [
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg'
    ],
    brand: 'Shark',
    model: 'Race-R Pro',
    category: 'accessoires',
    condition: 'excellent',
    description: 'Casque neuf, jamais porté. Taille M. Homologué CE.',
    sellerId: 'user4',
    sellerName: 'Julie Moreau',
    createdAt: new Date('2024-01-08'),
    isFavorite: false
  },
  {
    id: '5',
    title: 'Honda CB650R 2020 - Très bon état',
    price: 7800,
    year: 2020,
    mileage: 15000,
    location: 'Nice (06)',
    images: [
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg'
    ],
    brand: 'Honda',
    model: 'CB650R',
    category: 'moto',
    condition: 'très bon',
    description: 'Belle moto bien entretenue.',
    sellerId: 'user1',
    sellerName: 'Pierre Martin',
    createdAt: new Date('2024-01-14'),
    isFavorite: false
  },
  {
    id: '6',
    title: 'Honda CB650R 2022 - État neuf',
    price: 9200,
    year: 2022,
    mileage: 5000,
    location: 'Bordeaux (33)',
    images: [
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg'
    ],
    brand: 'Honda',
    model: 'CB650R',
    category: 'moto',
    condition: 'excellent',
    description: 'Comme neuve, très peu roulée.',
    sellerId: 'user2',
    sellerName: 'Sarah Dubois',
    createdAt: new Date('2024-01-13'),
    isFavorite: false
  }
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Pierre Martin',
    email: 'pierre.martin@email.com',
    phone: '06 12 34 56 78',
    rating: 4.8,
    totalSales: 12
  },
  {
    id: 'user2',
    name: 'Sarah Dubois',
    email: 'sarah.dubois@email.com',
    phone: '06 87 65 43 21',
    rating: 4.9,
    totalSales: 8
  }
];