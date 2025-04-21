'use client';

import Link from 'next/link';
import { ClipboardList, Stethoscope, PackageSearch, HeartPulse } from 'lucide-react';

export default function MinorTheaterHome() {
  const sections = [
    {
      name: 'Surgery Schedules',
      path: '/minor-theater/surgeries',
      description: 'Manage scheduled surgeries for patients.',
      icon: <ClipboardList className="text-teal-700 w-6 h-6" />,
    },
    {
      name: 'Operation Records',
      path: '/minor-theater/operation-records',
      description: 'Log detailed operation notes and outcomes.',
      icon: <Stethoscope className="text-indigo-700 w-6 h-6" />,
    },
    {
      name: 'Equipment Tracking',
      path: '/minor-theater/equipment',
      description: 'Track equipment usage and conditions.',
      icon: <PackageSearch className="text-blue-700 w-6 h-6" />,
    },
    {
      name: 'Post-Op Follow-Ups',
      path: '/minor-theater/post-op-followups',
      description: 'Monitor recovery progress and appointments.',
      icon: <HeartPulse className="text-rose-700 w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-3">
          Minor Theater Module
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {sections.map((section) => (
            <Link
              key={section.name}
              href={section.path}
              className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-gray-100 rounded-md group-hover:scale-105 transition-transform">
                  {section.icon}
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {section.name}
                </h2>
              </div>
              <p className="text-sm text-gray-600">{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


