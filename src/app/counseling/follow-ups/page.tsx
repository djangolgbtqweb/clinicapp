'use client';

import { useEffect, useState } from 'react';
import { fetchFollowUpReminders } from 'lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

type FollowUpReminder = {
  id: number;
  session: number;
  reminder_text: string;
  scheduled_date: string;
  created_at: string;
};

export default function FollowUpsPage() {
  const [reminders, setReminders] = useState<FollowUpReminder[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFollowUps = async () => {
      try {
        const data = await fetchFollowUpReminders();
        setReminders(data);
      } catch (err) {
        console.error('Error loading follow-up reminders:', err);
        setReminders([]);
      } finally {
        setLoading(false);
      }
    };
    loadFollowUps();
  }, []);

  // Determine what to render
  const displayItems = loading
    ? Array.from({ length: 6 })
    : reminders && reminders.length > 0
    ? reminders
    : Array.from({ length: 3 }); // fallback skeletons when no data

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/counseling" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft />
        </Link>
        <h1 className="text-1xl font-bold text-teal-700">Follow-Up Reminders</h1>
      </div>

      {/* Reminders Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {displayItems.map((reminder, index) => (
          <div
            key={(reminder as FollowUpReminder)?.id || index}
            className="bg-white rounded-xl border border-gray-200 shadow-md p-6 space-y-4 transition-all hover:shadow-lg"
          >
            {/* Session & Date */}
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div>
                Session ID:{' '}
                <span className="font-medium text-gray-800">
                  {loading || !reminders?.length ? (
                    <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
                  ) : (
                    (reminder as FollowUpReminder).session
                  )}
                </span>
              </div>
              <div>
                {loading || !reminders?.length ? (
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                ) : (
                  format(new Date((reminder as FollowUpReminder).scheduled_date), 'dd MMM yyyy')
                )}
              </div>
            </div>

            {/* Reminder Text */}
            <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {loading || !reminders?.length ? (
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                </div>
              ) : (
                (reminder as FollowUpReminder).reminder_text
              )}
            </div>

            {/* Created At */}
            <div className="text-xs text-right text-gray-500">
              Created:{' '}
              {loading || !reminders?.length ? (
                <div className="h-3 w-24 inline-block bg-gray-200 animate-pulse rounded" />
              ) : (
                format(new Date((reminder as FollowUpReminder).created_at), 'dd MMM yyyy, hh:mm a')
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && reminders?.length === 0 && (
        <div className="text-center col-span-full text-gray-500 py-12">
          <p className="text-lg font-semibold">No follow-up reminders yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Scheduled reminders will appear here once added.
          </p>
        </div>
      )}
    </div>
  );
}

