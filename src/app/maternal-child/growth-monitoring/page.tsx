// src/app/maternal-child/growth-monitoring/page.tsx

import { fetchGrowthMonitoring } from 'lib/api';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function GrowthMonitoringPage() {
  const records = await fetchGrowthMonitoring();

  // If no real records, render 3 placeholder objects
  const toRender =
    records.length > 0
      ? records
      : Array.from({ length: 3 }, () => ({
          id: null,
          patient: null,
          record_date: null,
          height: null,
          weight: null,
          head_circumference: null,
        }));

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 space-y-8 px-4 py-6 md:px-12">
      {/* Header */}
      <header className="flex items-center justify-between">
        <Link
          href="/maternal-child"
          className="text-sm text-pink-600 flex items-center hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
          📏 Growth Monitoring
        </h1>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {toRender.map((g: any, i: number) => (
          <div
            key={g.id ?? `placeholder-${i}`}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all space-y-4"
          >
            {/* Record ID & Date */}
            <div className="flex justify-between">
              <div className="text-sm text-blue-500 font-semibold">
                Record #{g.id ?? 'Awaiting…'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {g.record_date
                  ? new Date(g.record_date).toLocaleDateString()
                  : 'Awaiting Date…'}
              </div>
            </div>

            {/* Patient ID */}
            <div className="text-sm text-slate-700 dark:text-slate-200">
              <span className="font-semibold text-blue-400">Patient ID:</span>{' '}
              {g.patient ?? 'Awaiting Patient ID…'}
            </div>

            {/* Height */}
            <div className="text-sm text-slate-700 dark:text-slate-200">
              <span className="font-semibold text-blue-400">Height:</span>{' '}
              {g.height != null ? `${g.height} cm` : 'Awaiting Height…'}
            </div>

            {/* Weight */}
            <div className="text-sm text-slate-700 dark:text-slate-200">
              <span className="font-semibold text-blue-400">Weight:</span>{' '}
              {g.weight != null ? `${g.weight} kg` : 'Awaiting Weight…'}
            </div>

            {/* Head Circumference */}
            <div className="text-sm text-slate-700 dark:text-slate-200">
              <span className="font-semibold text-blue-400">Head Circ.:</span>{' '}
              {g.head_circumference != null
                ? `${g.head_circumference} cm`
                : 'Awaiting Head Circ…'}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

