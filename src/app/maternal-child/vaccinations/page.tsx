// src/app/maternal-child/vaccinations/page.tsx
import { fetchVaccinationRecords } from 'lib/api';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function VaccinationsPage() {
  const records = await fetchVaccinationRecords();

  // If no real records yet, render 3 placeholder objects
  const toRender =
    records.length > 0
      ? records
      : Array.from({ length: 3 }, () => ({
          id: null,
          vaccine_date: null,
          patient: null,
          vaccine_name: null,
          status: null,
        }));

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 space-y-8 px-4 py-6 md:px-12">
      {/* Header */}
      <header className="flex items-center justify-between">
        <Link href="/maternal-child" className="text-sm text-pink-600 flex items-center hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
          💉 Vaccination Records
        </h1>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {toRender.map((v: any, i) => (
          <div
            key={v.id ?? `placeholder-${i}`}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all space-y-4 border border-gray-200 dark:border-slate-700"
          >
            {/* Record ID & Date */}
            <div className="flex justify-between">
              <div className="text-sm text-pink-500 font-semibold">
                Vaccine Record #{v.id ?? 'Awaiting ID...'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {v.vaccine_date
                  ? new Date(v.vaccine_date).toLocaleDateString()
                  : 'Awaiting Date...'}
              </div>
            </div>

            {/* Patient ID */}
            <div className="text-sm text-slate-700 dark:text-slate-200">
              <span className="font-semibold text-pink-400">Patient ID:</span>{' '}
              {v.patient ?? 'Awaiting Patient ID...'}
            </div>

            {/* Vaccine Name */}
            <div className="text-sm text-slate-700 dark:text-slate-200">
              <span className="font-semibold text-pink-400">Vaccine:</span>{' '}
              {v.vaccine_name ?? 'Awaiting Vaccine Name...'}
            </div>

            {/* Status */}
            <div className="text-sm">
              <span className="font-semibold text-yellow-600">Status:</span>{' '}
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  v.status === 'Completed'
                    ? 'bg-green-100 text-green-700 dark:bg-green-700/20'
                    : v.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-700/20'
                    : 'bg-gray-100 text-gray-600 dark:bg-slate-700/30'
                }`}
              >
                {v.status ?? 'Awaiting Status...'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

