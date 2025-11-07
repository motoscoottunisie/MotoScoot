import React, { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';
import { Button } from '../ui/Button';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail('');

    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  return (
    <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl overflow-hidden shadow-xl">
      <div className="px-8 py-12 lg:px-16 lg:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Mail className="text-white" size={32} />
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Restez informé de l'actualité moto
          </h2>

          <p className="text-lg text-orange-100 mb-8">
            Recevez nos dernières actualités, essais et conseils directement dans votre boîte mail.
            Pas de spam, juste du contenu de qualité pour les passionnés de deux-roues.
          </p>

          {isSubscribed ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 inline-flex items-center space-x-3">
              <div className="bg-green-500 rounded-full p-2">
                <Check className="text-white" size={24} />
              </div>
              <p className="text-white font-semibold">Merci ! Votre inscription a été confirmée.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  required
                  className="flex-1 px-6 py-4 rounded-lg border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-orange-200 focus:outline-none focus:border-white transition-colors"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  disabled={isLoading}
                  className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg whitespace-nowrap"
                >
                  {isLoading ? (
                    'Inscription...'
                  ) : (
                    <>
                      <Send size={20} />
                      <span>S'abonner</span>
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-orange-100 mt-4">
                En vous inscrivant, vous acceptez notre politique de confidentialité.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
