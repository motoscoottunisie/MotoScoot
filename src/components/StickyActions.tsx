import React from 'react';
import { CreditCard } from 'lucide-react';

interface StickyActionsProps {
  price: number;
  onSecurePayment: () => void;
}

const StickyActions: React.FC<StickyActionsProps> = ({
  price,
  onSecurePayment,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 md:hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="text-2xl font-bold text-orange-600">
          {formatPrice(price)}
        </div>
      </div>

      <button
        onClick={onSecurePayment}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
      >
        <CreditCard size={20} />
        <span>Paiement sécurisé</span>
      </button>
    </div>
  );
};

export default StickyActions;