import React, { useState } from 'react';
import { Shield, Check, CreditCard, Lock, Loader2 } from 'lucide-react';

interface SecurePaymentProps {
  price: number;
  onSecurePayment: () => Promise<void> | void;
}

// Move outside component to prevent recreation
const PAYMENT_STEPS = [
  {
    number: 1,
    title: 'Proposition de paiement',
    description: 'Vous proposez un paiement sécurisé au vendeur'
  },
  {
    number: 2,
    title: 'Inspection du véhicule',
    description: 'Rencontrez le vendeur et vérifiez l\'état du véhicule'
  },
  {
    number: 3,
    title: 'Libération des fonds',
    description: 'Les fonds sont automatiquement libérés après confirmation'
  }
];

const ICON_SIZES = {
  large: 20,
  medium: 16,
  small: 14
} as const;

const SecurePayment: React.FC<SecurePaymentProps> = ({ price, onSecurePayment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      await onSecurePayment();
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
          <Shield className="text-white" size={ICON_SIZES.large} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Paiement sécurisé disponible</h3>
          <p className="text-sm text-gray-600">Protection acheteur garantie</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600">Montant à payer</span>
          <span className="text-2xl font-bold text-gray-900">{formatPrice(price)}</span>
        </div>
        
        {error && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            {error}
          </div>
        )}
        
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-green-200"
        >
          {isProcessing ? (
            <>
              <Loader2 size={ICON_SIZES.large} className="animate-spin" aria-hidden="true" />
              <span>Traitement en cours...</span>
            </>
          ) : (
            <>
              <CreditCard size={ICON_SIZES.large} aria-hidden="true" />
              <span>Proposer un paiement sécurisé</span>
            </>
          )}
        </button>
      </div>

      {/* How it works */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="payment-steps-section"
        className="w-full text-left text-sm text-gray-600 hover:text-gray-800 transition-colors mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
      >
        Comment ça marche ? {isExpanded ? '▲' : '▼'}
      </button>

      {isExpanded && (
        <div id="payment-steps-section" className="space-y-3 mb-4">
          {PAYMENT_STEPS.map((step) => (
            <div key={step.number} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {step.number}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{step.title}</h4>
                <p className="text-xs text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Security Features */}
      <div className="bg-white rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <Lock className="mr-2 text-green-600" size={ICON_SIZES.medium} aria-hidden="true" />
          Vos garanties
        </h4>
        <ul className="space-y-2" role="list">
          <li className="flex items-center space-x-2 text-sm">
            <Check className="text-green-600 flex-shrink-0" size={ICON_SIZES.small} aria-hidden="true" />
            <span className="text-gray-700">Fonds bloqués jusqu'à la livraison</span>
          </li>
          <li className="flex items-center space-x-2 text-sm">
            <Check className="text-green-600 flex-shrink-0" size={ICON_SIZES.small} aria-hidden="true" />
            <span className="text-gray-700">Remboursement si problème majeur</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SecurePayment;