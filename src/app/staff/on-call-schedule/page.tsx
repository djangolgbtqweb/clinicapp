'use client';

import { useEffect, useState } from 'react';
import { fetchOnCallSchedule } from 'lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link'

interface OnCall {
  id: number;
  staff_member: number;
  date: string;
  is_on_call: boolean;
}

export default function OnCallSchedulePage() {
  const [schedule, setSchedule] = useState<OnCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOnCallSchedule()
      .then(setSchedule)
      .catch((err) => {
        console.error(err);
        setError('Failed to load on-call schedule.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-400">
        Loading on-call schedule…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (schedule.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No on-call entries found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-10 text-white">
       {/* Back to Dashboard */}
       <div className="p-4">
        <Link
          href="/staff"
          className="flex items-center text-white hover:text-gray-400 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to staff Dashboard
        </Link>
      </div>
      <h1 className="text-4xl font-extrabold mb-10 text-center tracking-tight">
        On-Call Schedule
      </h1>

      <div className="overflow-x-auto rounded-lg border border-white shadow-lg">
        <table className="w-full text-sm table-auto">
          <thead className="bg-black border-b border-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold tracking-wider uppercase text-white">
                Staff ID
              </th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider uppercase text-white">
                Date
              </th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider uppercase text-white">
                On-Call
              </th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((entry, index) => (
              <tr
                key={entry.id}
                style={{
                  animation: `slideFadeIn 0.5s ease forwards`,
                  animationDelay: `${index * 0.05}s`,
                  opacity: 0,
                  transform: 'translateY(10px)',
                }}
                className="border-b border-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <td className="px-6 py-4">{entry.staff_member}</td>
                <td className="px-6 py-4">{entry.date}</td>
                <td className="px-6 py-4">
                  {entry.is_on_call ? 'YES' : 'NO'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Animation Keyframes */}
      <style jsx global>{`
        @keyframes slideFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
