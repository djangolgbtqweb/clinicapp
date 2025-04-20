// src/app/outpatient/page.tsx
import {
  fetchQueue,
  fetchConsultations,
  fetchReferrals,
} from 'lib/api';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function OutpatientLandingPage() {
  // Fetch data concurrently
  const [queue, consultations, referrals] = await Promise.all([
    fetchQueue(),
    fetchConsultations(),
    fetchReferrals(),
  ]);

  const cardStyle =
    'bg-white dark:bg-slate-900 rounded-2xl shadow-md p-5 border border-slate-200 hover:shadow-xl transition';

  return (
    <main className="p-6 space-y-10 bg-gray-400 min-h-screen">
      {/* Back to Dashboard */}
      <div className="mb-2">
        <Link
          href="/"
          className="flex items-center text-yellow-300 hover:text-pink-600 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      {/* Page Header */}
      <header className="text-center">
        <h1 className="text-3xl font-extrabold text-yellow-300">Outpatient Module</h1>
        <p className="text-yellow-300">Monitor current patient flow and clinical activity</p>
      </header>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Queue Overview */}
        <div className={cardStyle}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">📝 Queue</h2>
            <Link
              href="/outpatient/queue"
              className="text-pink-400 text-sm hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-yellow-300 text-sm mb-4">{queue.length} patients waiting</p>
          <ul className="space-y-2">
            {queue.slice(0, 3).map((q: any) => (
              <li
                key={q.id}
                className="text-sm bg-slate-50 dark:bg-slate-800 rounded-lg p-2"
              >
                <p>
                  <strong>Patient:</strong> {q.patient}
                </p>
                <p>
                  <strong>Status:</strong> {q.status}
                </p>
                <p>
                  <strong>Priority:</strong> {q.priority}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Consultations Overview */}
        <div className={cardStyle}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">💬 Consultations</h2>
            <Link
              href="/outpatient/consultations"
              className="text-pink-400 text-sm hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-yellow-300 text-sm mb-4">{consultations.length} recent consults</p>
          <ul className="space-y-2">
            {consultations.slice(0, 3).map((c: any) => (
              <li
                key={c.id}
                className="text-sm bg-slate-50 dark:bg-slate-800 rounded-lg p-2"
              >
                <p>
                  <strong>Doctor:</strong> {c.doctor_name}
                </p>
                <p>
                  <strong>Dx:</strong> {c.diagnosis}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Referrals Overview */}
        <div className={cardStyle}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">🔁 Referrals</h2>
            <Link
              href="/outpatient/referrals"
              className="text-pink-400 text-sm hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-yellow-300 text-sm mb-4">{referrals.length} pending referrals</p>
          <ul className="space-y-2">
            {referrals.slice(0, 3).map((r: any) => (
              <li
                key={r.id}
                className="text-sm bg-slate-50 dark:bg-slate-800 rounded-lg p-2"
              >
                <p>
                  <strong>To:</strong> {r.referred_to}
                </p>
                <p>
                  <strong>Reason:</strong> {r.reason}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}




  