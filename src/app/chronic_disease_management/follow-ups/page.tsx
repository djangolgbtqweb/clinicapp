'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchFollowUps } from 'lib/api';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

type FollowUp = {
  id: number;
  disease: { patient: { first_name: string; last_name: string }; disease_type: string };
  follow_up_date: string;
  notes: string;
};

export default function FollowUpsPage() {
  const [fups, setFups] = useState<FollowUp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const colorCombos = [
    { bg: 'bg-teal-50', border: 'border-teal-500' },
    { bg: 'bg-yellow-50', border: 'border-yellow-500' },
    { bg: 'bg-pink-50', border: 'border-pink-500' },
    { bg: 'bg-indigo-50', border: 'border-indigo-500' },
    { bg: 'bg-green-50', border: 'border-green-500' },
    { bg: 'bg-orange-50', border: 'border-orange-500' },
  ];

  useEffect(() => {
    fetchFollowUps()
      .then(setFups)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center animate-pulse">🔄 Loading follow-ups…</div>;
  if (error) return <div className="p-10 text-center text-red-600">❌ {error}</div>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 md:p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-1xl font-bold text-blue-700">📝 Follow-Up Visits</h1>
       {/* Back to Dashboard */}
       <Link
          href="/chronic_disease_management"
          className="flex items-center text-black hover:text-stone-900 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Chronic Disease Management
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {fups.length > 0 ? (
          fups.map((f, i) => {
            const color = colorCombos[i % colorCombos.length];
            return (
              <motion.div
                key={f.id}
                className={`p-6 rounded-xl shadow-lg border-l-4 overflow-hidden ${color.bg} ${color.border}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {f.disease.patient.first_name} {f.disease.patient.last_name}
                </h3>
                <p className="text-gray-700 mb-1">
                  <strong>Disease:</strong> {f.disease.disease_type}
                </p>
                <p><strong>Follow-Up:</strong> {new Date(f.follow_up_date).toLocaleDateString()}</p>
                <p className="mt-2 text-gray-700"><strong>Notes:</strong> {f.notes}</p>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-full text-center bg-white p-6 rounded-xl shadow border-l-4 border-blue-400 text-gray-600">
            <p className="text-lg font-semibold">📝 No follow-ups scheduled.</p>
            <p>Once you log follow-up appointments, they’ll show up here.</p>
          </div>
        )}
      </div>
    </main>
  );
}
