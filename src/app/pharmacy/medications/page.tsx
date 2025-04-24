// src/app/pharmacy/medications/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPharmacyMedications, fetchTotalCost } from 'lib/api';
import { motion } from 'framer-motion';
import { ArrowLeft, Pill } from 'lucide-react';

type Med = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price_per_unit: string | number;
  total_cost?: string | number;
};

export default function MedicationsPage() {
  const [meds, setMeds] = useState<Med[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPharmacyMedications();
        await Promise.all(
          data.map(async (m: Med) => {
            const { total_cost } = await fetchTotalCost(m.id);
            m.total_cost = total_cost;
          })
        );
        setMeds(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // filter by name or qty
  const filtered = meds.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.quantity.toString().includes(search)
  );

  if (loading)
    return <p className="p-10 text-center animate-pulse">🔄 Loading medications…</p>;
  if (error)
    return <p className="p-10 text-center text-red-600">❌ {error}</p>;

  return (
    <main className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* subtle pill-pattern background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/images/pill-pattern.svg')",
          backgroundRepeat: 'repeat',
        }}
      />
      <div className="relative z-10 p-8 space-y-6">
        <Link
          href="/pharmacy"
          className="inline-flex items-center text-gray-700 hover:text-blue-600 transition"
        >
          <ArrowLeft className="mr-2" /> Back to Pharmacy
        </Link>

        <h1 className="text-4xl font-extrabold text-gray-800 text-center">
          💊 Medications
        </h1>

        {/* Glass-morphic search bar */}
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search by name or qty…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="
              w-full px-4 py-2 rounded-full
              bg-white/40 backdrop-blur-sm border border-black/50
              placeholder-gray-600 text-gray-900
              focus:outline-none focus:ring-2 focus:ring-blue-300
            "
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length > 0 ? (
            filtered.map((m, i) => {
              const unitPrice = Number(m.price_per_unit);
              const total     = m.total_cost !== undefined ? Number(m.total_cost) : 0;
              // pick an accent color per card
              const accents = ['from-indigo-400 to-purple-500','from-teal-400 to-blue-500','from-pink-400 to-red-500'];
              const gradient = accents[i % accents.length];

              return (
                <motion.div
                  key={m.id}
                  className={`
                    relative overflow-hidden rounded-3xl p-6
                    bg-gradient-to-tr ${gradient} 
                    text-white shadow-2xl
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  {/* giant semi-transparent pill icon */}
                  <Pill
                    size={120}
                    className="absolute -top-8 -right-8 text-white/20"
                  />

                  <h2 className="text-2xl font-bold mb-1">{m.name}</h2>
                  <p className="text-sm mb-4 line-clamp-3">{m.description}</p>
                  
                  <div className="flex justify-between font-semibold">
                    <span>Qty: {m.quantity}</span>
                    <span>${isNaN(unitPrice) ? '—' : unitPrice.toFixed(2)}</span>
                  </div>
                  <div className="mt-2 text-right text-lg">
                    Total: {isNaN(total) ? '—' : `$${total.toFixed(2)}`}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500">No medications match your search.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
