'use client';

import { useEffect, useState } from 'react';
import { fetchRoomAssignments, fetchRooms } from 'lib/api';
import { CalendarDays, User2, Search, Loader2, DoorOpen } from 'lucide-react';
import dayjs from 'dayjs';

type Room = {
  id: number;
  name: string;
  room_type: string;
};

type Assignment = {
  id: number;
  room: number;
  staff_name: string;
  patient_name: string | null;
  date: string;
  time_slot: string;
};

export default function RoomAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [roomData, assignmentData] = await Promise.all([
          fetchRooms(),
          fetchRoomAssignments(),
        ]);
        setRooms(roomData);
        setAssignments(assignmentData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getRoomDetails = (id: number) => rooms.find((r) => r.id === id) || { name: 'Unknown', room_type: '' };

  const filteredAssignments = assignments.filter((a) => {
    const room = getRoomDetails(a.room);
    return (
      room.name.toLowerCase().includes(search.toLowerCase()) ||
      a.staff_name.toLowerCase().includes(search.toLowerCase()) ||
      a.patient_name?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">🗓️ Room Assignments</h1>
          <p className="text-gray-500 mt-1">Overview of all room assignments with staff & patient mapping</p>
        </div>
        <div className="relative mt-4 sm:mt-0">
          <input
            type="text"
            className="w-80 border border-gray-300 rounded-lg px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Search staff, patient, or room..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAssignments.map((a) => {
            const room = getRoomDetails(a.room);
            const isToday = dayjs(a.date).isSame(dayjs(), 'day');

            return (
              <div
                key={a.id}
                className="bg-white border border-gray-200 rounded-xl shadow-md p-5 flex flex-col gap-3 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                      <DoorOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{room.name}</h2>
                      <p className="text-sm text-gray-500">{room.room_type}</p>
                    </div>
                  </div>
                  {isToday && (
                    <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">Today</span>
                  )}
                </div>

                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <p className="flex items-center gap-2">
                    <User2 className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">Staff:</span> {a.staff_name}
                  </p>
                  {a.patient_name && (
                    <p className="flex items-center gap-2">
                      <User2 className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Patient:</span> {a.patient_name}
                    </p>
                  )}
                  <p className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">Date:</span> {dayjs(a.date).format('DD MMM YYYY')}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-medium">Time:</span> {a.time_slot}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {!loading && filteredAssignments.length === 0 && (
        <div className="text-center text-gray-400 mt-16">
          <CalendarDays className="mx-auto w-12 h-12 mb-4" />
          <p className="text-lg font-medium">No assignments found</p>
          <p className="text-sm">Try adjusting your search or check back later</p>
        </div>
      )}
    </main>
  );
}
