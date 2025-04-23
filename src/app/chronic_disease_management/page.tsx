'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function ChronicDiseaseManagement() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6 md:p-10">
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
        className="text-3xl font-extrabold text-green-700 mb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🩺 Chronic Disease Management
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-9xl mx-auto">
        {/* Diseases Card - Light Blue */}
        <Link
          href="/chronic_disease_management/disease"
          className="block bg-blue-50 border-l-8 border-blue-500 rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">📋 Diseases</h2>
          <p className="text-gray-700">View and manage all patient disease records.</p>
        </Link>

        {/* Follow-Ups Card - Light Purple */}
        <Link
          href="/chronic_disease_management/follow-ups"
          className="block bg-purple-50 border-l-8 border-purple-500 rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">📝 Follow-Ups</h2>
          <p className="text-gray-700">Track follow-up visits and ongoing care plans.</p>
        </Link>
      </div>
    </main>
  );
}

