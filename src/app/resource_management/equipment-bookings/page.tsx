'use client';

import { useEffect, useState } from 'react';
import { fetchEquipmentBookings, fetchResourceEquipment } from 'lib/api';
import { CalendarCheck2, Search, Loader2, Wrench, Laptop2, Stethoscope } from 'lucide-react';
import dayjs from 'dayjs';

type Booking = {
  id: number;
  equipment: number;
  booked_by: string;
  date: string;
  time_slot: string;
};

type Equipment = {
  id: number;
  name: string;
  description: string;
};

export default function EquipmentBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [bookingsData, equipmentData] = await Promise.all([
          fetchEquipmentBookings(),
          fetchResourceEquipment(),
        ]);
        setBookings(bookingsData);
        setEquipment(equipmentData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getEquipmentDetails = (id: number) =>
    equipment.find((e) => e.id === id) || { name: 'Unknown', description: '' };

  const filteredBookings = bookings.filter((booking) => {
    const eq = getEquipmentDetails(booking.equipment);
    return (
      eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.booked_by.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getIconForEquipment = (name: string) => {
    if (name.toLowerCase().includes('laptop')) return <Laptop2 className="text-sky-600" />;
    if (name.toLowerCase().includes('stethoscope')) return <Stethoscope className="text-emerald-600" />;
    return <Wrench className="text-gray-600" />;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 px-6 py-10">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">🔧 Equipment Bookings</h1>
          <p className="text-gray-500">Track usage and availability of critical equipment</p>
        </div>
        <div className="relative w-72">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Search by equipment or staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader2 className="animate-spin h-8 w-8 text-indigo-500" />
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBookings.map((booking) => {
            const equipmentInfo = getEquipmentDetails(booking.equipment);
            const isToday = dayjs(booking.date).isSame(dayjs(), 'day');
            return (
              <div
                key={booking.id}
                className="bg-white border border-gray-200 rounded-lg shadow-md p-5 flex flex-col gap-2 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 rounded-full p-2">
                      {getIconForEquipment(equipmentInfo.name)}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">{equipmentInfo.name}</h2>
                      <p className="text-sm text-gray-500">{equipmentInfo.description}</p>
                    </div>
                  </div>
                  {isToday && (
                    <span className="text-xs text-white bg-green-500 px-2 py-1 rounded-full">Today</span>
                  )}
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Booked By:</span> {booking.booked_by}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{' '}
                    {dayjs(booking.date).format('DD MMM YYYY')}
                  </p>
                  <p>
                    <span className="font-medium">Time Slot:</span> {booking.time_slot}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {!loading && filteredBookings.length === 0 && (
        <div className="text-center text-gray-400 mt-16">
          <CalendarCheck2 className="mx-auto w-12 h-12 mb-4" />
          <p className="text-lg font-medium">No bookings found</p>
          <p className="text-sm">Try adjusting your search or check back later</p>
        </div>
      )}
    </main>
  );
}
