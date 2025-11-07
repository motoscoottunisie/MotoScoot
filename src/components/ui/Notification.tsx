import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[200] animate-in slide-in-from-top duration-300">
      <div className="bg-white rounded-xl shadow-2xl border-2 border-green-500 p-6 min-w-[320px] max-w-md">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Succès!
            </h3>
            <p className="text-gray-700">
              {message}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close notification"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 bg-green-500 h-1 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 animate-shrink"
            style={{
              animation: `shrink ${duration}ms linear forwards`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Notification;
