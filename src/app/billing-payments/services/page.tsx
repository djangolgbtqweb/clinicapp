'use client';

import { useState, useEffect } from 'react';
import { fetchServices } from 'lib/api';

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch((err) => console.error('Error loading services:', err));
  }, []);

  return (
    <main className="p-8 bg-blue-50">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Services</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Patient ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Patient Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Service</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-6 py-4 whitespace-nowrap">{s.patient ?? '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{s.patient_name ?? '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{s.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">Ksh {s.price}</td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}



