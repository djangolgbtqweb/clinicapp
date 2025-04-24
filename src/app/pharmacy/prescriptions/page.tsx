// src/app/pharmacy/prescriptions/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPrescriptions } from 'lib/api';
import { motion } from 'framer-motion';
import { ArrowLeft, ClipboardList } from 'lucide-react';

type Rx = {
  id: number;
  patient: number;
  patient_name?: string;
  medication: number;
  medication_name: string;
  dose: string;
  prescribed_date: string;
};

export default function PrescriptionsPage() {
  const [list, setList]     = useState<Rx[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [search, setSearch]   = useState('');

  useEffect(() => {
    fetchPrescriptions()
      .then(setList)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = list.filter(rx =>
    rx.patient.toString().includes(search) ||
    rx.medication_name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return <p className="p-10 text-center animate-pulse">🔄 Loading prescriptions…</p>;
  if (error)
    return <p className="p-10 text-center text-red-600">❌ {error}</p>;

  return (
    <main className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/images/prescription-pattern.svg')",
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="relative z-10 p-8 space-y-6">
        <Link
          href="/pharmacy"
          className="inline-flex items-center text-gray-700 hover:text-green-600 transition"
        >
          <ArrowLeft className="mr-2" /> Back to Pharmacy
        </Link>

        <h1 className="text-4xl font-extrabold text-gray-800 text-center">
          📋 Prescriptions
        </h1>

        {/* Glass-morphic search */}
        <div className="max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Filter by patient # or medication…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="
              w-full px-4 py-2 rounded-full
              bg-white/30 backdrop-blur-sm border border-white/50
              placeholder-gray-600 text-gray-900
              focus:outline-none focus:ring-2 focus:ring-green-300
            "
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length > 0 ? (
            filtered.map((p, i) => {
              const gradients = [
                'from-green-300 to-blue-400',
                'from-indigo-300 to-purple-400',
                'from-pink-300 to-red-400',
              ];
              const gradient = gradients[i % gradients.length];

              return (
                <motion.div
                  key={p.id}
                  className={`
                    relative overflow-hidden rounded-3xl p-6
                    bg-gradient-to-br ${gradient}
                    text-white shadow-2xl
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, rotate: 0.5 }}
                >
                  {/* Watermark icon */}
                  <ClipboardList
                    size={120}
                    className="absolute bottom-[-20px] right-[-20px] text-white/20"
                  />

                  <h2 className="text-2xl font-bold mb-1">
                    Patient #{p.patient} {p.patient_name && `(${p.patient_name})`}
                  </h2>
                  <p className="text-lg mb-2">{p.medication_name}</p>
                  <p className="text-sm mb-1">
                    <strong>Dose:</strong> {p.dose}
                  </p>
                  <p className="text-xs opacity-80">
                    <strong>Prescribed:</strong>{' '}
                    {new Date(p.prescribed_date).toLocaleString()}
                  </p>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500">No prescriptions match your search.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
