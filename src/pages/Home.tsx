
import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Bike, 
  Zap, 
  Wrench, 
  HardHat, 
  Shirt, 
  HandMetal,
  Menu,
  CircleDashed,
  Tag,
  Layers,
  ChevronDown,
  Heart,
  User,
  Plus,
  X
} from 'lucide-react';

// Define the interface for category items
interface CategoryItem {
  icon: React.ElementType;
  label: string;
}

interface HeroProps {
  onSearch?: () => void;
}

const categories: CategoryItem[] = [
  { icon: Bike, label: "Moto" },
  { icon: Zap, label: "Scooter" },
  { icon: Wrench, label: "Accessoires" },
  { icon: HardHat, label: "Casques" },
  { icon: Shirt, label: "Vestes" },
  { icon: HandMetal, label: "Gants" },
];

const tunisianCities = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan",
  "Bizerte", "Béja", "Jendouba", "Le Kef", "Siliana", "Kairouan",
  "Kasserine", "Sidi Bouzid", "Sousse", "Monastir", "Mahdia", "Sfax",
  "Gafsa", "Tozeur", "Kebili", "Gabès", "Médenine", "Tataouine"
];

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState("Bonjour,");
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18) {
      setGreeting("Bonsoir,");
    } else {
      setGreeting("Bonjour,");
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="relative w-full h-[100dvh] md:h-[85vh] flex flex-col md:items-center md:justify-center px-6 md:px-20 lg:px-32 md:pb-20 lg:pb-32 font-sans overflow-hidden bg-orange-50">
      
      {/* Background Container */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Mobile Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
          style={{ backgroundImage: "url('https://www.magma-studio.tn/portfolio2/hero_section-background_mobile.webp')" }}
        />
        {/* Desktop Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
          style={{ backgroundImage: "url('https://magma-studio.tn/portfolio2/-hero-background.webp')" }}
        />

        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(-180deg, #AF2E13 0%, #E65100 100%)',
            opacity: 0.95,
            mixBlendMode: 'multiply',
          }}
        />
      </div>
      
      {/* Header: Logo, Nav and Menu */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-6 md:px-12 md:py-8 z-50">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.reload()}>
          <div className="relative">
            <CircleDashed className="w-8 h-8 md:w-10 md:h-10 text-white transition-transform duration-700 ease-in-out group-hover:rotate-180" />
          </div>
          <span className="text-white font-extrabold text-2xl tracking-tight">
            MotoScoot
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            <a href="#" className="text-white font-medium text-sm hover:text-white/80 transition-colors">Annonces</a>
            <a href="#" className="text-white font-medium text-sm hover:text-white/80 transition-colors">Actualités</a>
            <a href="#" className="text-white font-medium text-sm hover:text-white/80 transition-colors">Garages</a>
            <a href="#" className="text-white font-medium text-sm hover:text-white/80 transition-colors">Conseils</a>
            <a href="#" className="text-white font-medium text-sm hover:text-white/80 transition-colors">Contact</a>
          </div>

          {/* Separator Line */}
          <div className="h-6 w-px bg-white/30"></div>

          {/* Action Buttons */}
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold py-2.5 px-5 rounded-full transition-all backdrop-blur-sm">
              <Plus className="w-4 h-4" />
              <span>Déposer une annonce</span>
            </button>
            <div className="flex items-center gap-4">
              <button className="text-white hover:text-white/80 transition-colors" aria-label="Favoris">
                <Heart className="w-6 h-6" />
              </button>
              <button className="text-white hover:text-white/80 transition-colors" aria-label="Profil">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Hamburger Menu Button (Mobile Only) */}
        <button 
          className="lg:hidden text-white hover:bg-white/10 p-2 rounded-full transition-colors focus:outline-none" 
          aria-label="Menu"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-8 h-8 md:w-9 md:h-9" />
        </button>
      </header>

      {/* Modern Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-fade-in-up overflow-hidden">
          {/* Menu Header */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-white shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="bg-[#E5580B] p-2 rounded-lg">
                <CircleDashed className="w-6 h-6 text-white animate-spin-slow" />
              </div>
              <span className="text-gray-900 font-extrabold text-xl tracking-tight">
                MotoScoot
              </span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Scrollable Navigation Links - Centered */}
          <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-8 justify-center items-center">
            {['Annonces', 'Actualités', 'Garages', 'Conseils', 'Contact'].map((item, idx) => (
              <a 
                key={item} 
                href="#" 
                className="text-3xl font-bold text-gray-900 hover:text-[#E5580B] transition-colors block text-center"
                style={{ animation: `fadeInUp 0.5s ease-out forwards ${idx * 0.1}s`, opacity: 0 }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Sticky Footer Actions */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4 safe-area-bottom">
            <button className="w-full flex items-center justify-center gap-3 bg-[#E5580B] hover:bg-[#c44908] text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-orange-200 active:scale-95 transition-all">
              <Plus className="w-5 h-5" />
              <span>Déposer une annonce</span>
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-[#E5580B] hover:text-[#E5580B] transition-all shadow-sm active:bg-gray-50">
                 <Heart className="w-5 h-5" />
                 <span>Favoris</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-[#E5580B] hover:text-[#E5580B] transition-all shadow-sm active:bg-gray-50">
                 <User className="w-5 h-5" />
                 <span>Profil</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col md:block h-full md:h-auto w-full max-w-7xl mx-auto md:space-y-16 justify-between md:justify-center pt-20 md:pt-0">
        
        {/* Top Section: Headline and Search (Centered but pushed down on mobile) */}
        <div className="flex-1 flex flex-col justify-center items-center w-full md:px-0 space-y-10 md:space-y-16 mt-6 md:mt-44">
          {/* Headline */}
          <div className="w-full max-w-5xl text-left text-white flex flex-col items-start">
            <h1 className="font-extrabold text-6xl md:text-7xl tracking-tight leading-tight mb-2 md:mb-4">
              {greeting}
            </h1>
            <p className="text-lg md:text-2xl font-normal opacity-95">
              Trouvez la moto idéale pour vous en 2 clics. Simple, rapide, efficace.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-5xl bg-white rounded-xl p-2 flex flex-col md:flex-row items-stretch md:items-center">
            
            {/* Input 1: Marque (Brand) */}
            <div className="flex-1 flex items-center px-4 md:px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-gray-100 relative group">
              <Tag className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              <div className="flex-1 relative">
                <select className="w-full bg-transparent outline-none text-gray-700 font-medium appearance-none cursor-pointer pr-8 truncate focus:ring-0 border-none">
                  <option value="" disabled selected>Marque</option>
                  <option value="yamaha">Yamaha</option>
                  <option value="honda">Honda</option>
                  <option value="kawasaki">Kawasaki</option>
                  <option value="bmw">BMW</option>
                  <option value="ducati">Ducati</option>
                  <option value="ktm">KTM</option>
                  <option value="triumph">Triumph</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Input 2: Model */}
            <div className="flex-1 flex items-center px-4 md:px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-gray-100 relative group">
              <Layers className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              <div className="flex-1 relative">
                <select className="w-full bg-transparent outline-none text-gray-700 font-medium appearance-none cursor-pointer pr-8 truncate focus:ring-0 border-none">
                  <option value="" disabled selected>Modèle</option>
                  <option value="mt07">MT-07</option>
                  <option value="z900">Z900</option>
                  <option value="gs1250">R 1250 GS</option>
                  <option value="panigale">Panigale V4</option>
                  <option value="cbr">CBR 1000RR</option>
                  <option value="duke">Duke 390</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Input 3: Location (Tunisian Cities - Custom Dropdown) */}
            <div className="flex-1 flex items-center px-4 md:px-6 py-4 md:py-5 relative" ref={locationRef}>
              <MapPin className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              <div 
                className="flex-1 relative cursor-pointer"
                onClick={() => setIsLocationOpen(!isLocationOpen)}
              >
                <div className={`w-full bg-transparent font-medium pr-8 truncate ${selectedLocation ? 'text-gray-700' : 'text-gray-500'}`}>
                  {selectedLocation || "Ville"}
                </div>
                <ChevronDown className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Custom Absolute Dropdown */}
              {isLocationOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl max-h-64 overflow-y-auto z-50 border border-gray-100 animate-fade-in-up">
                  {tunisianCities.map((city) => (
                    <div 
                      key={city}
                      className={`px-6 py-3 hover:bg-orange-50 cursor-pointer transition-colors text-sm md:text-base ${selectedLocation === city ? 'bg-orange-50 text-[#E5580B] font-semibold' : 'text-gray-700'}`}
                      onClick={() => {
                        setSelectedLocation(city);
                        setIsLocationOpen(false);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <button 
              onClick={onSearch}
              className="bg-[#E5580B] hover:bg-[#c44908] text-white font-bold py-4 px-10 rounded-lg shadow-none transition-transform transform active:scale-95 md:ml-2 mt-2 md:mt-0 flex-shrink-0"
            >
              Rechercher
            </button>
          </div>
        </div>

        {/* Category Icons Slider (Bottom on mobile) */}
        <div className="w-full overflow-x-auto no-scrollbar pb-6 md:pb-0 flex-shrink-0">
          <div className="flex flex-nowrap md:justify-center gap-6 md:gap-10 w-max md:w-full px-6 mx-auto">
            {categories.map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center group cursor-pointer opacity-0 animate-fade-in-up flex-shrink-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/40 bg-white/10 flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-white group-hover:border-white shadow-none">
                  <item.icon className="w-8 h-8 md:w-9 md:h-9 text-white transition-colors duration-300 group-hover:text-[#FF3D00]" />
                </div>
                <span className="text-white font-semibold text-sm md:text-base tracking-wide">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
