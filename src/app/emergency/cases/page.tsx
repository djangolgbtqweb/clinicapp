"use client";

import { useEffect, useState } from "react";
import { fetchEmergencyCases } from "lib/api";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function EmergencyCasesPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCases = async () => {
      try {
        const data = await fetchEmergencyCases();
        setCases(data);
      } catch (err: any) {
        setError(err.message || "Failed to load cases.");
      } finally {
        setLoading(false);
      }
    };
    loadCases();
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-600 text-lg animate-pulse">🚑 Fetching emergency cases...</div>;
  if (error) return <div className="p-10 text-center text-red-600 text-lg">❌ {error}</div>;

  return (
    <div className="bg-gradient-to-br from-red-100 to-white min-h-screen p-6 md:p-10">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-center text-red-700 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🚨 All Emergency Cases
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.length > 0 ? (
          cases.map((item: any, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500 relative overflow-hidden"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="absolute top-0 right-0 p-2 text-red-600 text-xl animate-pulse">
                <AlertTriangle />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.patient_name}</h3>
              <p className="text-gray-700 mb-1"><strong>Condition:</strong> {item.condition}</p>
              <p className="text-sm text-gray-500 mb-1"><strong>Reported:</strong> {item.created_at}</p>
              <SeverityBadge condition={item.condition} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center bg-white p-6 rounded-xl shadow text-gray-600 border-l-4 border-red-400">
            <p className="text-2xl font-semibold text-red-500 mb-2">🚨 No Emergency Cases Found</p>
            <p>Please ensure reports are being logged from the triage or ER desk.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const SeverityBadge = ({ condition }: { condition: string }) => {
  const critical = /critical|serious|severe/i.test(condition);
  const urgent = /urgent|unstable|moderate/i.test(condition);
  const badgeClass = critical
    ? "bg-red-600 text-white"
    : urgent
    ? "bg-yellow-500 text-white"
    : "bg-green-500 text-white";

  const label = critical
    ? "🔴 Critical"
    : urgent
    ? "🟡 Urgent"
    : "🟢 Stable";

  return (
    <span className={`inline-block mt-3 px-3 py-1 text-sm rounded-full font-medium ${badgeClass}`}>
      {label}
    </span>
  );
};
