'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ClipboardList, Pill, BookOpen, Activity } from 'lucide-react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function STIManagementLanding() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-6 md:p-12">
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
        className="text-4xl md:text-5xl font-extrabold text-center text-pink-700 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🦠 STI Clinic Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto">
        <Link
          href="/sti/diagnoses"
          className="block bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition border-l-8 border-pink-500"
        >
          <ClipboardList className="text-pink-500 mb-4" size={36} />
          <h2 className="text-xl font-bold">Diagnoses</h2>
          <p className="mt-2 text-gray-600">View all STI diagnoses</p>
        </Link>

        <Link
          href="/sti/medications"
          className="block bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition border-l-8 border-red-500"
        >
          <Pill className="text-red-500 mb-4" size={36} />
          <h2 className="text-xl font-bold">Medications</h2>
          <p className="mt-2 text-gray-600">Prescribed treatments</p>
        </Link>

        <Link
          href="/sti/education-materials"
          className="block bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition border-l-8 border-purple-500"
        >
          <BookOpen className="text-purple-500 mb-4" size={36} />
          <h2 className="text-xl font-bold">Education</h2>
          <p className="mt-2 text-gray-600">Patient materials</p>
        </Link>

        <Link
          href="/sti/followups"
          className="block bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition border-l-8 border-green-500"
        >
          <Activity className="text-green-500 mb-4" size={36} />
          <h2 className="text-xl font-bold">Follow-Ups</h2>
          <p className="mt-2 text-gray-600">Track patient follow-ups</p>
        </Link>
      </div>
    </main>
  );
}
