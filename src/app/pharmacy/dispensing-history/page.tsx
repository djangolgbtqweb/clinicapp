// src/app/pharmacy/dispensing-history/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchDispensingHistory } from 'lib/api';
import { motion } from 'framer-motion';
import { ArrowLeft, PackageCheck } from 'lucide-react';

type History = {
  id: number;
  prescription: number;
  dispense_date: string;
  quantity_dispensed: number;
};

export default function DispensingHistoryPage() {
  const [list, setList] = useState<History[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]       = useState('');
  const [filter, setFilter]     = useState('');

  useEffect(() => {
    fetchDispensingHistory()
      .then(setList)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = list.filter(h =>
    h.prescription.toString().includes(filter)
  );

  if (loading)
    return <p className="p-10 text-center animate-pulse">🔄 Loading dispensing history…</p>;
  if (error)
    return <p className="p-10 text-center text-red-600">❌ {error}</p>;

  return (
    <main className="relative min-h-screen bg-gray-100 overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-10 bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: "url('/images/pharmacy-pattern.svg')"
        }}
      />

      {/* Page content */}
      <div className="relative z-10 p-8 space-y-6">
        <Link
          href="/pharmacy"
          className="inline-flex items-center text-gray-700 hover:text-purple-600 transition"
        >
          <ArrowLeft className="mr-2" /> Back to Pharmacy
        </Link>

        <h1 className="text-4xl font-extrabold text-purple-700 text-center">
          📦 Dispensing History
        </h1>

        {/* Filter */}
        <div className="max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Filter by prescription #…"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="
              w-full px-4 py-2 rounded-full
              bg-white/30 backdrop-blur-sm border border-white/50
              placeholder-gray-600 text-gray-900
              focus:outline-none focus:ring-2 focus:ring-purple-300
            "
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length > 0 ? (
            filtered.map((h, i) => (
              <motion.div
                key={h.id}
                className="
                  relative overflow-hidden rounded-2xl p-6
                  bg-white/20 backdrop-blur-lg border border-white/30
                  shadow-2xl
                "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.03 }}
              >
                {/* Watermark */}
                <PackageCheck
                  size={120}
                  className="absolute bottom-[-20px] right-[-20px] text-purple-300/20"
                />

                <h2 className="text-2xl font-bold text-purple-800 mb-2">
                  Prescription #{h.prescription}
                </h2>
                <p className="text-gray-700 mb-1">
                  <strong>Date:</strong>{' '}
                  {new Date(h.dispense_date).toLocaleString()}
                </p>
                <p className="text-gray-700">
                  <strong>Qty Dispensed:</strong> {h.quantity_dispensed}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500">No records match your filter.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

