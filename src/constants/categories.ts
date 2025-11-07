export const CATEGORIES = [
  { value: 'moto', label: 'Motos' },
  { value: 'scooter', label: 'Scooters' },
  { value: 'accessoires', label: 'Accessoires' }
] as const;

export const BRANDS = [
  'Honda',
  'Yamaha',
  'Suzuki',
  'Kawasaki',
  'BMW',
  'Ducati',
  'KTM',
  'Triumph',
  'Vespa',
  'Piaggio'
] as const;

export const CONDITIONS = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'très bon', label: 'Très bon' },
  { value: 'bon', label: 'Bon' },
  { value: 'correct', label: 'Correct' }
] as const;

export const getCategoryLabel = (category?: string): string => {
  switch (category) {
    case 'moto':
      return 'Motos';
    case 'scooter':
      return 'Scooters';
    case 'accessoires':
      return 'Accessoires';
    default:
      return 'Toutes catégories';
  }
};
