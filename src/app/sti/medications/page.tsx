'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchMedications } from 'lib/api';
import { motion } from 'framer-motion';
import { Pill, ChevronLeft, Search } from 'lucide-react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

type Medication = {
  id: number;
  patient_id: number;
  medication_name: string;
  dosage: string;
  duration: string;
};

export default function MedicationsPage() {
  const [meds, setMeds]         = useState<Medication[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMedications()
      .then(setMeds)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-10 text-center animate-pulse">🔄 Loading medications…</p>;
  if (error)   return <p className="p-10 text-center text-red-600">❌ {error}</p>;

  const term = searchTerm.trim().toLowerCase();
  const filtered = meds.filter(m => {
    if (!term) return true;
    return (
      m.patient_id.toString().includes(term) ||
      m.medication_name.toLowerCase().includes(term)
    );
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-white p-6 md:p-10">
      {/* Back to Dashboard */}
      <div>
        <Link
          href="/sti"
          className="flex items-center text-black hover:text-black transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to STIs
        </Link>
      </div>
      {/* Back + Title */}
      <div className="flex items-center mb-6">
        <h1 className="flex-1 text-3xl font-bold text-red-700 text-center">💊 Medications</h1>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-md mx-auto relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Filter by patient # or medication…"
          className="w-full pl-10 pr-4 py-2 rounded-lg border shadow-sm focus:outline-none"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length > 0 ? (
          filtered.map((m, i) => (
            <motion.div
              key={m.id}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <h2 className="text-lg font-semibold mb-1">
                Patient #{m.patient_id} — {m.medication_name}
              </h2>
              <p className="text-gray-600 mb-1"><strong>Dosage:</strong> {m.dosage}</p>
              <p className="text-gray-600"><strong>Duration:</strong> {m.duration}</p>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center p-8 bg-white rounded-xl shadow border-l-4 border-red-300">
            <p className="text-red-500 font-semibold mb-2">No medications match your search</p>
            <p>Try another patient # or medication name.</p>
          </div>
        )}
      </div>
    </main>
  );
}

