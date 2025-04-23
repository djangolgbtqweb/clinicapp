'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fetchSampleTracking } from 'lib/api';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function SampleTrackingPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSampleTracking()
      .then(setItems)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center animate-pulse">🔄 Loading sample tracking…</div>;
  if (error)   return <div className="p-10 text-center text-red-600">❌ {error}</div>;

  return (
    <main className="min-h-screen bg-green-50 p-6 md:p-10">
      {/* Back to Dashboard */}
      <div>
        <Link
          href="/laboratory"
          className="flex items-center text-black hover:text-black transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Laboratory
        </Link>
      </div>
      <motion.h1
        className="text-2xl font-bold text-green-800 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🧪 Sample Tracking
      </motion.h1>

      <div className="grid gap-4">
        {items.length > 0 ? items.map((s, i) => (
          <motion.div
            key={s.id}
            className="bg-white p-4 rounded-xl shadow border-l-4 border-green-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <p><strong>Test ID:</strong> {s.lab_test}</p>
            <p><strong>Collected:</strong> {s.sample_collected_date ? new Date(s.sample_collected_date).toLocaleString() : '—'}</p>
            <p><strong>Received:</strong> {s.sample_received_date ? new Date(s.sample_received_date).toLocaleString() : '—'}</p>
            <p className="mt-1"><strong>Status:</strong> {s.status.replace('_',' ')}</p>
            {s.notes && <p className="mt-2 text-gray-600"><strong>Notes:</strong> {s.notes}</p>}
          </motion.div>
        )) : (
          <p className="text-center text-gray-600">No sample tracking records.</p>
        )}
      </div>
    </main>
  );
}
