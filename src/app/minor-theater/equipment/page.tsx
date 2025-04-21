'use client';

import { useEffect, useState } from 'react';
import { fetchEquipmentTracking } from 'lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

type Equipment = {
  id: number;
  name: string;
  type: string;
  status: string;
  last_service_date: string;
  next_service_due: string;
};

export default function EquipmentTrackingPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchEquipmentTracking();
        setEquipment(data);
      } catch (err) {
        console.error('Error fetching equipment:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Always render 6 equipment cards (placeholders if no data)
  const displayCards = equipment.length > 0 ? equipment : Array.from({ length: 6 });

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/minor-theater" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft />
          </Link>
          <h1 className="text-1xl font-bold text-blue-800">Equipment Tracking</h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {displayCards.map((equipmentItem: any, index: number) => (
            <div
              key={equipmentItem?.id || index}
              className="bg-white border border-gray-300 rounded-lg shadow-sm p-5 space-y-3"
            >
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Equipment Name:</span>{" "}
                {loading || !equipmentItem?.name ? (
                  <div className="h-4 bg-gray-200 w-32 animate-pulse rounded" />
                ) : (
                  equipmentItem.name
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Type:</span>{" "}
                {loading || !equipmentItem?.type ? (
                  <div className="h-4 bg-gray-200 w-24 animate-pulse rounded" />
                ) : (
                  equipmentItem.type
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Status:</span>{" "}
                {loading || !equipmentItem?.status ? (
                  <div className="h-4 bg-gray-200 w-20 animate-pulse rounded" />
                ) : (
                  equipmentItem.status
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Last Service Date:</span>{" "}
                {loading || !equipmentItem?.last_service_date ? (
                  <div className="h-4 bg-gray-200 w-28 animate-pulse rounded" />
                ) : (
                  format(new Date(equipmentItem.last_service_date), 'dd MMM yyyy')
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Next Service Due:</span>{" "}
                {loading || !equipmentItem?.next_service_due ? (
                  <div className="h-4 bg-gray-200 w-28 animate-pulse rounded" />
                ) : (
                  format(new Date(equipmentItem.next_service_due), 'dd MMM yyyy')
                )}
              </div>
            </div>
          ))}
        </div>

        {!loading && equipment.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg font-semibold">No equipment records available.</p>
            <p className="text-sm text-gray-400">Equipment tracking records will appear here once added.</p>
          </div>
        )}
      </div>
    </div>
  );
}
