'use client';

import { useEffect, useState } from 'react';
import { fetchSurgeries } from 'lib/api';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type SurgerySchedule = {
  id: number;
  patient_name: string;
  scheduled_date: string;
  surgeon: string;
  procedure: string;
  status: 'scheduled' | 'completed' | 'cancelled';
};

export default function SurgeriesPage() {
  const [surgeries, setSurgeries] = useState<SurgerySchedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSurgeries = async () => {
      try {
        const res = await fetchSurgeries();
        setSurgeries(res);
      } catch (error) {
        console.error('Failed to fetch surgeries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSurgeries();
  }, []);

  // Always render 6 cards (placeholders if no data)
  const displayCards = surgeries.length > 0 ? surgeries : Array.from({ length: 6 });

  return (
    <div className="p-6 min-h-screen bg-gray-100 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/minor-theater" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft />
        </Link>
        <h1 className="text-1xl font-bold text-blue-800">Scheduled Surgeries</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {displayCards.map((surgery: any, index: number) => (
          <div
            key={surgery?.id || index}
            className="bg-white border border-blue-100 rounded-lg shadow-sm p-4 space-y-3"
          >
            <div className="text-sm text-gray-500">
              Patient:{" "}
              <span className="font-semibold text-gray-700">
                {loading || !surgery?.patient_name ? (
                  <div className="h-4 bg-gray-200 w-32 animate-pulse rounded" />
                ) : (
                  surgery.patient_name
                )}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Scheduled:{" "}
              <span className="font-medium text-gray-700">
                {loading || !surgery?.scheduled_date ? (
                  <div className="h-4 bg-gray-200 w-24 animate-pulse rounded" />
                ) : (
                  format(new Date(surgery.scheduled_date), 'dd MMM yyyy, hh:mm a')
                )}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <strong>Surgeon:</strong>{" "}
              {loading || !surgery?.surgeon ? (
                <div className="h-4 bg-gray-200 w-20 animate-pulse rounded" />
              ) : (
                surgery.surgeon
              )}
            </div>
            <div className="text-sm text-gray-600">
              <strong>Procedure:</strong>{" "}
              {loading || !surgery?.procedure ? (
                <div className="h-4 bg-gray-200 w-28 animate-pulse rounded" />
              ) : (
                surgery.procedure
              )}
            </div>
            <div className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
              {loading || !surgery?.status ? (
                <div className="h-4 bg-gray-200 w-20 animate-pulse rounded" />
              ) : (
                surgery.status
              )}
            </div>
          </div>
        ))}
      </div>

      {!loading && surgeries.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg font-semibold">No surgeries scheduled yet.</p>
          <p className="text-sm text-gray-400">Waiting for surgeries to be added.</p>
        </div>
      )}
    </div>
  );
}

