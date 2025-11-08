import { Listing, User } from '../types';

export const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Honda CL500 2023 - Neo Retro',
    price: 5500,
    year: 2023,
    mileage: 3200,
    location: 'Tunis',
    images: [
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
      'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg'
    ],
    brand: 'Honda',
    model: 'CL500',
    category: 'moto',
    condition: 'excellent',
    description: 'Moto neo retro en excellent état, entretien régulier chez le concessionnaire.',
    sellerId: 'user1',
    sellerName: 'Pierre Martin',
    createdAt: new Date('2024-01-15'),
    isFavorite: false,
    engineSize: 471,
    color: 'Noir',
    type: 'Roadster'
  },
  {
    id: '2',
    title: 'BMW R1250 GS 2022 - Adventure',
    price: 18000,
    year: 2022,
    mileage: 12000,
    location: 'Sousse',
    images: [
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg'
    ],
    brand: 'BMW',
    model: 'R1250 GS',
    category: 'moto',
    condition: 'excellent',
    description: 'BMW GS en parfait état, équipée valises et protections.',
    sellerId: 'user2',
    sellerName: 'Sarah Dubois',
    createdAt: new Date('2024-01-10'),
    isFavorite: false,
    engineSize: 1254,
    color: 'Blanc',
    type: 'Trail'
  },
  {
    id: '3',
    title: 'Yamaha MT-07 2021 - Roadster',
    price: 7200,
    year: 2021,
    mileage: 18000,
    location: 'Sfax',
    images: [
      'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg'
    ],
    brand: 'Yamaha',
    model: 'MT-07',
    category: 'moto',
    condition: 'très bon',
    description: 'MT-07 en très bon état, bi-cylindre nerveux.',
    sellerId: 'user3',
    sellerName: 'Marc Leroy',
    createdAt: new Date('2024-01-12'),
    isFavorite: false,
    engineSize: 689,
    color: 'Bleu',
    type: 'Roadster'
  },
  {
    id: '4',
    title: 'Kawasaki Ninja 650 2020 - Sportive',
    price: 6800,
    year: 2020,
    mileage: 22000,
    location: 'Nabeul',
    images: [
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg'
    ],
    brand: 'Kawasaki',
    model: 'Ninja 650',
    category: 'moto',
    condition: 'très bon',
    description: 'Ninja 650 sportive-touring, idéale débutant.',
    sellerId: 'user4',
    sellerName: 'Julie Moreau',
    createdAt: new Date('2024-01-08'),
    isFavorite: false,
    engineSize: 649,
    color: 'Vert',
    type: 'Sportive'
  },
  {
    id: '5',
    title: 'Ducati Scrambler Icon 2019',
    price: 8500,
    year: 2019,
    mileage: 15000,
    location: 'Bizerte',
    images: [
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg'
    ],
    brand: 'Ducati',
    model: 'Scrambler Icon',
    category: 'moto',
    condition: 'excellent',
    description: 'Scrambler Ducati, style et plaisir garantis.',
    sellerId: 'user1',
    sellerName: 'Pierre Martin',
    createdAt: new Date('2024-01-14'),
    isFavorite: false,
    engineSize: 803,
    color: 'Jaune',
    type: 'Custom'
  },
  {
    id: '6',
    title: 'Triumph Bonneville T120 2018',
    price: 9800,
    year: 2018,
    mileage: 28000,
    location: 'Ariana',
    images: [
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg'
    ],
    brand: 'Triumph',
    model: 'Bonneville T120',
    category: 'moto',
    condition: 'très bon',
    description: 'Bonneville classique britannique, moto de caractère.',
    sellerId: 'user2',
    sellerName: 'Sarah Dubois',
    createdAt: new Date('2024-01-13'),
    isFavorite: false,
    engineSize: 1200,
    color: 'Noir',
    type: 'Custom'
  },
  {
    id: '7',
    title: 'Honda Africa Twin 2020 - Adventure',
    price: 12500,
    year: 2020,
    mileage: 35000,
    location: 'Monastir',
    images: [
      'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg'
    ],
    brand: 'Honda',
    model: 'Africa Twin',
    category: 'moto',
    condition: 'bon',
    description: 'Africa Twin pour les grands voyages.',
    sellerId: 'user3',
    sellerName: 'Marc Leroy',
    createdAt: new Date('2024-01-11'),
    isFavorite: false,
    engineSize: 1084,
    color: 'Rouge',
    type: 'Trail'
  },
  {
    id: '8',
    title: 'Suzuki GSX-R750 2019 - Supersport',
    price: 9200,
    year: 2019,
    mileage: 19000,
    location: 'Tunis',
    images: [
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg'
    ],
    brand: 'Suzuki',
    model: 'GSX-R750',
    category: 'moto',
    condition: 'excellent',
    description: 'GSX-R750 sportive pure, performances exceptionnelles.',
    sellerId: 'user4',
    sellerName: 'Julie Moreau',
    createdAt: new Date('2024-01-09'),
    isFavorite: false,
    engineSize: 750,
    color: 'Bleu',
    type: 'Sportive'
  },
  {
    id: '9',
    title: 'BMW K1600 GT 2021 - Grand Tourisme',
    price: 22000,
    year: 2021,
    mileage: 25000,
    location: 'Sousse',
    images: [
      'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg'
    ],
    brand: 'BMW',
    model: 'K1600 GT',
    category: 'moto',
    condition: 'excellent',
    description: 'BMW K1600 GT, confort et luxe sur route.',
    sellerId: 'user1',
    sellerName: 'Pierre Martin',
    createdAt: new Date('2024-01-07'),
    isFavorite: false,
    engineSize: 1649,
    color: 'Gris',
    type: 'Routière'
  },
  {
    id: '10',
    title: 'Yamaha R1 2022 - Superbike',
    price: 16500,
    year: 2022,
    mileage: 8000,
    location: 'Nabeul',
    images: [
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg'
    ],
    brand: 'Yamaha',
    model: 'YZF-R1',
    category: 'moto',
    condition: 'excellent',
    description: 'Yamaha R1 superbike, technologie MotoGP.',
    sellerId: 'user2',
    sellerName: 'Sarah Dubois',
    createdAt: new Date('2024-01-06'),
    isFavorite: false,
    engineSize: 998,
    color: 'Blanc',
    type: 'Sportive'
  },
  {
    id: '11',
    title: 'Harley Davidson Street 750 2020',
    price: 7500,
    year: 2020,
    mileage: 14000,
    location: 'Sfax',
    images: [
      'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg'
    ],
    brand: 'Harley-Davidson',
    model: 'Street 750',
    category: 'moto',
    condition: 'très bon',
    description: 'Harley Street 750, style américain accessible.',
    sellerId: 'user3',
    sellerName: 'Marc Leroy',
    createdAt: new Date('2024-01-05'),
    isFavorite: false,
    engineSize: 749,
    color: 'Noir',
    type: 'Custom'
  },
  {
    id: '12',
    title: 'KTM 790 Adventure 2023 - Rally',
    price: 11200,
    year: 2023,
    mileage: 5500,
    location: 'Bizerte',
    images: [
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg'
    ],
    brand: 'KTM',
    model: '790 Adventure',
    category: 'moto',
    condition: 'excellent',
    description: 'KTM 790 Adventure, machine à tout faire.',
    sellerId: 'user4',
    sellerName: 'Julie Moreau',
    createdAt: new Date('2024-01-04'),
    isFavorite: false,
    engineSize: 799,
    color: 'Orange',
    type: 'Trail'
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
  },
  {
    id: 'user3',
    name: 'Marc Leroy',
    email: 'marc.leroy@email.com',
    phone: '06 45 67 89 12',
    rating: 4.7,
    totalSales: 15
  },
  {
    id: 'user4',
    name: 'Julie Moreau',
    email: 'julie.moreau@email.com',
    phone: '06 98 76 54 32',
    rating: 4.9,
    totalSales: 10
  }
];
