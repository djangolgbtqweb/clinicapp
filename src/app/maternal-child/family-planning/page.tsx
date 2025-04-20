// src/app/maternal-child/family-planning/page.tsx
import { fetchFamilyPlanning } from 'lib/api';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function FamilyPlanningPage() {
  const records = await fetchFamilyPlanning();

  // Use real records or fall back to 3 empty placeholders
  const toRender =
    records.length > 0
      ? records
      : Array.from({ length: 3 }, () => ({
          id: null,
          patient: null,
          service_type: null,
          service_date: null,
          details: null,
        }));

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 space-y-8 px-4 py-6 md:px-12">
      {/* Header */}
      <header className="flex items-center justify-between">
        <Link href="/maternal-child" className="text-sm text-pink-600 flex items-center hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
          🗓️ Family Planning
        </h1>
      </header>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {toRender.map((f: any, i) => (
          <div
            key={f.id ?? `placeholder-${i}`}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all space-y-4"
          >
            {/* Record # and Date */}
            <div className="flex justify-between items-center">
              <div className="text-sm font-semibold text-purple-500">
                FP Record #{f.id ?? 'Awaiting…'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {f.service_date
                  ? new Date(f.service_date).toLocaleDateString()
                  : 'Awaiting Date…'}
              </div>
            </div>

            {/* Patient ID */}
            <div className="text-sm text-slate-700 dark:text-slate-200">
              <span className="font-semibold text-purple-400">Patient ID:</span>{' '}
              {f.patient ?? 'Awaiting Patient ID…'}
            </div>

            {/* Service Type */}
            <div className="text-sm text-slate-700 dark:text-slate-200">
              <span className="font-semibold text-purple-400">Service:</span>{' '}
              {f.service_type ?? 'Awaiting Service Type…'}
            </div>

            {/* Details */}
            <div className="text-sm text-slate-700 dark:text-slate-200">
              <p className="font-semibold text-purple-400">Details:</p>
              <p className="whitespace-pre-line">
                {f.details ?? 'Awaiting Details…'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
