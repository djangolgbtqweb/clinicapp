'use client';

import { useEffect, useState } from 'react';
import { fetchPrivateNotes } from 'lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

type PrivateNote = {
  id: number;
  session: number;
  counselor: string;
  note: string;
  created_at: string;
};

export default function PrivateNotesPage() {
  const [notes, setNotes] = useState<PrivateNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchPrivateNotes();
        setNotes(data);
      } catch (err) {
        console.error('Error loading private notes:', err);
      } finally {
        setLoading(false);
      }
    };
    loadNotes();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/counseling" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft />
        </Link>
        <h1 className="text-1xl font-bold text-pink-500">Private Notes</h1>
      </div>

      {/* Notes Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <NoteCardSkeleton key={index} />
            ))
          : notes.length === 0
          ? Array.from({ length: 3 }).map((_, index) => (
              <NoteCardPlaceholder key={index} />
            ))
          : notes.map((note) => <NoteCard key={note.id} note={note} />)}
      </div>

      {/* Empty State (after loading) */}
      {!loading && notes.length === 0 && (
        <div className="text-center col-span-full text-gray-500 py-12">
          <p className="text-lg font-semibold">No private notes yet</p>
          <p className="text-sm text-gray-400 mt-2">Notes will appear here once they are added.</p>
        </div>
      )}
    </div>
  );
}

// Actual Note Card
function NoteCard({ note }: { note: PrivateNote }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 space-y-4 hover:shadow-lg">
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>
          Session ID:{' '}
          <span className="font-medium text-gray-800">{note.session}</span>
        </div>
        <div>{format(new Date(note.created_at), 'dd MMM yyyy, hh:mm a')}</div>
      </div>
      <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
        {note.note}
      </div>
      <div className="text-xs text-right text-gray-500">
        Authored by: <span className="font-semibold">{note.counselor}</span>
      </div>
    </div>
  );
}

// Skeleton while loading
function NoteCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 space-y-4 animate-pulse">
      <div className="flex justify-between text-sm text-gray-300">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
      <div className="text-right">
        <div className="h-3 bg-gray-200 rounded w-1/3 ml-auto" />
      </div>
    </div>
  );
}

// Placeholder when empty but not loading
function NoteCardPlaceholder() {
  return (
    <div className="bg-white rounded-xl border border-dashed border-purple-400 shadow-inner p-6 space-y-4 opacity-700">
      <div className="flex justify-between items-center text-sm text-black">
        <div>Session ID: —</div>
        <div>—</div>
      </div>
      <div className="text-sm text-gray-400 whitespace-pre-wrap leading-relaxed italic">
        This is where a private note will appear once added.
      </div>
      <div className="text-xs text-right text-gray-900">Authored by: —</div>
    </div>
  );
}


