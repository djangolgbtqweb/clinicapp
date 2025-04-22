'use client';

import { useEffect, useState } from 'react';
import { fetchSupplements } from 'lib/api';
import Link from 'next/link';

type Supplement = {
  id: number;
  patient_name: string;
  supplement_name: string;
  dosage: string;
  duration: string;
};

export default function SupplementsPage() {
  const [supplements, setSupplements] = useState<Supplement[]>([]);

  const fetchSupplementData = async () => {
    try {
      const data = await fetchSupplements();
      setSupplements(data);
    } catch (error) {
      console.error('Error fetching supplements:', error);
    }
  };

  useEffect(() => {
    fetchSupplementData();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-100 px-6 md:px-24 py-10 overflow-hidden">
        <div className="flex justify-end">
    <Link href="/nutrition" className="text-black hover:text-purple-800 font-bold text-bg bg-white/70 hover:bg-white/90 px-4 py-2 transition duration-200">
      ← Back to Nutrition
    </Link>
  </div>
      {/* Hero Section */}
      <section className="relative text-center py-10 px-6 rounded-[4rem] bg-gradient-to-br from-green-200 via-white to-green-100 shadow-2xl overflow-hidden">
        <div className="absolute top-[-4rem] left-[-4rem] w-[200px] h-[200px] bg-green-300 rounded-full blur-3xl opacity-30 z-0 animate-pulse"></div>
        <div className="absolute bottom-[-4rem] right-[-4rem] w-[250px] h-[250px] bg-blue-200 rounded-full blur-2xl opacity-30 z-0 animate-pulse"></div>

        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold text-purple-400 drop-shadow-lg">
            Supplements Tracking
          </h1>
          <p className="mt-1 text-black text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Monitor and manage your patients' supplement prescriptions with ease.
          </p>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="w-full -mt-10">
        <svg viewBox="0 0 1440 150" className="w-full h-24 fill-green-100">
          <path d="M0,32L60,58.7C120,85,240,139,360,149.3C480,160,600,128,720,106.7C840,85,960,75,1080,74.7C1200,75,1320,85,1380,90.7L1440,96V0H0Z" />
        </svg>
      </div>

      {/* Supplements Records Section */}
      <section className="px-6 md:px-24 mt-20 space-y-8">
        <h2 className="text-4xl font-bold text-purple-600 mb-6 tracking-tight">Patient Supplement Prescriptions</h2>

        {supplements.length === 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white via-blue-50 to-green-50 p-6 rounded-3xl shadow-2xl border border-white/70"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-400">👤 Name</h3>
                    <p className="text-sm text-gray-400">🆔 ID</p>
                  </div>
                  <div className="text-4xl text-gray-300">💊</div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-4 text-sm font-medium text-gray-500">
                  <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl border border-gray-200 shadow-inner">
                    <p className="text-green-600 text-sm font-semibold mb-1">Supplement Name</p>
                    <p className="text-lg font-bold text-gray-400">--</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl border border-gray-200 shadow-inner">
                    <p className="text-blue-600 text-sm font-semibold mb-1">Dosage</p>
                    <p className="text-lg font-bold text-gray-400">--</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/50 rounded-xl shadow-inner border border-gray-100 text-sm text-gray-600">
                  <p className="font-semibold text-gray-500 mb-1">Duration</p>
                  <p className="text-gray-400 italic">--</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {supplements.map((supplement) => (
              <div
                key={supplement.id}
                className="bg-gradient-to-br from-white via-blue-50 to-green-50 p-6 rounded-3xl shadow-2xl transform transition-transform hover:-translate-y-1 hover:shadow-3xl border border-white/70"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-purple-700">{supplement.patient_name}</h3>
                    <p className="text-sm text-gray-500">🆔 ID {supplement.id}</p>
                  </div>
                  <div className="text-4xl text-green-400">💊</div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-4 text-sm font-medium text-gray-700">
                  <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl border border-gray-200 shadow-inner">
                    <p className="text-green-600 text-sm font-semibold mb-1">Supplement Name</p>
                    <p className="text-lg font-bold">{supplement.supplement_name}</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl border border-gray-200 shadow-inner">
                    <p className="text-blue-600 text-sm font-semibold mb-1">Dosage</p>
                    <p className="text-lg font-bold">{supplement.dosage}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/50 rounded-xl shadow-inner border border-gray-100 text-sm text-gray-600">
                  <p className="font-semibold text-gray-700 mb-1">Duration</p>
                  <p>{supplement.duration}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(15px) scale(1.05);
          }
        }

        .animate-blob {
          animation: blob 6s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </main>
  );
}
