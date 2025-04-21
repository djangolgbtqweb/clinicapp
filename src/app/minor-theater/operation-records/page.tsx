'use client';

import { useEffect, useState } from 'react';
import { fetchOperationRecords } from 'lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

type OperationRecord = {
  id: number;
  patient_name: string;
  procedure: string;
  surgeon: string;
  assistant: string;
  notes: string;
  outcome: string;
  operation_date: string;
};

export default function OperationRecordsPage() {
  const [records, setRecords] = useState<OperationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchOperationRecords();
        setRecords(data);
      } catch (err) {
        console.error('Error fetching operation records:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Always render 6 records (placeholders if no data)
  const displayCards = records.length > 0 ? records : Array.from({ length: 6 });

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/minor-theater" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft />
          </Link>
          <h1 className="text-1xl font-bold text-blue-800">Operation Records</h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {displayCards.map((record: any, index: number) => (
            <div
              key={record?.id || index}
              className="bg-white border border-gray-300 rounded-lg shadow-sm p-5 space-y-3"
            >
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Patient:</span>{" "}
                {loading || !record?.patient_name ? (
                  <div className="h-4 bg-gray-200 w-32 animate-pulse rounded" />
                ) : (
                  record.patient_name
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Date:</span>{" "}
                {loading || !record?.operation_date ? (
                  <div className="h-4 bg-gray-200 w-24 animate-pulse rounded" />
                ) : (
                  format(new Date(record.operation_date), 'dd MMM yyyy, hh:mm a')
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Procedure:</span>{" "}
                {loading || !record?.procedure ? (
                  <div className="h-4 bg-gray-200 w-28 animate-pulse rounded" />
                ) : (
                  record.procedure
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Surgeon:</span>{" "}
                {loading || !record?.surgeon ? (
                  <div className="h-4 bg-gray-200 w-20 animate-pulse rounded" />
                ) : (
                  record.surgeon
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Assistant:</span>{" "}
                {loading || !record?.assistant ? (
                  <div className="h-4 bg-gray-200 w-20 animate-pulse rounded" />
                ) : (
                  record.assistant || 'N/A'
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Outcome:</span>{" "}
                {loading || !record?.outcome ? (
                  <div className="h-4 bg-gray-200 w-20 animate-pulse rounded" />
                ) : (
                  record.outcome || 'N/A'
                )}
              </div>
              {loading || !record?.notes ? (
                <div className="h-4 bg-gray-200 w-28 animate-pulse rounded" />
              ) : (
                record.notes && (
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-700">Notes:</span> {record.notes}
                  </div>
                )
              )}
            </div>
          ))}
        </div>

        {!loading && records.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg font-semibold">No operation records available.</p>
            <p className="text-sm text-gray-400">Once recorded, surgeries will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
