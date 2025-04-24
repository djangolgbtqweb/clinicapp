'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  fetchRooms,
  fetchRoomAssignments,
  fetchResourceEquipment,
  fetchEquipmentBookings,
} from 'lib/api';

export default function ResourceManagementDashboard() {
  const [counts, setCounts] = useState({
    rooms: 0,
    assignments: 0,
    equipment: 0,
    bookings: 0,
  });

  useEffect(() => {
    Promise.all([
      fetchRooms().then((d) => d.length),
      fetchRoomAssignments().then((d) => d.length),
      fetchResourceEquipment().then((d) => d.length),
      fetchEquipmentBookings().then((d) => d.length),
    ]).then(([rooms, assignments, equipment, bookings]) => {
      setCounts({ rooms, assignments, equipment, bookings });
    });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md h-full p-6 border-r">
        <h2 className="text-2xl font-bold text-blue-800 mb-8">📦 Resource Hub</h2>
        <nav className="space-y-4 text-gray-700 text-sm">
          <Link href="/resource_management/rooms" className="hover:text-blue-600 block">
            Facility Rooms
          </Link>
          <Link href="/resource_management/room-assignments" className="hover:text-blue-600 block">
            Room Assignments
          </Link>
          <Link href="/resource_management/equipment" className="hover:text-blue-600 block">
            Equipment Inventory
          </Link>
          <Link href="/resource_management/equipment-bookings" className="hover:text-blue-600 block">
            Booking Requests
          </Link>
        </nav>
      </aside>

      {/* Main Panel */}
      <div className="flex flex-col flex-grow">
        {/* Topbar */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between border-b">
          <h1 className="text-2xl font-bold text-gray-800">Resource Management Dashboard</h1>
          <input
            type="text"
            placeholder="Search resources..."
            className="border px-3 py-2 rounded-md shadow-sm w-64 focus:outline-none"
          />
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6 overflow-auto">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
              <p className="text-sm text-gray-600">Total Rooms</p>
              <p className="text-3xl font-bold text-gray-900">{counts.rooms}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-emerald-500">
              <p className="text-sm text-gray-600">Assignments Today</p>
              <p className="text-3xl font-bold text-gray-900">{counts.assignments}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
              <p className="text-sm text-gray-600">Available Equipment</p>
              <p className="text-3xl font-bold text-gray-900">{counts.equipment}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-pink-500">
              <p className="text-sm text-gray-600">Active Bookings</p>
              <p className="text-3xl font-bold text-gray-900">{counts.bookings}</p>
            </div>
          </div>

          {/* Calendar Placeholder */}
          <div className="bg-white rounded-lg shadow p-6 h-64 flex items-center justify-center text-gray-500 text-lg">
            📅 Resource Booking Calendar Coming Soon...
          </div>
        </main>
      </div>
    </div>
  );
}
