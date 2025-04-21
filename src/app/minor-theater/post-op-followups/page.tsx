'use client';

import { useEffect, useState } from 'react';
import { fetchPostOpFollowUps } from 'lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

type PostOpFollowUp = {
  id: number;
  patient_name: string;
  follow_up_date: string;
  surgeon: string;
  procedure: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
};

export default function PostOpFollowUpsPage() {
  const [followUps, setFollowUps] = useState<PostOpFollowUp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPostOpFollowUps();
        setFollowUps(data);
      } catch (err) {
        console.error('Error fetching post-op follow-ups:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Always render 6 follow-up cards (placeholders if no data)
  const displayCards = followUps.length > 0 ? followUps : Array.from({ length: 6 });

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/minor-theater" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft />
          </Link>
          <h1 className="text-1xl font-bold text-blue-800">Post-Op Follow-Ups</h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {displayCards.map((followUp: any, index: number) => (
            <div
              key={followUp?.id || index}
              className="bg-white border border-gray-300 rounded-lg shadow-sm p-5 space-y-3"
            >
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Patient Name:</span>{" "}
                {loading || !followUp?.patient_name ? (
                  <div className="h-4 bg-gray-200 w-32 animate-pulse rounded" />
                ) : (
                  followUp.patient_name
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Follow-Up Date:</span>{" "}
                {loading || !followUp?.follow_up_date ? (
                  <div className="h-4 bg-gray-200 w-24 animate-pulse rounded" />
                ) : (
                  format(new Date(followUp.follow_up_date), 'dd MMM yyyy, hh:mm a')
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Surgeon:</span>{" "}
                {loading || !followUp?.surgeon ? (
                  <div className="h-4 bg-gray-200 w-20 animate-pulse rounded" />
                ) : (
                  followUp.surgeon
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Procedure:</span>{" "}
                {loading || !followUp?.procedure ? (
                  <div className="h-4 bg-gray-200 w-28 animate-pulse rounded" />
                ) : (
                  followUp.procedure
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Status:</span>{" "}
                {loading || !followUp?.status ? (
                  <div className="h-4 bg-gray-200 w-20 animate-pulse rounded" />
                ) : (
                  followUp.status
                )}
              </div>
              {followUp?.notes && (
                <div className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">Notes:</span>{" "}
                  {loading || !followUp?.notes ? (
                    <div className="h-4 bg-gray-200 w-40 animate-pulse rounded" />
                  ) : (
                    followUp.notes
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {!loading && followUps.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg font-semibold">No post-op follow-ups available.</p>
            <p className="text-sm text-gray-400">Follow-ups will appear here once recorded.</p>
          </div>
        )}
      </div>
    </div>
  );
}
