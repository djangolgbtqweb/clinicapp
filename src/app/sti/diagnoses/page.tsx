'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchDiagnoses } from 'lib/api';
import { motion } from 'framer-motion';
import { Search, ChevronLeft } from 'lucide-react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function DiagnosesPage() {
  const [diags, setDiags]         = useState<any[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDiagnoses()
      .then(setDiags)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-10 text-center animate-pulse">🔄 Loading diagnoses…</p>;
  if (error)   return <p className="p-10 text-center text-red-600">❌ {error}</p>;

  // filter by patient_id or sti_type
  const filtered = diags.filter(d => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      d.patient_id.toString().includes(term) ||
      d.sti_type.toLowerCase().includes(term)
    );
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-6 md:p-10">
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
      <div className="flex items-center mb-8">
        <h1 className="flex-1 text-3xl font-bold text-pink-700 text-center">📋 All Diagnoses</h1>
      </div>

      {/* Search Input */}
      <div className="mb-6 max-w-md mx-auto relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by ID or type…"
          className="w-full pl-10 pr-4 py-2 rounded-lg border shadow-sm focus:outline-none"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((d, i) => (
          <motion.div
            key={d.id}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <p className="text-gray-600 mb-1">
              <strong>Patient ID:</strong> {d.patient_id}
            </p>
            <h2 className="text-xl font-semibold mb-2">{d.sti_type}</h2>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Diagnosed:</strong>{' '}
              {new Date(d.diagnosis_date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 line-clamp-3">{d.symptoms}</p>
            {d.notes && <p className="mt-2 text-gray-500 italic">💡 {d.notes}</p>}
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center p-8 bg-white rounded-xl shadow border-l-4 border-pink-300">
            <p className="text-pink-500 font-semibold mb-2">No diagnoses match your search</p>
            <p>Try another ID or STI type.</p>
          </div>
        )}
      </div>
    </main>
  );
}
