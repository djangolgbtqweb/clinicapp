// src/app/counseling/page.tsx
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function CounselingLandingPage() {
  return (
    <main className="p-6 min-h-screen bg-gray-500 text-white space-y-10">
      {/* Back to Dashboard */}
      <div>
        <Link
          href="/"
          className="flex items-center text-white hover:text-yellow-300 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>

      <header className="text-center">
        <h1 className="text-3xl font-extrabold text-yellow-300">Counseling Module</h1>
        <p className="text-yellow-300">Manage counseling sessions and patient education</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardLink href="/counseling/sessions" title="🧠 Counseling Sessions" />
        <CardLink href="/counseling/education-logs" title="📚 Health Education Logs" />
        <CardLink href="/counseling/private-notes" title="📝 Private Notes" />
        <CardLink href="/counseling/follow-ups" title="🔔 Follow-up Reminders" />
      </div>
    </main>
  );
}

function CardLink({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} className="block bg-white dark:bg-slate-900 text-center p-6 rounded-2xl shadow-md hover:shadow-lg transition text-yellow-300 text-lg font-semibold">
      {title}
      <ArrowRight className="inline-block ml-2 w-4 h-4" />
    </Link>
  );
}
