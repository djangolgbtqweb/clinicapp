// src/app/pharmacy/restocking-alerts/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchRestockingAlerts } from 'lib/api';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell } from 'lucide-react';

type Alert = {
  id: number;
  medication: number;
  threshold_quantity: number;
  alert_date: string;
};

export default function RestockingAlertsPage() {
  const [alerts, setAlerts]     = useState<Alert[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [filter, setFilter]     = useState('');

  useEffect(() => {
    fetchRestockingAlerts()
      .then(setAlerts)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Filter by medication ID
  const filtered = alerts.filter(a =>
    a.medication.toString().includes(filter)
  );

  if (loading)
    return (
      <p className="p-10 text-center text-red-600 animate-pulse">
        🔄 Loading restocking alerts…
      </p>
    );
  if (error)
    return (
      <p className="p-10 text-center text-red-600">❌ {error}</p>
    );

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-red-100 via-white to-red-100 overflow-hidden">
      {/* Subtle repeating medical pattern */}
      <div
        className="absolute inset-0 opacity-5 bg-[url('/images/medical-pattern.svg')] bg-repeat"
      />

      <div className="relative z-10 p-8 space-y-6">
        {/* Back link */}
        <Link
          href="/pharmacy"
          className="inline-flex items-center text-red-700 hover:text-red-900 transition"
        >
          <ArrowLeft className="mr-2" /> Back to Pharmacy
        </Link>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-red-800 text-center">
          🔔 Restocking Alerts
        </h1>

        {/* Filter input */}
        <div className="max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Filter by medication #…"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="
              w-full px-4 py-2 rounded-full
              bg-white/30 backdrop-blur-sm border border-white/50
              placeholder-red-500 text-red-900
              focus:outline-none focus:ring-2 focus:ring-red-300
            "
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length > 0 ? (
            filtered.map((a, i) => (
              <motion.div
                key={a.id}
                className="
                  relative overflow-hidden rounded-3xl p-6
                  bg-white/20 backdrop-blur-lg border border-white/30
                  shadow-2xl
                "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Giant Bell watermark */}
                <Bell
                  size={120}
                  className="absolute bottom-[-20px] right-[-20px] text-red-300/20"
                />

                <h2 className="text-2xl font-bold text-red-800 mb-2">
                  Medication #{a.medication}
                </h2>
                <p className="text-gray-700 mb-1">
                  <strong>Threshold:</strong> {a.threshold_quantity}
                </p>
                <p className="text-gray-700">
                  <strong>Alerted:</strong>{' '}
                  {new Date(a.alert_date).toLocaleString()}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 text-gray-500">
              No alerts match your filter.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
