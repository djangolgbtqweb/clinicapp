'use client';

import Link from 'next/link';
import { FaAppleAlt, FaCarrot, FaPills, FaHeartbeat } from 'react-icons/fa';

export default function NutritionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-lime-50 via-white to-green-50 pb-20">
      {/* Back to Dashboard Link */}
      <div className="flex justify-front px-6 py-4">
        <Link href="/" className="text-black hover:text-purple-800 font-bold text-bg bg-white/70 hover:bg-white/90 px-4 py-2 transition duration-200">
          ← Back Clinic System
        </Link>
      </div>

      {/* Hero Section */}
      <section className="text-center py-16 px-6 bg-green-100 rounded-b-[3rem] shadow-inner">
        <h1 className="text-5xl font-extrabold text-green-900">🥗 Nutrition Hub</h1>
        <p className="mt-4 text-green-800 text-lg max-w-xl mx-auto">
          Personalized guidance for balanced living and vibrant health.
        </p>
      </section>

      {/* Wave Divider */}
      <div className="w-full -mt-10">
        <svg viewBox="0 0 1440 150" className="w-full h-24 fill-green-100">
          <path d="M0,32L60,58.7C120,85,240,139,360,149.3C480,160,600,128,720,106.7C840,85,960,75,1080,74.7C1200,75,1320,85,1380,90.7L1440,96V0H0Z" />
        </svg>
      </div>

      <section className="px-6 md:px-24 mt-20">
        <div className="flex flex-col gap-18">
          {/* Dietary Assessments */}
          <div>
            <Link href="/nutrition/dietary-assessments">
              <div className="group flex items-center justify-between border-b-2 border-lime-400 pb-2 hover:pl-2 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <FaAppleAlt className="text-lime-600 group-hover:scale-110 transition" size={22} />
                  <h3 className="text-xl font-semibold text-lime-800">Dietary Assessments</h3>
                </div>
                <span className="text-sm text-gray-500">Explore →</span>
              </div>
            </Link>
          </div>

          {/* Meal Plans */}
          <div>
            <Link href="/nutrition/meal-plans">
              <div className="group flex items-center justify-between border-b-2 border-orange-400 pb-2 hover:pl-2 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <FaCarrot className="text-orange-600 group-hover:scale-110 transition" size={22} />
                  <h3 className="text-xl font-semibold text-orange-800">Meal Plans</h3>
                </div>
                <span className="text-sm text-gray-500">Customize →</span>
              </div>
            </Link>
          </div>

          {/* Supplements */}
          <div>
            <Link href="/nutrition/supplements">
              <div className="group flex items-center justify-between border-b-2 border-pink-400 pb-2 hover:pl-2 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <FaPills className="text-pink-600 group-hover:scale-110 transition" size={22} />
                  <h3 className="text-xl font-semibold text-pink-800">Supplements</h3>
                </div>
                <span className="text-sm text-gray-500">Manage →</span>
              </div>
            </Link>
          </div>

          {/* Progress Monitoring */}
          <div>
            <Link href="/nutrition/progress">
              <div className="group flex items-center justify-between border-b-2 border-purple-400 pb-2 hover:pl-2 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <FaHeartbeat className="text-purple-600 group-hover:scale-110 transition" size={22} />
                  <h3 className="text-xl font-semibold text-purple-800">Progress Monitoring</h3>
                </div>
                <span className="text-sm text-gray-500">Track →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}



