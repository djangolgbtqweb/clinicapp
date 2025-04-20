'use client';

import Link from 'next/link';
import { ArrowLeft, Baby, Syringe, Ruler, Heart } from 'lucide-react';

const sections = [
  {
    title: 'Antenatal/Postnatal',
    href: '/maternal-child/antenatal-postnatal',
    icon: <Baby className="w-5 h-5 text-blue-500" />,
  },
  {
    title: 'Vaccinations',
    href: '/maternal-child/vaccinations',
    icon: <Syringe className="w-5 h-5 text-green-500" />,
  },
  {
    title: 'Growth Monitoring',
    href: '/maternal-child/growth-monitoring',
    icon: <Ruler className="w-5 h-5 text-yellow-500" />,
  },
  {
    title: 'Family Planning',
    href: '/maternal-child/family-planning',
    icon: <Heart className="w-5 h-5 text-pink-500" />,
  },
];

export default function MaternalChildLandingPage() {
  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* Back Button */}
      <header className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="text-sm text-pink-600 flex items-center hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100">
          Maternal & Child Health
        </h1>
      </header>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Select a service area below to proceed.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-md transition"
          >
            <div>{section.icon}</div>
            <div>
              <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
                {section.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Go to {section.title.toLowerCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
