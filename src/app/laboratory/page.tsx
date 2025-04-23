'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { TestTube, Beaker, FileText } from 'lucide-react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function LaboratoryLanding() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
        {/* Back to Dashboard */}
       <div>
        <Link
          href="/"
          className="flex items-center text-black hover:text-black transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>
      <motion.h1
        className="text-4xl font-extrabold text-center text-stone-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🧪 Laboratory Department
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-8xl mx-auto">
        <Link
          href="/laboratory/lab-tests"
          className="flex flex-col items-start p-6 bg-white rounded-xl shadow hover:shadow-lg transition border-l-4 border-blue-500"
        >
          <TestTube size={32} className="mb-2 text-blue-500" />
          <h2 className="text-xl font-semibold mb-1">Lab Tests</h2>
          <p className="text-gray-600">Order and track all patient lab tests.</p>
        </Link>

        <Link
          href="/laboratory/sample-tracking"
          className="flex flex-col items-start p-6 bg-white rounded-xl shadow hover:shadow-lg transition border-l-4 border-green-500"
        >
          <Beaker size={32} className="mb-2 text-green-500" />
          <h2 className="text-xl font-semibold mb-1">Sample Tracking</h2>
          <p className="text-gray-600">Monitor sample collection & receipt.</p>
        </Link>

        <Link
          href="/laboratory/lab-results"
          className="flex flex-col items-start p-6 bg-white rounded-xl shadow hover:shadow-lg transition border-l-4 border-purple-500"
        >
          <FileText size={32} className="mb-2 text-purple-500" />
          <h2 className="text-xl font-semibold mb-1">Lab Results</h2>
          <p className="text-gray-600">Upload and view patient results.</p>
        </Link>
      </div>
    </main>
  );
}
