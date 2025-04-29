'use client';

import { useEffect, useState } from 'react';
import { fetchAdminMessages } from 'lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: number;
  sender: number | null;
  recipient: number | null;
  subject: string;
  message: string;
  sent_at: string;
}

export default function MessagesPage() {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminMessages()
      .then(setMsgs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      Loading messages…
    </div>
  );

  if (!msgs.length) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      No messages found.
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-10">
      {/* Back to Communication */}
      <div className="mb-8">
        <Link
          href="/internal_communication"
          className="inline-flex items-center text-white hover:text-white transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Communication
        </Link>
      </div>

      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center mb-12">
        Admin Messages
      </h1>

      {/* Messages */}
      <div className="max-w-4xl mx-auto space-y-10">
        {msgs.map((m) => (
          <div
            key={m.id}
            className="bg-black border-t-4 border-green-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Message Subject */}
            <h2 className="text-2xl font-semibold mb-3">{m.subject}</h2>

            {/* Message Body */}
            <p className="text-white mb-6" style={{ whiteSpace: 'pre-line' }}>
              {m.message}
            </p>

            {/* Footer Info */}
            <div className="flex justify-between text-sm text-white">
              <div>
                From:{' '}
                <strong className="text-white">
                  {m.sender ?? 'Admin'}
                </strong>
              </div>
              <div>
                To:{' '}
                <strong className="text-white">
                  {m.recipient ?? '—'}
                </strong>
              </div>
              <div>
                <time>
                  {new Date(m.sent_at).toLocaleString()}
                </time>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
