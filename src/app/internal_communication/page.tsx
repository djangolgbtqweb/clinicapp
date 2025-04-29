'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  Bell,
  Clock,
  MessageSquare
} from 'lucide-react';

export default function InternalCommLanding() {
  const sections = [
    { label: 'Notices', href: '/internal_communication/notices', Icon: Bell, desc: 'Publish and browse official notices' },
    { label: 'Shift Updates', href: '/internal_communication/shift-updates', Icon: Clock, desc: 'View latest shift change logs' },
    { label: 'Admin Messages', href: '/internal_communication/messages', Icon: MessageSquare, desc: 'Send and receive admin memos' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-black text-white flex flex-col">
      {/* Back to Dashboard */}
      <header className="p-6 flex items-center space-x-3">
        <Link href="/" className="flex items-center text-gray-400 hover:text-white transition">
          <ArrowLeft className="w-5 h-5" />
          <span className="ml-2 text-lg">Back to Dashboard</span>
        </Link>
      </header>

      {/* Title */}
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-5xl font-extrabold text-center mb-12">Internal Communication</h1>

        {/* Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 lg:px-24">
          {sections.map(({ label, href, Icon, desc }) => (
            <Link
              key={href}
              href={href}
              className="group block bg-black rounded-2xl p-8 text-center hover:bg-black transition transform hover:scale-[1.03] duration-300 shadow-lg"
            >
              <div className="flex justify-center mb-4">
                <Icon className="w-12 h-12 text-blue-400 group-hover:text-blue-300 transition" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">{label}</h2>
              <p className="text-gray-400 mb-6">{desc}</p>
              <div className="inline-flex items-center text-blue-300 group-hover:text-blue-200 font-medium">
                Go to {label}
                <ArrowLeft className="w-4 h-4 rotate-180 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Your Clinic Name
      </footer>
    </div>
  );
}
