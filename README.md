Motoscoot.tn
--------------

Motoscoot.tn est une plateforme web open source développée pour faciliter l’achat et la vente de motos, scooters et accessoires neufs ou d’occasion en Tunisie.
Le projet met l’accent sur la simplicité, la rapidité et la sécurité, avec une interface moderne et une expérience utilisateur optimisée.

prompt: qa the platforme and fix any bugs you find.

Prompt hero : Create a full-width hero section inspired by Superprof.

STYLE:
- Background: gradient orange(#E65100 -> #DD2C14)
- Center all content both horizontally and vertically
- White text, clean and modern fonts
- Rounded white search bar with subtle shadow
- Icon row with circular icon containers and labels beneath

STRUCTURE:

1. Hero Wrapper:
- Full width, full height of the viewport
- Background orange
- Centered content in a column
- Large spacing between elements

2. Headline:
- Large, bold, white text
- Line 1: "Trouvez la moto parfaite"
- Line 2: "qui vous correspond" should wrap to next line if needed
- Center alignment


3. Search Bar:
- White rounded container with shadow
- Inside: 2 input fields + search button
- Input 1 (with icon): placeholder "Matière, sport, musique..."
- Input 2 (with location pin icon): placeholder "Adresse ou ville"
- Button on the right labeled “Rechercher”
- All elements aligned horizontally

4. Category Icons Row:
- Horizontal row of circular icon containers
- Each circle contains an icon (use any default icons)
- Labels under each circle
- Categories: Moto, Scooter, Accesoires, Casques, Vestes, Gants

5. Responsive:
- Everything centered
- Search bar and icons stack gracefully on mobile

Generate clean HTML + TailwindCSS (or Bolt components) respecting this structure and styling.



search bar in the hero section : 

Replace the existing search bar with this new motorcycle search component:

THREE INPUT FIELDS (horizontal on desktop, vertical on mobile):

1. MARQUE (Brand) - Dropdown:
   - Select dropdown with Bike icon (lucide-react) on left
   - Chevron down icon on right
   - Options: "Toutes les marques", Yamaha, Honda, CFMOTO, Kawasaki, Suzuki, Ducati, BMW, KTM, Harley-Davidson, Triumph

2. MODÈLE (Model) - Text input with autocomplete:
   - Text input with Gauge icon (lucide-react) on left
   - Placeholder: "Ex: MT-07, CBR1000RR"
   - Show dropdown suggestions on focus: MT-07, MT-09, CBR1000RR, Ninja 400, GSX-R1000, Panigale V4, R1250GS
   - Filter suggestions as user types

3. VILLE (City) - Dropdown:
   - Select dropdown with MapPin icon (lucide-react) on left
   - Chevron down icon on right
   - Tunisian cities: "Toutes les villes", Tunis, Sfax, Sousse, Kairouan, Bizerte, Gabès, Ariana, Gafsa, Monastir, Ben Arous, Kasserine, Médenine, Nabeul, Tataouine, Beja, Jendouba, Mahdia, Siliana, Manouba, Kébili, Tozeur, Zaghouan, Sidi Bouzid, La Marsa, Hammamet

SEARCH BUTTON:
   - Blue button (bg-blue-600) with Search icon
   - Desktop: positioned at end of row
   - Mobile: full-width button below inputs

STYLING:
   - All inputs: h-14 (56px), rounded-xl, border-2 border-gray-300
   - Focus: ring-4 ring-blue-500 with 30% opacity + blue-500 border
   - Icons: w-5 h-5, text-gray-400, absolute left-4
   - Labels: text-sm font-semibold, above each input
   - Button: shadow-md, hover:shadow-lg

MOBILE (<768px):
   - Stack vertically with gap-3
   - Add "Effacer" (Clear) button when fields have values
   - Clear + Search buttons side by side at bottom

DESKTOP (≥768px):
   - Horizontal flex layout
   - Each field: flex-1
   - Search button at the end

ACCESSIBILITY:
   - Labels with htmlFor matching input ids
   - ARIA labels and descriptions
   - role="search" wrapper
   - Keyboard navigation (Enter moves to next field)
   - Screen reader support

Use React with useState, useRef, and useEffect for mobile detection. Use Tailwind CSS. Import icons from lucide-react.