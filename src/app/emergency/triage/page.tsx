"use client";

import { useEffect, useState } from "react";
import { fetchTriageLogs } from "lib/api";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function TriagePage() {
  const [triageLogs, setTriageLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTriageLogs = async () => {
      try {
        const data = await fetchTriageLogs();
        setTriageLogs(data);
      } catch (err: any) {
        setError(err.message || "Failed to load triage logs.");
      } finally {
        setLoading(false);
      }
    };
    loadTriageLogs();
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-600 text-lg animate-pulse">🚑 Fetching triage logs...</div>;
  if (error) return <div className="p-10 text-center text-red-600 text-lg">❌ {error}</div>;

  return (
    <div className="bg-gradient-to-br from-yellow-100 to-white min-h-screen p-6 md:p-10">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-center text-yellow-700 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🩺 Triage Logs
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {triageLogs.length > 0 ? (
          triageLogs.map((item: any, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 relative overflow-hidden"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="absolute top-0 right-0 p-2 text-yellow-600 text-xl animate-pulse">
                <AlertTriangle />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.triaged_by}</h3>
              <p className="text-gray-700 mb-1"><strong>Patient:</strong> {item.emergency_case.patient_name}</p>
              <p className="text-sm text-gray-500 mb-1"><strong>Triage Notes:</strong> {item.triage_notes}</p>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center bg-white p-6 rounded-xl shadow text-gray-600 border-l-4 border-yellow-400">
            <p className="text-2xl font-semibold text-yellow-500 mb-2">🩺 No Triage Logs Found</p>
            <p>Please ensure that triage logs are being recorded by the staff.</p>
          </div>
        )}
      </div>
    </div>
  );
}
