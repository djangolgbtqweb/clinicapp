'use client';

import { useEffect, useState } from 'react';
import { fetchLeaveRequests } from 'lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Leave {
  id: number;
  staff_member: number;
  start_date: string;
  end_date: string;
  leave_type: string;
  reason: string;
  status: string;
}

export default function LeaveRequestsPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaveRequests()
      .then(setLeaves)
      .catch((err) => {
        console.error(err);
        setError('Failed to load leave requests.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-400">
        Loading leave requests…
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

  if (leaves.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No leave requests found.
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
        Leave Requests
      </h1>

      <div className="overflow-x-auto rounded-lg border border-white shadow-lg">
        <table className="w-full text-sm table-auto">
          <thead className="bg-black border-b border-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-white">
                Staff ID
              </th>
              <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-white">
                From
              </th>
              <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-white">
                To
              </th>
              <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-white">
                Type
              </th>
              <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, index) => (
              <tr
                key={leave.id}
                style={{
                  animation: `slideFadeIn 0.5s ease forwards`,
                  animationDelay: `${index * 0.05}s`,
                  opacity: 0,
                  transform: 'translateY(10px)',
                }}
                className="border-b border-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <td className="px-6 py-4">{leave.staff_member}</td>
                <td className="px-6 py-4">{leave.start_date}</td>
                <td className="px-6 py-4">{leave.end_date}</td>
                <td className="px-6 py-4">{leave.leave_type}</td>
                <td className="px-6 py-4">{leave.status}</td>
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
