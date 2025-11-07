import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, Wrench } from 'lucide-react';
import GarageCard from '../components/features/GarageCard';
import { Garage } from '../types/garage';
import { supabase } from '../lib/supabase';

const Garages: React.FC = () => {
  const [garages, setGarages] = useState<Garage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGouvernorat, setSelectedGouvernorat] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');

  const gouvernorats = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan',
    'Bizerte', 'Béja', 'Jendouba', 'Le Kef', 'Siliana', 'Sousse',
    'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid',
    'Gabès', 'Médenine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'
  ];

  const specialties = [
    'Réparation',
    'Entretien',
    'Accessoires',
    'Pièces détachées',
    'Customisation',
    'Performance',
    'Diagnostic électronique',
    'Vente neuf',
    'Vente occasion'
  ];

  useEffect(() => {
    fetchGarages();
  }, []);

  useEffect(() => {
    if (selectedGouvernorat || selectedSpecialty) {
      fetchFilteredGarages();
    }
  }, [selectedGouvernorat, selectedSpecialty]);

  const fetchGarages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('garages')
        .select('id, name, description, gouvernorat, address, phone, email, opening_hours, rating, specialties, brands, image_url')
        .order('rating', { ascending: false })
        .limit(50);

      if (error) throw error;
      setGarages(data || []);
    } catch (error) {
      console.error('Error fetching garages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredGarages = async () => {
    try {
      let query = supabase
        .from('garages')
        .select('id, name, description, gouvernorat, address, phone, email, opening_hours, rating, specialties, brands, image_url')
        .order('rating', { ascending: false })
        .limit(50);

      if (selectedGouvernorat) {
        query = query.eq('gouvernorat', selectedGouvernorat);
      }

      if (selectedSpecialty) {
        query = query.contains('specialties', [selectedSpecialty]);
      }

      const { data, error } = await query;

      if (error) throw error;
      setGarages(data || []);
    } catch (error) {
      console.error('Error fetching filtered garages:', error);
    }
  };

  const filteredGarages = garages;

  const clearFilters = () => {
    setSelectedGouvernorat('');
    setSelectedSpecialty('');
  };

  const activeFiltersCount = [selectedGouvernorat, selectedSpecialty].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white min-h-[67vh] lg:min-h-[73vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale"
          style={{
            backgroundImage: 'url(/hero-background.webp)',
          }}
        />

        {/* Orange Overlay with Blend Mode */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#E65100',
            opacity: 0.95,
            mixBlendMode: 'multiply',
          }}
        />

        {/* Additional subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
            Garages & Ateliers
            <br />
            <span className="text-orange-200">Professionnels de confiance</span>
          </h1>

          <p className="text-lg lg:text-xl text-orange-100 drop-shadow-md max-w-3xl mx-auto mb-8">
            Trouvez les meilleurs professionnels pour l'entretien et la réparation de votre moto ou scooter
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-3 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 text-gray-900 border-0 focus:ring-2 focus:ring-orange-300 focus:outline-none rounded-lg appearance-none bg-gray-50"
                >
                  <option value="">Toutes les spécialités</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
                <Wrench size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="flex-1 relative">
                <select
                  value={selectedGouvernorat}
                  onChange={(e) => setSelectedGouvernorat(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 text-gray-900 border-0 focus:ring-2 focus:ring-orange-300 focus:outline-none rounded-lg appearance-none bg-gray-50"
                >
                  <option value="">Tous les gouvernorats</option>
                  {gouvernorats.map(gov => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
                <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedGouvernorat ? `Garages à ${selectedGouvernorat}` : 'Tous les garages'}
          </h2>
          <p className="text-gray-600 mt-1">
            {filteredGarages.length} résultat{filteredGarages.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        )}

        {/* Garages Grid */}
        {!loading && filteredGarages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGarages.map(garage => (
              <GarageCard key={garage.id} garage={garage} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredGarages.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Wrench size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Aucun garage trouvé
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Aucun garage ne correspond à vos critères de recherche. Essayez d'élargir votre recherche.
            </p>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Effacer tous les filtres
              </button>
            )}
          </div>
        )}

        {/* Info Section */}
        {!loading && filteredGarages.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Besoin d'aide pour choisir un garage ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">Vérifiez les avis</h4>
                <p>Consultez les notes et avis des clients pour vous assurer de la qualité du service.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Comparez les spécialités</h4>
                <p>Chaque garage a ses domaines d'expertise. Choisissez celui qui correspond à vos besoins.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Contactez-les</h4>
                <p>N'hésitez pas à appeler pour demander un devis ou des informations complémentaires.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Garages;
