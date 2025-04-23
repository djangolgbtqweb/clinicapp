'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fetchLabTests } from 'lib/api';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function LabTestsPage() {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLabTests()
      .then(setTests)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center animate-pulse">🔄 Loading lab tests…</div>;
  if (error)   return <div className="p-10 text-center text-red-600">❌ {error}</div>;

  return (
    <main className="min-h-screen bg-blue-50 p-6 md:p-10">
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
        className="text-2xl font-bold text-blue-800 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📋 All Lab Tests
      </motion.h1>

      <div className="grid gap-4">
        {tests.length > 0 ? tests.map((t, i) => (
          <motion.div
            key={t.id}
            className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <h2 className="text-xl font-semibold">{t.test_name}</h2>
            <p className="text-gray-600">Patient ID: {t.patient}</p>
            <p className="text-gray-600">Cost: ${t.cost}</p>
            <p className="text-sm text-gray-500">Ordered: {new Date(t.ordered_date).toLocaleString()}</p>
            <p className="mt-2"><strong>Status:</strong> {t.status.replace('_',' ')}</p>
          </motion.div>
        )) : (
          <p className="text-center text-gray-600">No lab tests found.</p>
        )}
      </div>
    </main>
  );
}
