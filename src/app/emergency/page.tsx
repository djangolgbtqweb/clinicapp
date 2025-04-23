"use client";

import Link from 'next/link';
import { useEffect, useState } from "react";
import {
  fetchEmergencyCases,
  fetchTriageLogs,
  fetchEmergencyReferrals,
  fetchFirstAidInventory,
} from "lib/api";
import { AlertTriangle, Stethoscope, Truck, PackageCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function EmergencyLandingPage() {
  const [emergencyCases, setEmergencyCases] = useState<any[]>([]);
  const [triageLogs, setTriageLogs] = useState<any[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cases, triage, refs, inv] = await Promise.all([
          fetchEmergencyCases(),
          fetchTriageLogs(),
          fetchEmergencyReferrals(),
          fetchFirstAidInventory(),
        ]);
        setEmergencyCases(cases);
        setTriageLogs(triage);
        setReferrals(refs);
        setInventory(inv);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) 
    return <div className="p-8 text-center text-gray-600 text-lg animate-pulse">🔄 Loading Emergency Department data…</div>;
  if (error) 
    return <div className="p-8 text-center text-red-600 text-lg">❌ {error}</div>;

  return (
    <div className="p-6 md:p-10 space-y-10 bg-gray-100 min-h-screen">

      <div className="flex justify-end">
        <Link
          href="/"
          className="text-pink-700 hover:text-purple-800 font-bold bg-white/70 hover:bg-white/90 px-4 py-2 rounded transition"
        >
          ← Back to Clinic System
        </Link>
      </div>

      <motion.h1
        className="text-4xl font-extrabold text-center text-red-700"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🏥 Emergency Department Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Cases" value={emergencyCases.length} icon={<AlertTriangle className="text-red-500" size={28} />} />
        <SummaryCard title="Triage Logs" value={triageLogs.length} icon={<Stethoscope className="text-indigo-600" size={28} />} />
        <SummaryCard title="Referrals" value={referrals.length} icon={<Truck className="text-blue-600" size={28} />} />
        <SummaryCard title="Inventory" value={inventory.length} icon={<PackageCheck className="text-green-600" size={28} />} />
      </div>

      {/* Emergency Cases */}
      <Section title="🚨 Emergency Cases">
        <CardGrid
          data={emergencyCases}
          renderItem={(c) => (
            <Card key={c.id}>
              <p><strong>Patient:</strong> {c.patient_name}</p>
              <p><strong>Condition:</strong> {c.condition}</p>
              <p className="text-sm text-gray-500">
                <strong>Arrived:</strong> {new Date(c.arrival_time).toLocaleString()}
              </p>
            </Card>
          )}
          fallback="🚨 No emergency cases reported at the moment. Immediate visibility is critical in urgent care situations."
        />
      </Section>

      {/* Triage Logs */}
      <Section title="🩺 Triage Logs">
        <CardGrid
          data={triageLogs}
          renderItem={(log) => (
            <Card key={log.id}>
              <p><strong>Patient:</strong> {log.emergency_case.patient_name}</p>
              <p><strong>Notes:</strong> {log.triage_notes}</p>
              <p className="text-sm text-gray-500">
                <strong>Time:</strong> {new Date(log.triage_time).toLocaleString()}
              </p>
            </Card>
          )}
          fallback="🩺 No triage logs found. Triage data is vital for quick medical decisions."
        />
      </Section>

      {/* Referrals */}
      <Section title="🚑 Referrals">
        <CardGrid
          data={referrals}
          renderItem={(r) => (
            <Card key={r.id}>
              <p><strong>Patient:</strong> {r.emergency_case.patient_name}</p>
              <p><strong>Facility:</strong> {r.facility_name}</p>
              <p><strong>Reason:</strong> {r.reason}</p>
              <p className="text-sm text-gray-500">
                <strong>On:</strong> {new Date(r.referred_on).toLocaleString()}
              </p>
            </Card>
          )}
          fallback="🚑 No referrals made. Referral tracking ensures smooth patient transitions."
        />
      </Section>

      {/* First Aid Inventory */}
      <Section title="🧰 First Aid Inventory">
        <CardGrid
          data={inventory}
          renderItem={(item) => (
            <Card key={item.id}>
              <p><strong>Item:</strong> {item.item_name}</p>
              <p><strong>Qty:</strong> {item.quantity}</p>
              <p className="text-sm text-gray-500">
                <strong>Updated:</strong> {new Date(item.last_updated).toLocaleString()}
              </p>
            </Card>
          )}
          fallback="🧰 First Aid Inventory is empty or not updated. Supply readiness is essential during emergencies."
        />
      </Section>

    </div>
  );
}

// — reusable components —

const SummaryCard = ({ title, value, icon }: { title: string; value: number; icon: JSX.Element }) => (
  <motion.div
    className="p-5 bg-white shadow-lg rounded-2xl flex items-center justify-between"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
  >
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className="p-2 bg-gray-100 rounded-full">
      {icon}
    </div>
  </motion.div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-2xl font-bold mb-4 text-gray-700">{title}</h2>
    {children}
  </section>
);

const CardGrid = ({
  data,
  renderItem,
  fallback,
}: {
  data: any[];
  renderItem: (item: any) => JSX.Element;
  fallback: string;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {data.length > 0 ? data.map(renderItem) : (
      <div className="col-span-full bg-white border-l-4 border-red-500 p-4 rounded-lg shadow text-center">
        <p className="text-red-600 text-lg font-semibold mb-1">⚠️ Attention Needed</p>
        <p className="text-gray-700">{fallback}</p>
      </div>
    )}
  </div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
    whileHover={{ scale: 1.02 }}
  >
    {children}
  </motion.div>
);

