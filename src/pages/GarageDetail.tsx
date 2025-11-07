import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  ExternalLink,
  Wrench,
  ArrowLeft,
  Navigation,
  Share2,
  Heart
} from 'lucide-react';
import { Garage } from '../types/garage';
import { supabase } from '../lib/supabase';
import Badge from '../components/ui/Badge';
import GarageCard from '../components/features/GarageCard';
import Breadcrumb from '../components/Breadcrumb';

const GarageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [garage, setGarage] = useState<Garage | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarGarages, setSimilarGarages] = useState<Garage[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      fetchGarageDetails();
    }
  }, [id]);

  const fetchGarageDetails = async () => {
    try {
      setLoading(true);

      const { data: garageData, error: garageError } = await supabase
        .from('garages')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (garageError) throw garageError;

      if (!garageData) {
        navigate('/garages');
        return;
      }

      setGarage(garageData);

      const { data: similarData, error: similarError } = await supabase
        .from('garages')
        .select('*')
        .eq('gouvernorat', garageData.gouvernorat)
        .neq('id', id)
        .order('rating', { ascending: false })
        .limit(3);

      if (similarError) throw similarError;
      setSimilarGarages(similarData || []);
    } catch (error) {
      console.error('Error fetching garage details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/garages');
  };

  const handleShare = () => {
    if (navigator.share && garage) {
      navigator.share({
        title: garage.name,
        text: garage.description,
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!garage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Wrench size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Garage non trouvé</h2>
          <button
            onClick={handleBack}
            className="mt-4 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            Retour aux garages
          </button>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Garages', path: '/garages' },
    { label: garage.name, path: `/garage/${garage.id}` },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative text-white min-h-[50vh] lg:min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: garage.image_url ? `url(${garage.image_url})` : 'url(/hero-background.webp)',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#E65100',
            opacity: 0.90,
            mixBlendMode: 'multiply',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          <button
            onClick={handleBack}
            className="inline-flex items-center space-x-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Retour aux garages</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                {garage.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                {garage.rating > 0 && (
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Star size={24} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-2xl font-bold">{garage.rating.toFixed(1)}</span>
                    <span className="text-white/80">/5</span>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-orange-100">
                  <MapPin size={20} />
                  <span className="text-lg">{garage.gouvernorat}</span>
                </div>
              </div>

              <p className="text-lg lg:text-xl text-orange-100 drop-shadow-md max-w-3xl">
                {garage.description}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-lg backdrop-blur-sm transition-all ${
                  isFavorite
                    ? 'bg-red-500 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Heart size={24} className={isFavorite ? 'fill-current' : ''} />
              </button>
              <button
                onClick={handleShare}
                className="p-3 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
              >
                <Share2 size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de contact</h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <MapPin size={24} className="text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                    <p className="text-gray-700">{garage.address}</p>
                    <p className="text-gray-600">{garage.gouvernorat}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Phone size={24} className="text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                    <a
                      href={`tel:${garage.phone}`}
                      className="text-orange-600 hover:text-orange-700 transition-colors text-lg"
                    >
                      {garage.phone}
                    </a>
                  </div>
                </div>

                {garage.email && (
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Mail size={24} className="text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a
                        href={`mailto:${garage.email}`}
                        className="text-orange-600 hover:text-orange-700 transition-colors break-all"
                      >
                        {garage.email}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Clock size={24} className="text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horaires d'ouverture</h3>
                    <p className="text-gray-700">{garage.opening_hours}</p>
                  </div>
                </div>

                {garage.website && (
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <ExternalLink size={24} className="text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Site web</h3>
                      <a
                        href={garage.website.startsWith('http') ? garage.website : `https://${garage.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700 transition-colors break-all"
                      >
                        {garage.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Spécialités</h2>
              <div className="flex flex-wrap gap-2">
                {garage.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" size="lg">
                    <Wrench size={16} className="mr-1" />
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            {garage.brands.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Marques traitées</h2>
                <div className="flex flex-wrap gap-2">
                  {garage.brands.map((brand, index) => (
                    <Badge key={index} variant="outline" size="lg">
                      {brand}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="sticky top-6 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Actions rapides</h3>

                <div className="space-y-3">
                  <a
                    href={`tel:${garage.phone}`}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone size={20} />
                    <span>Appeler</span>
                  </a>

                  {garage.email && (
                    <a
                      href={`mailto:${garage.email}`}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail size={20} />
                      <span>Envoyer un email</span>
                    </a>
                  )}

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${garage.address}, ${garage.gouvernorat}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation size={20} />
                    <span>Itinéraire</span>
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Informations utiles</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Appelez pour prendre rendez-vous</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Demandez un devis gratuit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Vérifiez les disponibilités</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {similarGarages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Autres garages à {garage.gouvernorat}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarGarages.map((similarGarage) => (
                <GarageCard key={similarGarage.id} garage={similarGarage} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GarageDetail;
