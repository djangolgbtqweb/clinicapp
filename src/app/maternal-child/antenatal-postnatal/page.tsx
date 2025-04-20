import { fetchAntenatalPostnatalRecords } from 'lib/api';
import Link from 'next/link';
import {
  ArrowLeft,
  FileText,
  AlertCircle,
  User,
  CalendarDays,
  Stethoscope,
} from 'lucide-react';

const PlaceholderCard = () => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-md transition-all space-y-4 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-pink-600">
        <FileText className="w-4 h-4" />
        <span className="text-sm font-medium bg-gray-200 dark:bg-slate-700 h-4 w-20 rounded"></span>
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
        <CalendarDays className="w-4 h-4" />
        <span className="bg-gray-200 dark:bg-slate-700 h-4 w-16 rounded"></span>
      </div>
    </div>
    <div className="text-sm text-slate-700 dark:text-slate-200 space-y-2">
      <p className="flex items-center gap-1">
        <User className="w-4 h-4 text-pink-400" />
        <span className="bg-gray-200 dark:bg-slate-700 h-4 w-32 rounded"></span>
      </p>
      <p className="flex items-center gap-1">
        <Stethoscope className="w-4 h-4 text-pink-400" />
        <span className="bg-gray-200 dark:bg-slate-700 h-4 w-28 rounded"></span>
      </p>
      <p>
        <span className="font-semibold">Health Status:</span>{' '}
        <span className="inline-block bg-gray-200 dark:bg-slate-700 h-5 w-24 rounded-full"></span>
      </p>
      <div>
        <p className="font-semibold">Notes:</p>
        <p className="bg-gray-200 dark:bg-slate-700 h-4 w-full rounded mb-1"></p>
        <p className="bg-gray-200 dark:bg-slate-700 h-4 w-5/6 rounded"></p>
      </div>
    </div>
  </div>
);

export default async function AntenatalPostnatalPage() {
  const records = await fetchAntenatalPostnatalRecords();

  const dataToRender = records.length === 0 ? Array.from({ length: 3 }) : records;

  return (
    <main className="min-h-screen px-4 py-6 md:px-12 space-y-8 bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between">
        <Link href="/maternal-child" className="text-sm text-pink-600 flex items-center hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          🩺 Antenatal/Postnatal Records
        </h1>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.length === 0
          ? dataToRender.map((_, index) => <PlaceholderCard key={index} />)
          : records.map((r: any) => (
              <div
                key={r.id}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all space-y-4"
              >
                {/* Top Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-pink-600">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">Record #{r.id ?? '---'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <CalendarDays className="w-4 h-4" />
                    {r.record_date ? new Date(r.record_date).toLocaleDateString() : '---'}
                  </div>
                </div>

                {/* Patient Info */}
                <div className="text-sm text-slate-700 dark:text-slate-200 space-y-2">
                  <p className="flex items-center gap-1">
                    <User className="w-4 h-4 text-pink-400" />
                    <span>
                      <span className="font-semibold">Patient:</span> {r.patient ?? 'Unknown'}
                    </span>
                  </p>
                  <p className="flex items-center gap-1">
                    <Stethoscope className="w-4 h-4 text-pink-400" />
                    <span>
                      <span className="font-semibold">Stage:</span> {r.stage ?? 'Not specified'}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Health Status:</span>{' '}
                    <span
                      className={`font-semibold px-2 py-0.5 rounded-full text-xs ${
                        r.health_status === 'At Risk'
                          ? 'bg-red-100 text-red-600 dark:bg-red-700/20'
                          : r.health_status
                          ? 'bg-green-100 text-green-700 dark:bg-green-700/20'
                          : 'bg-gray-100 text-gray-600 dark:bg-slate-700/30'
                      }`}
                    >
                      {r.health_status ?? 'Unknown'}
                    </span>
                  </p>
                  <div>
                    <p className="font-semibold">Notes:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line min-h-[3rem]">
                      {r.consultation_notes ?? 'No notes provided.'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </main>
  );
}



