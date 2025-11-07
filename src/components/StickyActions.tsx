import React from 'react';
import { MessageCircle, CreditCard, Heart, Phone } from 'lucide-react';

interface StickyActionsProps {
  price: number;
  onContact: () => void;
  onSecurePayment: () => void;
}

const StickyActions: React.FC<StickyActionsProps> = ({
  price,
  onContact,
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
      
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onContact}
          className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1"
        >
          <MessageCircle size={18} />
          <span className="text-sm">Message</span>
        </button>
        
        <button
          onClick={onSecurePayment}
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1"
        >
          <CreditCard size={18} />
          <span className="text-sm">Payer</span>
        </button>
      </div>
    </div>
  );
};

export default StickyActions;