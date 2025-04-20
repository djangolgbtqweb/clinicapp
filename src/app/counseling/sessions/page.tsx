'use client';

import { useEffect, useState } from 'react';
import { fetchCounselingSessions } from 'lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

type CounselingSession = {
  id: number;
  patient: number; // Ideally, you'd replace this with full patient object
  counselor: string;
  session_date: string;
  session_notes: string;
  session_type: 'mental_health' | 'health_education';
};

export default function CounselingSessionsPage() {
  const [sessions, setSessions] = useState<CounselingSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCounselingSessions();
        setSessions(data);
      } catch (err) {
        console.error("Error loading sessions:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getSessionTypeLabel = (type: string) => {
    return type === 'mental_health' ? 'Mental Health' : 'Health Education';
  };

  return (
    <div className="p-6 space-y-6 bg-gray-500 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/counseling" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft />
        </Link>
        <h1 className="text-1xl font-semibold">Counseling Sessions</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-100 bg-white text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-700">Patient ID</th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">Counselor</th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">Date</th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">Type</th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  Loading counseling sessions...
                </td>
              </tr>
            ) : sessions.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No counseling sessions available.
                </td>
              </tr>
            ) : (
              sessions.map((session) => (
                <tr key={session.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {session.patient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{session.counselor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(new Date(session.session_date), 'dd MMM yyyy, hh:mm a')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {getSessionTypeLabel(session.session_type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-gray-600 max-w-xs truncate">
                    {session.session_notes || '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
