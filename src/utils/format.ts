export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString('fr-FR');
};
