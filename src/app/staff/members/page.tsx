'use client';

import { useEffect, useState } from 'react';
import { fetchStaffMembers } from 'lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  contact_info: string;
  profile_picture: string | null;
  date_joined: string;
}

export default function StaffMembersPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState<string | null>(null);

  useEffect(() => {
    fetchStaffMembers()
      .then(setStaff)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading staff members…
      </div>
    );
  }

  const groupedStaff = staff.reduce((acc, member) => {
    const role = member.role.toLowerCase();
    if (!acc[role]) acc[role] = [];
    acc[role].push(member);
    return acc;
  }, {} as { [key: string]: StaffMember[] });

  const roles = ['doctor', 'nurse', 'labtech', 'admin'];

  return (
    <div className="flex bg-black text-white min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-black border-r border-gray-900 p-6 flex flex-col">
        <Link
          href="/staff"
          className="flex items-center text-white hover:text-white mb-10 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Link>
        <h2 className="text-2xl font-bold mb-6 text-white">Roles</h2>
        <ul className="space-y-4">
          {roles.map((role) => (
            <li key={role}>
              <button
                onClick={() =>
                  setActiveRole((prev) => (prev === role ? null : role))
                }
                className={`w-full text-left text-lg font-semibold rounded-md px-3 py-2 transition-colors ${
                  activeRole === role
                    ? 'bg-black text-blue-400'
                    : 'text-gray-400 hover:text-white hover:bg-black'
                }`}
              >
                {role === 'labtech'
                  ? 'Lab Technician'
                  : role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-4xl font-extrabold mb-12 text-center">
          {activeRole
            ? `${
                activeRole === 'labtech'
                  ? 'Lab Technicians'
                  : activeRole.charAt(0).toUpperCase() + activeRole.slice(1)
              }`
            : 'All Staff Members'}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeRole
            ? groupedStaff[activeRole] || []
            : staff
          ).map((member) => (
            <div
              key={member.id}
              className="bg-black rounded-xl p-6 flex flex-col items-center hover:bg-black transition"
            >
           
              {/* Profile Image or Initial */}
              {member.profile_picture ? (
                <img
                  src={member.profile_picture}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4 text-2xl text-white shadow-lg">
                  {member.name.charAt(0)}
                </div>
              )}

              {/* Staff Info */}
              <h3 className="text-lg font-bold mb-1">{member.name}</h3>
              <p className="text-sm text-gray-400 capitalize">
                {member.role === 'labtech'
                  ? 'Lab Technician'
                  : member.role}
              </p>
              <p className="text-xs text-gray-500 mt-2">{member.contact_info}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

