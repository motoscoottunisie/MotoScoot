import React, { useState, useEffect } from 'react';
import { Upload, X, Check } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { mockListings } from '../data/mockData';
import CheckboxPill from '../components/ui/CheckboxPill';

const DepositListing = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    brand: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    conditions: [],
    title: '',
    description: '',
    location: '',
    images: [],
    options: []
  });
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);
  const [showCustomBrand, setShowCustomBrand] = useState(false);
  const [customBrand, setCustomBrand] = useState('');
  const [modelSuggestions, setModelSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const steps = [
    { number: 1, title: 'Type de véhicule', description: 'Catégorie et marque' },
    { number: 2, title: 'Caractéristiques', description: 'Détails techniques' },
    { number: 3, title: 'Description', description: 'Titre et description' },
    { number: 4, title: 'Photos', description: 'Images du véhicule' },
    { number: 5, title: 'Finalisation', description: 'Prix et localisation' }
  ];

  const categories = [
    { value: 'moto', label: 'Moto' },
    { value: 'scooter', label: 'Scooter' },
    { value: 'accessoires', label: 'Accessoires' }
  ];

  const brandsByCategory = {
    moto: [
      'Honda', 'Yamaha', 'Suzuki', 'Kawasaki',
      'BMW', 'Ducati', 'KTM', 'Triumph', 'Aprilia', 'Husqvarna', 'MV Agusta', 'Moto Guzzi',
      'Harley-Davidson', 'Indian', 'Royal Enfield',
      'CFMoto', 'Voge', 'QJ Motor', 'Benelli', 'Zontes',
      'Lifan', 'Loncin', 'Zongshen', 'Shineray', 'Mash', 'Keeway', 'Hanway', 'Brixton',
      'Skyteam', 'Masai', 'Bullit', 'Regal Raptor',
      'Apollo Motors', 'YCF', 'Taotao', 'BSE',
      'Autre'
    ],
    scooter: [
      'Vespa', 'Piaggio', 'Peugeot', 'Aprilia', 'Gilera', 'MBK',
      'Yamaha', 'Honda', 'Suzuki',
      'Kymco', 'SYM',
      'NIU', 'Super Soco', 'Yadea', 'Sunra', 'Silence',
      'Rider', 'Tilgreen', 'Vmoto', 'Segway',
      'CFMoto', 'Zontes', 'Lifan', 'Zongshen', 'Baotian', 'Keeway',
      'Generic', 'Znen', 'Masaï', 'Jincheng', 'Kinroad', 'LML', 'TNT Motor',
      'Daelim', 'Dayang', 'Benzhou',
      'Autre'
    ],
    accessoires: [
      'Casques',
      'Vêtements (blouson, pantalon, gants)',
      'Bottes et chaussures',
      'Protection (dorsale, genouillères)',
      'Bagagerie (sacoches, top case)',
      'Électronique (GPS, intercom)',
      'Entretien et pièces',
      'Autre'
    ]
  };

  const modelsByBrand = {
    Honda: ['CB650R', 'CBR650R', 'CB500F', 'CB500X', 'CBR500R', 'CB125R', 'CBR125R', 'Africa Twin', 'Gold Wing', 'Forza 750', 'PCX 125', 'SH125', 'SH150', 'Vision 110'],
    Yamaha: ['MT-09', 'MT-07', 'MT-03', 'YZF-R1', 'YZF-R6', 'YZF-R7', 'YZF-R3', 'YZF-R125', 'Tracer 9', 'Tracer 7', 'Ténéré 700', 'XSR700', 'XSR900', 'TMAX 560', 'XMAX 300', 'NMAX 125'],
    Suzuki: ['GSX-S1000', 'GSX-S750', 'GSX-R1000', 'GSX-R750', 'GSX-R600', 'V-Strom 1050', 'V-Strom 650', 'SV650', 'GSX-S125', 'Burgman 400', 'Burgman 125'],
    Kawasaki: ['Z900', 'Z650', 'Z400', 'Ninja 1000SX', 'Ninja 650', 'Ninja 400', 'Ninja ZX-10R', 'Ninja ZX-6R', 'Versys 650', 'Versys 1000', 'W800', 'Z125'],
    BMW: ['S1000RR', 'S1000R', 'F900R', 'F900XR', 'F850GS', 'F750GS', 'R1250GS', 'R1250RT', 'R nineT', 'G310R', 'G310GS', 'C400X', 'C400GT'],
    Ducati: ['Panigale V4', 'Panigale V2', 'Monster', 'Monster 821', 'Multistrada V4', 'Multistrada 950', 'Scrambler', 'SuperSport', 'Diavel', 'Hypermotard'],
    KTM: ['1290 Super Duke R', '890 Duke R', '790 Duke', '690 Duke', '390 Duke', '250 Duke', '125 Duke', '1290 Super Adventure', '890 Adventure', 'RC 390', 'RC 125'],
    Triumph: ['Street Triple', 'Speed Triple', 'Tiger 900', 'Tiger 1200', 'Bonneville T120', 'Scrambler 1200', 'Rocket 3', 'Trident 660', 'Street Scrambler'],
    'Harley-Davidson': ['Sportster S', 'Iron 883', 'Forty-Eight', 'Street Bob', 'Fat Boy', 'Road King', 'Street Glide', 'Road Glide', 'Pan America 1250'],
    Vespa: ['Primavera 50', 'Primavera 125', 'Sprint 125', 'GTS 300', 'GTS Super 300', 'Elettrica'],
    Piaggio: ['Liberty 50', 'Liberty 125', 'Medley 125', 'Beverly 300', 'Beverly 400', 'MP3 300', 'MP3 500'],
    Peugeot: ['Kisbee 50', 'Django 125', 'Django 150', 'Metropolis 400', 'Satelis 125', 'Speedfight 4'],
    Kymco: ['Agility 50', 'Agility 125', 'Like 125', 'X-Town 125', 'X-Town 300', 'AK 550', 'Downtown 350'],
    NIU: ['MQi GT', 'MQi+ Sport', 'NQi GTS', 'UQi+ Pro', 'KQi3'],
    'Royal Enfield': ['Meteor 350', 'Classic 350', 'Himalayan', 'Continental GT 650', 'Interceptor 650', 'Hunter 350']
  };

  const conditions = [
    { value: 'neuf', label: 'Neuf' },
    { value: 'etat_neuf', label: 'État neuf' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'bon', label: 'Bon' },
    { value: 'correct', label: 'Correct' },
    { value: 'nous_dedouanes', label: 'Nous dédouanes' },
    { value: 'rs', label: 'RS' },
    { value: 'pieces_manquantes', label: 'Pièces manquantes' },
    { value: 'sans_papier', label: 'Sans papier' }
  ];

  const availableOptions = [
    'ABS',
    'Contrôle traction',
    'Éclairage LED',
    'Tableau de bord TFT',
    'Bluetooth',
    'Quickshifter',
    'Modes de conduite',
    'Régulateur de vitesse',
    'Poignées chauffantes',
    'Selle chauffante',
    'Anti-wheelie',
    'Suspension électronique',
    'Freinage d\'urgence automatique',
    'Système de navigation',
    'Prise USB',
    'Alarme',
    'Top case',
    'Sacoches latérales',
    'Bulle haute',
    'Protège-mains',
    'Sabot moteur',
    'Échappement sport'
  ];

  const gouvernorats = [
    'Tunis',
    'Ariana',
    'Ben Arous',
    'Manouba',
    'Nabeul',
    'Zaghouan',
    'Bizerte',
    'Béja',
    'Jendouba',
    'Le Kef',
    'Siliana',
    'Sousse',
    'Monastir',
    'Mahdia',
    'Sfax',
    'Kairouan',
    'Kasserine',
    'Sidi Bouzid',
    'Gabès',
    'Médenine',
    'Tataouine',
    'Gafsa',
    'Tozeur',
    'Kebili'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'category') {
      setFormData(prev => ({ ...prev, brand: '', model: '', options: [] }));
      setShowCustomBrand(false);
      setCustomBrand('');
      setModelSuggestions([]);
      setShowSuggestions(false);
    }
    
    if (field === 'brand') {
      setFormData(prev => ({ ...prev, model: '' }));
      setModelSuggestions([]);
      setShowSuggestions(false);
      if (value === 'Autre') {
        setShowCustomBrand(true);
      } else {
        setShowCustomBrand(false);
        setCustomBrand('');
      }
    }

    if (field === 'model') {
      const brand = showCustomBrand ? customBrand : formData.brand;
      if (brand && modelsByBrand[brand] && value) {
        const filtered = modelsByBrand[brand].filter(model =>
          model.toLowerCase().includes(value.toLowerCase())
        );
        setModelSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      } else {
        setModelSuggestions([]);
        setShowSuggestions(false);
      }
    }
  };

  // Auto-generate title when moving to step 3
  const generateTitle = () => {
    const brand = showCustomBrand ? customBrand : formData.brand;
    if (brand && formData.model && !formData.title) {
      const autoTitle = `${brand} ${formData.model}`;
      setFormData(prev => ({ ...prev, title: autoTitle }));
    }
  };

  const selectModel = (model) => {
    setFormData(prev => ({ ...prev, model }));
    setShowSuggestions(false);
  };

  const toggleOption = (option) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.includes(option)
        ? prev.options.filter(o => o !== option)
        : [...prev.options, option]
    }));
  };

  const handleImageUpload = (files) => {
    if (files) {
      const newImages = Array.from(files).slice(0, 8 - formData.images.length);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      // Auto-generate title when entering step 3
      if (currentStep === 2) {
        generateTitle();
      }
      // Calculate suggested price when entering step 5
      if (currentStep === 4) {
        calculateSuggestedPrice();
      }
    }
  };

  const calculateSuggestedPrice = () => {
    if (!formData.brand || !formData.model) {
      setSuggestedPrice(null);
      return;
    }

    const similarListings = mockListings.filter(listing =>
      listing.brand.toLowerCase() === formData.brand.toLowerCase() &&
      listing.model.toLowerCase() === formData.model.toLowerCase()
    );

    if (similarListings.length === 0) {
      setSuggestedPrice(null);
      return;
    }

    const prices = similarListings.map(listing => listing.price);

    prices.sort((a, b) => a - b);

    let median: number;
    const mid = Math.floor(prices.length / 2);

    if (prices.length % 2 === 0) {
      median = (prices[mid - 1] + prices[mid]) / 2;
    } else {
      median = prices[mid];
    }

    if (formData.year) {
      const avgYear = similarListings.reduce((sum, l) => sum + l.year, 0) / similarListings.length;
      const yearDiff = parseInt(formData.year) - avgYear;
      const yearAdjustment = yearDiff * 0.05;
      median = median * (1 + yearAdjustment);
    }

    if (formData.mileage) {
      const avgMileage = similarListings.reduce((sum, l) => sum + l.mileage, 0) / similarListings.length;
      const mileageDiff = parseInt(formData.mileage) - avgMileage;
      const mileageAdjustment = (mileageDiff / 10000) * -0.02;
      median = median * (1 + mileageAdjustment);
    }

    setSuggestedPrice(Math.round(median));
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.category && formData.brand && (!showCustomBrand || customBrand.trim());
      case 2:
        return formData.model && formData.conditions.length > 0 && (formData.category === 'accessoires' || (formData.year && formData.mileage));
      case 3:
        return formData.title;
      case 4:
        return formData.images.length > 0;
      case 5:
        return formData.price && formData.location;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    alert('Annonce déposée avec succès !');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={[{ label: 'Déposer une annonce' }]} />
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Déposer une annonce</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep > step.number 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : currentStep === step.number 
                      ? 'bg-orange-600 border-orange-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.number ? (
                    <Check size={16} />
                  ) : (
                    step.number
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-12 lg:w-24 h-1 mx-2 ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Catégorie *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {categories.map(category => (
                    <button
                      key={category.value}
                      onClick={() => handleInputChange('category', category.value)}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        formData.category === category.value
                          ? 'border-orange-600 bg-orange-50 text-orange-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.category === 'accessoires' ? 'Type d\'accessoire *' : 'Marque *'}
                </label>
                <select
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  disabled={!formData.category}
                >
                  <option value="">
                    {formData.category === 'accessoires' 
                      ? 'Sélectionner un type' 
                      : 'Sélectionner une marque'}
                  </option>
                  {formData.category && brandsByCategory[formData.category].map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
                
                {showCustomBrand && (
                  <input
                    type="text"
                    value={customBrand}
                    onChange={(e) => setCustomBrand(e.target.value)}
                    placeholder="Entrez la marque"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modèle *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    onFocus={() => {
                      const brand = showCustomBrand ? customBrand : formData.brand;
                      if (brand && modelsByBrand[brand]) {
                        setModelSuggestions(modelsByBrand[brand]);
                        setShowSuggestions(true);
                      }
                    }}
                    placeholder="ex: CB650R, YZF-R6..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  {showSuggestions && modelSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {modelSuggestions.map((model, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => selectModel(model)}
                          className="w-full text-left px-4 py-2 hover:bg-orange-50 text-sm text-gray-700 transition-colors"
                        >
                          {model}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  État *
                </label>
                <div className="flex flex-wrap gap-2">
                  {conditions.map(condition => (
                    <CheckboxPill
                      key={condition.value}
                      label={condition.label}
                      checked={formData.conditions.includes(condition.value)}
                      onChange={() => {
                        setFormData(prev => ({
                          ...prev,
                          conditions: prev.conditions.includes(condition.value)
                            ? prev.conditions.filter(c => c !== condition.value)
                            : [...prev.conditions, condition.value]
                        }));
                      }}
                    />
                  ))}
                </div>
                {formData.conditions.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {formData.conditions.length} état(s) sélectionné(s)
                  </p>
                )}
              </div>

              {formData.category !== 'accessoires' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Année *
                      </label>
                      <select
                        value={formData.year}
                        onChange={(e) => handleInputChange('year', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">Sélectionner une année</option>
                        {Array.from({ length: new Date().getFullYear() - 1979 }, (_, i) => new Date().getFullYear() - i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kilométrage *
                      </label>
                      <input
                        type="number"
                        value={formData.mileage}
                        onChange={(e) => handleInputChange('mileage', e.target.value)}
                        placeholder="en km"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Options et équipements (optionnel)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableOptions.map(option => (
                        <CheckboxPill
                          key={option}
                          label={option}
                          checked={formData.options.includes(option)}
                          onChange={() => toggleOption(option)}
                        />
                      ))}
                    </div>
                    {formData.options.length > 0 && (
                      <p className="text-sm text-gray-600 mt-2">
                        {formData.options.length} option(s) sélectionnée(s)
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de l'annonce *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="ex: Honda CB650R 2021 - Excellent état"
                  maxLength={100}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.title.length}/100 caractères
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (optionnel)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Décrivez votre véhicule, son état, les options, l'historique d'entretien..."
                  rows={6}
                  maxLength={1000}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.description.length}/1000 caractères
                </p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Photos de votre véhicule * (minimum 1, maximum 8)
                </label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                  <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-gray-600 mb-2">
                    Glissez vos photos ici ou cliquez pour les sélectionner
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    Choisir des fichiers
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    Formats acceptés: JPG, PNG, WebP (max 5Mo par photo)
                  </p>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix de vente *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-16 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <span className="absolute right-3 top-2 text-gray-500">DT</span>
                </div>
                {suggestedPrice !== null && (
                  <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Prix marchand estimé :</span> {suggestedPrice.toLocaleString('fr-FR')} DT
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Basé sur {formData.model ? `la moyenne des annonces pour ${formData.brand} ${formData.model}` : 'les annonces similaires'}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gouvernorat *
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Sélectionner un gouvernorat</option>
                  {gouvernorats.map(gov => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Catégorie:</span> {formData.category}</div>
                  <div><span className="font-medium">{formData.category === 'accessoires' ? 'Type' : 'Marque'}:</span> {showCustomBrand ? customBrand : formData.brand}</div>
                  <div><span className="font-medium">Modèle:</span> {formData.model}</div>
                  <div><span className="font-medium">Titre:</span> {formData.title}</div>
                  <div><span className="font-medium">Prix:</span> {formData.price} DT</div>
                  <div><span className="font-medium">Photos:</span> {formData.images.length}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={previousStep}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Précédent
          </button>

          {currentStep < 5 ? (
            <button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Suivant
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Publier l'annonce
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepositListing;