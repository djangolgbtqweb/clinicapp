import { fetchReferrals } from 'lib/api';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function ReferralsPage() {
  const referrals = await fetchReferrals();

  return (
    <main className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-yellow-300">🔁 Referrals</h1>
          <p className="text-slate-600 dark:text-yellow-100">Tracking patient referrals for further care</p>
        </div>
        <Link
          href="/outpatient"
          className="inline-flex items-center text-sm text-pink-500 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>

      {/* Referrals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {referrals.map((r: any) => (
          <div
            key={r.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-md p-5 space-y-2 hover:shadow-xl transition"
          >
            <p className="text-sm"><span className="font-semibold text-pink-500">Consultation ID:</span> {r.consultation}</p>
            <p className="text-sm"><span className="font-semibold text-yellow-500">Referred To:</span> {r.referred_to}</p>
            <p className="text-sm"><span className="font-semibold">Reason:</span> {r.reason}</p>
            <p className="text-sm"><span className="font-semibold">Status:</span> {r.status}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Referred At:</span> {new Date(r.referred_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}


