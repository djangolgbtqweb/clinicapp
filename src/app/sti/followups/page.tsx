'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchFollowups } from 'lib/api';
import { motion } from 'framer-motion';
import { Search, ChevronLeft } from 'lucide-react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function FollowUpsPage() {
  const [fups, setFups]         = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFollowups()
      .then(setFups)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-10 text-center animate-pulse">🔄 Loading follow-ups…</p>;
  if (error)   return <p className="p-10 text-center text-red-600">❌ {error}</p>;

  // filter by patient_id or sti_type
  const filtered = fups.filter(f => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      f.patient_id.toString().includes(term) ||
      f.sti_type.toLowerCase().includes(term)
    );
  });

  return (
    <main className="min-h-screen bg-green-50 p-6 md:p-10">
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
        <h1 className="flex-1 text-3xl font-bold text-green-700 text-center">🩺 Follow-Up Visits</h1>
      </div>

      {/* Search Input */}
      <div className="mb-8 max-w-md mx-auto relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Filter by patient # or STI type…"
          className="w-full pl-10 pr-4 py-2 rounded-lg border shadow-sm focus:outline-none"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length > 0 ? (
          filtered.map((f, i) => (
            <motion.div
              key={f.id}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <h2 className="text-lg font-semibold mb-1">
                Patient #{f.patient_id} ― {f.sti_type}
              </h2>
              <p className="text-gray-600 mb-1">
                <strong>Date:</strong> {new Date(f.follow_up_date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">{f.notes}</p>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center p-8 bg-white rounded-xl shadow border-l-4 border-green-300">
            <p className="text-green-500 font-semibold mb-2">No follow-ups match your search</p>
            <p>Try another patient ID or STI type.</p>
          </div>
        )}
      </div>
    </main>
  );
}
