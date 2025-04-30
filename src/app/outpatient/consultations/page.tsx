import { fetchConsultations } from 'lib/api';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function ConsultationsPage() {
  let consultations = [];

  try {
    consultations = await fetchConsultations();
  } catch (e) {
    console.error("Error loading consultations:", e);
  }

  return (
    <main className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-yellow-300">💬 Consultations</h1>
          <p className="text-slate-600 dark:text-yellow-100">Complete list of patient consultations</p>
        </div>
        <Link
          href="/outpatient"
          className="inline-flex items-center text-sm text-pink-500 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>

      {/* Error Message if no data */}
      {consultations.length === 0 && (
        <div className="text-red-500 text-sm">No consultations found or failed to load.</div>
      )}

      {/* Consultations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {consultations.map((c: any) => (
          <div
            key={c.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-md p-5 space-y-2 hover:shadow-xl transition"
          >
            <p className="text-sm"><span className="font-semibold text-pink-500">Queue Entry ID:</span> {c.queue_entry}</p>
            <p className="text-sm"><span className="font-semibold text-yellow-500">Doctor:</span> {c.doctor_name}</p>
            <p className="text-sm"><span className="font-semibold">Symptoms:</span> {c.symptoms}</p>
            <p className="text-sm"><span className="font-semibold">Diagnosis:</span> {c.diagnosis}</p>
            <p className="text-sm"><span className="font-semibold">Prescriptions:</span> {c.prescriptions}</p>
            <p className="text-sm"><span className="font-semibold">Notes:</span> {c.notes}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Consulted At:</span> {new Date(c.consulted_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
