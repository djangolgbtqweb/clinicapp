'use client';

import { useEffect, useState } from 'react';
import { fetchNotices } from 'lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Notice {
  id: number;
  title: string;
  reference: string;
  content: string;
  posted_by: number | null;
  posted_at: string;
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices()
      .then(setNotices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-500 animate-pulse">Loading notices…</div>
      </div>
    );
  }

  if (!notices.length) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-500">No notices found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-8">
      {/* Back to Communication */}
      <div className="mb-6">
        <Link
          href="/internal_communication"
          className="inline-flex items-center text-white hover:text-white transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Communication
        </Link>
      </div>

      {/* Page Title */}
      <h1 className="text-center text-4xl font-extrabold mb-12">Official Notices</h1>

      {/* Notices List */}
      <div className="max-w-4xl mx-auto space-y-10">
        {notices.map((notice) => (
          <article
            key={notice.id}
            className="bg-black border-t-4 border-blue-600 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
          >
            {/* Header */}
            <header className="text-center mb-6">
              <h2 className="text-3xl font-semibold mb-1">{notice.title}</h2>
              <p className="text-sm text-white">
                Reference:{' '}
                <span className="font-medium text-blue-400">{notice.reference}</span>
              </p>
            </header>

            {/* Content */}
            <div
              className="prose prose-invert max-w-none text-gray-200 mb-6"
              style={{ whiteSpace: 'pre-line' }}
            >
              {notice.content}
            </div>

            {/* Footer */}
            <footer className="flex justify-between text-sm text-white">
              <time>
                Posted on{' '}
                <strong className="text-gray-300">
                  {new Date(notice.posted_at).toLocaleDateString()}
                </strong>
              </time>
              <div>
                Signed by:{' '}
                <strong className="text-gray-300">
                  {notice.posted_by ?? 'Admin'}
                </strong>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}

