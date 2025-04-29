'use client';

import { useEffect, useState } from 'react';
import { fetchShiftUpdates } from 'lib/api';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ShiftUpdate {
  id: number;
  message: string;
  updated_by: number | null;
  timestamp: string;
}

export default function ShiftUpdatesPage() {
  const [updates, setUpdates] = useState<ShiftUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShiftUpdates()
      .then(setUpdates)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 text-center text-gray-400">Loading updates…</div>;
  if (!updates.length) return <div className="p-6 text-center text-gray-500">No updates found.</div>;

  return (
    <div className="min-h-screen bg-black text-white p-10">
      {/* Back to Dashboard */}
      <div>
        <Link
          href="/internal_communication"
          className="flex items-center text-white hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Communication
        </Link>
        </div>
      <h1 className="text-3xl font-bold mb-6 text-center">Shift Updates</h1>
      <ul className="space-y-4 max-w-3xl mx-auto">
        {updates.map((u) => (
          <li key={u.id} className="p-6 bg-black rounded-lg hover:bg-black transition">
            <p className="text-white text-2xl">{u.message}</p>
            <div className="mt-4 text-1xl text-white">
              By <strong>{u.updated_by ?? '—'}</strong> at {new Date(u.timestamp).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
