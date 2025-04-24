'use client';

import { useEffect, useState } from 'react';
import { fetchResourceEquipment } from 'lib/api';
import {
  Wrench,
  Laptop2,
  Stethoscope,
  Loader2,
  Search,
  ShieldCheck,
} from 'lucide-react';

type Equipment = {
  id: number;
  name: string;
  description: string;
};

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchResourceEquipment();
        setEquipment(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const getIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('laptop')) return <Laptop2 className="text-sky-600" />;
    if (lower.includes('stethoscope')) return <Stethoscope className="text-emerald-600" />;
    return <Wrench className="text-gray-600" />;
  };

  const filtered = equipment.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 px-6 py-10">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">🔍 Equipment Inventory</h1>
          <p className="text-gray-500 mt-1">
            Browse and manage all technical and medical equipment
          </p>
        </div>
        <div className="relative mt-4 sm:mt-0">
          <input
            type="text"
            placeholder="Search equipment..."
            className="w-72 border border-gray-300 rounded-lg px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-5 flex flex-col gap-4 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  {getIcon(item.name)}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-auto text-sm text-gray-500">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Status: <span className="text-green-600 font-medium">Available</span></span>
              </div>
            </div>
          ))}
        </section>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center text-gray-400 mt-16">
          <Wrench className="mx-auto w-12 h-12 mb-4" />
          <p className="text-lg font-medium">No equipment found</p>
          <p className="text-sm">Try adjusting your search or check back later</p>
        </div>
      )}
    </main>
  );
}
