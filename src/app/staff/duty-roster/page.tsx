'use client';

import { useEffect, useState } from 'react';
import { fetchDutyRoster } from 'lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Duty {
  id: number;
  staff_member: number;
  date: string;
  shift_time: string;
  assigned: boolean;
}

export default function DutyRosterPage() {
  const [roster, setRoster] = useState<Duty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDutyRoster()
      .then(setRoster)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading duty roster…
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
        Duty Roster
      </h1>

      <div className="overflow-x-auto rounded-lg border border-white shadow-lg">
        <table className="w-full text-sm table-auto">
          <thead className="bg-black border-b border-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-white">
                Staff ID
              </th>
              <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-white">
                Date
              </th>
              <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-white">
                Shift
              </th>
              <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-white">
                Assigned
              </th>
            </tr>
          </thead>
          <tbody>
            {roster.map((duty, index) => (
              <tr
                key={duty.id}
                style={{
                  animation: `slideFadeIn 0.5s ease forwards`,
                  animationDelay: `${index * 0.05}s`,
                  opacity: 0,
                  transform: 'translateY(10px)',
                }}
                className="border-b border-black hover:bg-white hover:text-black transition-all duration-300"
              >
                <td className="px-6 py-4 whitespace-nowrap">{duty.staff_member}</td>
                <td className="px-6 py-4 whitespace-nowrap">{duty.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{duty.shift_time}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {duty.assigned ? (
                    <span className="inline-block px-2 py-0.5 bg-black text-white rounded-full text-xs font-semibold">
                      YES
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 bg-black text-white rounded-full text-xs font-semibold">
                      NO
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Smooth Animation */}
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
