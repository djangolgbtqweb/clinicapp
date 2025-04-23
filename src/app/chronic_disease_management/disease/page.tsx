'use client';
import { useEffect, useState } from 'react';
import { fetchDiseases } from 'lib/api';  // Ensure this includes diagnosis_date, status, and notes
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function DiseasesPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const colorCombos = [
    { bg: 'bg-emerald-50', border: 'border-emerald-500' },
    { bg: 'bg-sky-50', border: 'border-sky-500' },
    { bg: 'bg-lime-50', border: 'border-lime-500' },
    { bg: 'bg-rose-50', border: 'border-rose-500' },
    { bg: 'bg-violet-50', border: 'border-violet-500' },
    { bg: 'bg-yellow-50', border: 'border-yellow-500' },
  ];

  useEffect(() => {
    (async () => {
      try {
        setList(await fetchDiseases());
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return <div className="p-10 text-center text-gray-600 animate-pulse">🔄 Fetching diseases…</div>;
  if (error)
    return <div className="p-10 text-center text-red-600">❌ {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 p-6 md:p-10 space-y-8">
       {/* Back to Dashboard */}
        <Link
          href="/chronic_disease_management"
          className="flex items-center text-black hover:text-stone-900 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Chronic Disease Management
        </Link>

      <motion.h1
        className="text-3xl font-extrabold text-center text-red-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📋 All Diseases
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.length > 0 ? (
          list.map((d: any, i: number) => {
            const color = colorCombos[i % colorCombos.length];

            return (
              <motion.div
                key={d.id}
                className={`p-6 rounded-xl shadow-lg border-l-4 overflow-hidden ${color.bg} ${color.border}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {d.patient.first_name} {d.patient.last_name}
                </h3>
                <p><strong>Disease:</strong> {d.disease_type}</p>

                {/* Handle Diagnosis Date */}
                <p>
                  <strong>Diagnosed:</strong> 
                  {d.diagnosis_date ? new Date(d.diagnosis_date).toLocaleDateString() : 'Date not available'}
                </p>

                {/* Handle Status */}
                <p><strong>Status:</strong> {d.status || 'Status not available'}</p>

                {/* Adding Notes (if available) */}
                {d.notes && (
                  <p className="mt-2 text-sm text-gray-700"><strong>Notes:</strong> {d.notes}</p>
                )}

                <p className="text-sm text-gray-700 mt-2">{d.treatment_plan}</p>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-full text-center p-6 bg-white rounded-xl shadow border-l-4 border-red-400">
            <p className="text-red-500 font-semibold mb-2">📋 No diseases recorded</p>
            <p>Please add a disease record via your clinic EMR to see it here.</p>
          </div>
        )}
      </div>
    </div>
  );
}


