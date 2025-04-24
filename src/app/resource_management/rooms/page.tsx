'use client';

import { useEffect, useState } from 'react';
import { fetchRooms } from 'lib/api';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

type Room = {
  id: number;
  name: string;
  room_type: string;
  is_occupied: boolean;
};

const roomTypeColors: Record<string, string> = {
  Consultation: 'bg-blue-100 text-blue-800',
  Lab: 'bg-yellow-100 text-yellow-800',
  Theater: 'bg-red-100 text-red-800',
  Inpatient: 'bg-green-100 text-green-800',
};

export default function RoomListPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms()
      .then(setRooms)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="p-6 border-b bg-white shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800">🏢 Facility Rooms</h1>
        <p className="text-sm text-gray-500">Track all clinic rooms and their status.</p>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            Showing {rooms.length} {rooms.length === 1 ? 'room' : 'rooms'}
          </div>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Room
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <tr>
                <th className="px-6 py-3">Room Name</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                    Loading rooms...
                  </td>
                </tr>
              ) : rooms.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                    No rooms found.
                  </td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{room.name}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${roomTypeColors[room.room_type] || 'bg-gray-100 text-gray-800'}`}
                      >
                        {room.room_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          room.is_occupied
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {room.is_occupied ? 'Occupied' : 'Available'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
