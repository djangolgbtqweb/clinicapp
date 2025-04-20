'use client';

import { useEffect, useState } from 'react';
import { fetchHealthEducationLogs } from 'lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

type HealthEducationLog = {
  id: number;
  patient: number;
  topic: string;
  date: string;
  educator: string;
  notes: string;
};

export default function HealthEducationLogsPage() {
  const [logs, setLogs] = useState<HealthEducationLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHealthEducationLogs();
        setLogs(data);
      } catch (err) {
        console.error('Error loading health education logs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/counseling" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft />
        </Link>
        <h1 className="text-1xl font-bold text-teal-700">Health Education Logs</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-teal-50">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Patient ID</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Topic</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Date</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Educator</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  Loading health education logs...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No health education logs available.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {log.patient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-teal-800">
                    {log.topic}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {format(new Date(log.date), 'dd MMM yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {log.educator}
                  </td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-gray-600 max-w-xs truncate">
                    {log.notes || '—'}
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
