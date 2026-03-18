'use client';

/**
 * 🍽️ MENU STARTER - Secțiunea "Meniul Nostru"
 *
 * Categorii cu tab-uri + grid 3 coloane pe desktop, 1 pe mobile
 * Imagini Unsplash per produs (aspect-ratio 4:3, rounded-xl)
 * Tranziție smooth fade-in între categorii (fără flicker)
 */

import { useState, useEffect, useRef } from 'react';

const menuData = {
  Espresso: [
    { name: 'Espresso', price: 12, description: 'Shot dublu de espresso intens', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&auto=format&fit=crop&q=80' },
    { name: 'Americano', price: 14, description: 'Espresso diluat cu apă caldă', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&auto=format&fit=crop&q=80' },
    { name: 'Cappuccino', price: 16, description: 'Espresso cu lapte spumat', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop&q=80' },
    { name: 'Flat White', price: 17, description: 'Microfoam mătăsos peste espresso', image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&auto=format&fit=crop&q=80' },
    { name: 'Latte', price: 17, description: 'Espresso cu lapte abundent', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80' },
    { name: 'Macchiato', price: 14, description: 'Espresso marcat cu puțin lapte', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80' },
  ],
  Specialty: [
    { name: 'Matcha Latte', price: 19, description: 'Ceai verde japonez cu lapte cremos', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&auto=format&fit=crop&q=80' },
    { name: 'Chai Latte', price: 18, description: 'Amestec aromatic de condimente cu lapte', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&auto=format&fit=crop&q=80' },
    { name: 'Turmeric Latte', price: 18, description: 'Golden milk cu lapte și curcuma', image: 'https://images.unsplash.com/photo-1596952954288-16862d37405b?w=600&auto=format&fit=crop&q=80' },
    { name: 'Lavender Latte', price: 20, description: 'Espresso cu sirop de lavandă și lapte', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80' },
    { name: 'Cortado', price: 15, description: 'Espresso cu lapte în proporții egale', image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&auto=format&fit=crop&q=80' },
    { name: 'Pour Over', price: 22, description: 'Metodă manuală pentru aromatică maximă', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80' },
  ],
  'Cold Brew': [
    { name: 'Cold Brew Classic', price: 18, description: 'Cafea la rece, 12 ore de infuzie', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80' },
    { name: 'Cold Brew cu Lapte', price: 20, description: 'Cold brew cu lapte de ovăz', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80' },
    { name: 'Iced Latte', price: 19, description: 'Espresso cu gheață și lapte', image: 'https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=600&auto=format&fit=crop&q=80' },
    { name: 'Iced Matcha', price: 21, description: 'Matcha cu gheață și lapte de migdale', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&auto=format&fit=crop&q=80' },
    { name: 'Nitro Cold Brew', price: 22, description: 'Cold brew cu azot, cremos și plin', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80' },
    { name: 'Cold Brew Tonic', price: 21, description: 'Cold brew cu apă tonică și lămâie', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80' },
  ],
  Patiserie: [
    { name: 'Croissant Simplu', price: 10, description: 'Croissant franțuzesc cu unt și foietaj', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80' },
    { name: 'Croissant Migdale', price: 14, description: 'Umplutură de cremă de migdale', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80' },
    { name: 'Muffin Afine', price: 12, description: 'Muffin pufos cu afine proaspete', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80' },
    { name: 'Cheesecake', price: 18, description: 'Cheesecake cremos cu fructe de pădure', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop&q=80' },
    { name: 'Brownie', price: 14, description: 'Brownie intens de ciocolată neagră', image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&auto=format&fit=crop&q=80' },
    { name: 'Tiramisu', price: 16, description: 'Clasicul desert italian cu espresso', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop&q=80' },
  ],
};

type Category = keyof typeof menuData;
const categories = Object.keys(menuData) as Category[];

export default function MenuStarter() {
  const [activeCategory, setActiveCategory] = useState<Category>('Espresso');
  const [displayedCategory, setDisplayedCategory] = useState<Category>('Espresso');
  const [fading, setFading] = useState(false);

  const switchCategory = (cat: Category) => {
    if (cat === activeCategory) return;
    setFading(true);
    setTimeout(() => {
      setDisplayedCategory(cat);
      setActiveCategory(cat);
      setFading(false);
    }, 150);
  };

  return (
    <section id="meniu" className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* TITLU */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Meniul Nostru
          </h2>
          <p className="text-lg text-gray-500">
            Ingrediente premium, preparate cu pasiune
          </p>
        </div>

        {/* TAB-URI CATEGORII */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => switchCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-amber-500 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID PRODUSE — tranziție fade smooth între categorii */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 transition-opacity duration-150 ${
            fading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {menuData[displayedCategory].map((item) => (
            <div
              key={item.name}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              {/* IMAGINE — aspect ratio 4:3 */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>

              {/* TEXT */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900 text-base leading-tight">
                    {item.name}
                  </h3>
                  <span className="text-amber-500 font-bold text-base ml-2 whitespace-nowrap">
                    {item.price} RON
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
