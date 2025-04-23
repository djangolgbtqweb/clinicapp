"use client";

import { useEffect, useState } from "react";
import { fetchReferrals } from "lib/api";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReferrals = async () => {
      try {
        const data = await fetchReferrals();
        setReferrals(data);
      } catch (err: any) {
        setError(err.message || "Failed to load referrals.");
      } finally {
        setLoading(false);
      }
    };
    loadReferrals();
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-600 text-lg animate-pulse">🚑 Fetching referrals...</div>;
  if (error) return <div className="p-10 text-center text-red-600 text-lg">❌ {error}</div>;

  return (
    <div className="bg-gradient-to-br from-blue-100 to-white min-h-screen p-6 md:p-10">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-center text-blue-700 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🏥 Referrals
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {referrals.length > 0 ? (
          referrals.map((item: any, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 relative overflow-hidden"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="absolute top-0 right-0 p-2 text-blue-600 text-xl animate-pulse">
                <AlertTriangle />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.facility_name}</h3>
              <p className="text-gray-700 mb-1"><strong>Patient:</strong> {item.emergency_case.patient_name}</p>
              <p className="text-sm text-gray-500 mb-1"><strong>Reason:</strong> {item.reason}</p>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center bg-white p-6 rounded-xl shadow text-gray-600 border-l-4 border-blue-400">
            <p className="text-2xl font-semibold text-blue-500 mb-2">🏥 No Referrals Found</p>
            <p>Please ensure that referrals are being logged from the ER.</p>
          </div>
        )}
      </div>
    </div>
  );
}
