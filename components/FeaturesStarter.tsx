/**
 * ✨ FEATURES STARTER - Secțiunea "De ce Vibe Coffee?"
 *
 * Layout bento grid: 1 card mare stânga + 2 carduri mici stivuite dreapta
 */

export default function FeaturesStarter() {
  return (
    <section id="features" className="bg-gray-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* TITLU + SUBTITLU */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            De ce Vibe Coffee?
          </h2>
          <p className="text-lg text-gray-500">
            Experiență unică, ingrediente premium, atmosferă perfectă
          </p>
        </div>

        {/* GRID: 1 card mare stânga + 2 carduri mici dreapta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CARD MARE — stânga, ocupă 2 rânduri */}
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 md:row-span-2 flex flex-col justify-center">
            <div className="text-5xl mb-6">☕</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Cafea de Specialitate
            </h3>
            <p className="text-gray-500 text-lg leading-relaxed">
              Boabe selectate din cele mai renumite regiuni ale lumii, prăjite local și preparate cu grijă de bariștii noștri. Fiecare ceașcă spune o poveste.
            </p>
          </div>

          {/* CARD MIC — sus dreapta */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center">
            <div className="text-4xl mb-4">🥐</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Patiserie Artizanală
            </h3>
            <p className="text-gray-500 leading-relaxed">
              Preparate fresh în fiecare dimineață, din ingrediente naturale și rețete tradiționale.
            </p>
          </div>

          {/* CARD MIC — jos dreapta */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center">
            <div className="text-4xl mb-4">🪑</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Ambient Relaxant
            </h3>
            <p className="text-gray-500 leading-relaxed">
              Un spațiu gândit pentru confort — fie că lucrezi, citești sau pur și simplu te bucuri de momentul tău.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
