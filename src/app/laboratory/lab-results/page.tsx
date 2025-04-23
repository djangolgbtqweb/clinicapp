'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fetchLabResults } from 'lib/api';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function LabResultsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLabResults()
      .then(setResults)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center animate-pulse">🔄 Loading lab results…</div>;
  if (error)   return <div className="p-10 text-center text-red-600">❌ {error}</div>;

  return (
    <main className="min-h-screen bg-purple-50 p-6 md:p-10">
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
        className="text-2xl font-bold text-purple-800 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📄 Lab Results
      </motion.h1>

      <div className="grid gap-4">
        {results.length > 0 ? results.map((r, i) => (
          <motion.div
            key={r.id}
            className="bg-white p-4 rounded-xl shadow border-l-4 border-purple-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <p><strong>Test ID:</strong> {r.lab_test}</p>
            <p><strong>Result Date:</strong> {new Date(r.result_date).toLocaleString()}</p>
            {r.notes && <p className="mt-2 text-gray-600"><strong>Notes:</strong> {r.notes}</p>}
            {r.result_file && (
              <a
                href={r.result_file}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-blue-600 underline"
              >

              </a>
            )}
          </motion.div>
        )) : (
          <p className="text-center text-gray-600">No lab results available.</p>
        )}
      </div>
    </main>
  );
}
