'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchEducationMaterials } from 'lib/api';
import { motion } from 'framer-motion';
import { BookOpen, ChevronLeft } from 'lucide-react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function EducationMaterialsPage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEducationMaterials()
      .then(setDocs)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-10 text-center animate-pulse">🔄 Loading education materials…</p>;
  if (error)   return <p className="p-10 text-center text-red-600">❌ {error}</p>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6 md:p-10">
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
      <div className="flex items-center mb-8">
        <h1 className="flex-1 text-3xl font-bold text-purple-700 text-center">📚 Education Materials</h1>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        {docs.map((d, i) => (
          <motion.div
            key={d.id}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <h2 className="text-xl font-semibold mb-1">{d.title}</h2>
            <p className="text-gray-600 mb-2 italic">
              Uploaded on {new Date(d.upload_date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 line-clamp-4">{d.content}</p>
          </motion.div>
        ))}

        {docs.length === 0 && (
          <div className="text-center p-8 bg-white rounded-xl shadow border-l-4 border-purple-300">
            <p className="text-purple-500 font-semibold mb-2">No materials yet</p>
            <p>Upload some patient education documents.</p>
          </div>
        )}
      </div>
    </main>
  );
}
