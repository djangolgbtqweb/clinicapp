// /src/app/pharmacy/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Pill, ClipboardList, PackageCheck, Bell, ArrowLeft } from 'lucide-react';

export default function Page() {
  return (
    <main className="relative min-h-screen">


      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Foreground content */}
      <div className="relative z-10 p-8">
        {/* Back to Dashboard */}
        <Link
          href="/"
          className="inline-flex items-center text-white hover:text-yellow-300 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <motion.h1
          className="text-5xl font-extrabold text-white mb-12 text-center drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🏥 Pharmacy Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Glassmorphic Cards */}
          <Link
            href="/pharmacy/medications"
            className="relative overflow-hidden p-6 rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 hover:bg-white/40 transition"
          >
            <Pill className="absolute top-4 right-4 text-white/80" size={36} />
            <h2 className="text-2xl font-bold text-white mb-1">Medications</h2>
            <p className="text-white/90">Manage stock & pricing.</p>
          </Link>

          <Link
            href="/pharmacy/prescriptions"
            className="relative overflow-hidden p-6 rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 hover:bg-white/40 transition"
          >
            <ClipboardList className="absolute top-4 right-4 text-white/80" size={36} />
            <h2 className="text-2xl font-bold text-white mb-1">Prescriptions</h2>
            <p className="text-white/90">View doctor orders.</p>
          </Link>

          <Link
            href="/pharmacy/dispensing-history"
            className="relative overflow-hidden p-6 rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 hover:bg-white/40 transition"
          >
            <PackageCheck className="absolute top-4 right-4 text-white/80" size={36} />
            <h2 className="text-2xl font-bold text-white mb-1">Dispensing History</h2>
            <p className="text-white/90">Track dispensed meds.</p>
          </Link>

          <Link
            href="/pharmacy/restocking-alerts"
            className="relative overflow-hidden p-6 rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 hover:bg-white/40 transition"
          >
            <Bell className="absolute top-4 right-4 text-white/80" size={36} />
            <h2 className="text-2xl font-bold text-white mb-1">Restocking Alerts</h2>
            <p className="text-white/90">Low-stock warnings.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}


