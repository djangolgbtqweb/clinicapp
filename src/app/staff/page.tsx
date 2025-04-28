'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  UserGroupIcon,
  CalendarIcon,
  BriefcaseIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function StaffLandingPage() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { href: '/staff/members', Icon: UserGroupIcon },
    { href: '/staff/duty-roster', Icon: CalendarIcon },
    { href: '/staff/leave-requests', Icon: BriefcaseIcon },
    { href: '/staff/on-call-schedule', Icon: PhoneIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Back to Dashboard */}
      <div className="p-4">
        <Link
          href="/"
          className="flex items-center text-white hover:text-gray-400 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center flex-col">
        <h1 className="text-4xl font-extrabold text-blue-400 mb-4">Staff Management</h1>
        <p className="text-lg text-gray-400 text-center mb-8">
          Manage your staff, view rosters, approve leave requests, and manage on-call schedules.
        </p>
      </main>

      {/* Bottom Navbar with Icons Only */}
      <nav className="sticky bottom-0 bg-black flex justify-around py-4">
        {navItems.map(({ href, Icon }) => (
          <Link key={href} href={href} className="flex justify-center items-center">
            <Icon
              className={`h-8 w-8 ${pathname === href ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
            />
          </Link>
        ))}
      </nav>
    </div>
  );
}
