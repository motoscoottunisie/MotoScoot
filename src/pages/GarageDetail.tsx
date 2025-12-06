import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Wrench,
  ArrowLeft,
  Navigation,
  MessageCircle
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

  useEffect(() => {
    if (id) {
      fetchGarageDetails();
    }
  }, [id]);

  const fetchGarageDetails = async () => {
    try {
      setLoading(true);

      const [garageResponse, similarResponse] = await Promise.all([
        supabase
          .from('garages')
          .select('id, name, description, gouvernorat, address, phone, email, opening_hours, rating, specialties, brands, website, image_url')
          .eq('id', id)
          .maybeSingle(),
        supabase
          .from('garages')
          .select('id, name, description, gouvernorat, address, phone, email, opening_hours, rating, specialties, brands, image_url')
          .neq('id', id)
          .order('rating', { ascending: false })
          .limit(10)
      ]);

      if (garageResponse.error) throw garageResponse.error;

      if (!garageResponse.data) {
        navigate('/garages');
        return;
      }

      setGarage(garageResponse.data);

      if (!similarResponse.error && similarResponse.data) {
        const filtered = similarResponse.data.filter(
          g => g.gouvernorat === garageResponse.data.gouvernorat
        ).slice(0, 3);
        setSimilarGarages(filtered);
      }
    } catch (error) {
      console.error('Error fetching garage details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/garages');
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
      <section className="relative text-white min-h-[67vh] lg:min-h-[73vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale"
          style={{
            backgroundImage: 'url(/hero-background.webp)',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#E65100',
            opacity: 0.95,
            mixBlendMode: 'multiply',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <button
            onClick={handleBack}
            className="inline-flex items-center space-x-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Retour aux garages</span>
          </button>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
            {garage.name}
          </h1>

          <p className="text-lg lg:text-xl text-orange-100 drop-shadow-md max-w-3xl mx-auto mb-8">
            {garage.description}
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <MapPin size={20} />
              <span className="font-medium">{garage.gouvernorat}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Clock size={20} />
              <span className="font-medium">{garage.opening_hours}</span>
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
                {/* Garage Name and Description */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Wrench size={24} className="text-orange-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-xl mb-2">{garage.name}</h3>
                    {garage.description && (
                      <p className="text-gray-700">{garage.description}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <MapPin size={24} className="text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                    <p className="text-gray-700">{garage.address}</p>
                    <p className="text-gray-600">{garage.gouvernorat}</p>
                  </div>
                </div>

                {/* Phone */}
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

                {/* Email */}
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

                {/* Opening Hours */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Clock size={24} className="text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horaires d'ouverture</h3>
                    <p className="text-gray-700">{garage.opening_hours}</p>
                  </div>
                </div>

                {/* Website */}
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

                  {garage.phone && (
                    <a
                      href={`https://wa.me/${garage.phone.replace(/\s+/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={20} />
                      <span>WhatsApp</span>
                    </a>
                  )}

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${garage.address}, ${garage.gouvernorat}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation size={20} />
                    <span>Google Maps</span>
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