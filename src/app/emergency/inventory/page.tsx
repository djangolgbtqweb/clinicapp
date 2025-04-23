"use client";

import { useEffect, useState } from "react";
import { fetchInventoryItems } from "lib/api"; // Make sure you have an appropriate API function for inventory
import { motion } from "framer-motion";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const data = await fetchInventoryItems();
        setItems(data);
      } catch (err: any) {
        setError(err.message || "Failed to load inventory.");
      } finally {
        setLoading(false);
      }
    };
    loadInventory();
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-600 text-lg animate-pulse">🛠️ Fetching inventory...</div>;
  if (error) return <div className="p-10 text-center text-red-600 text-lg">❌ {error}</div>;

  return (
    <div className="bg-gradient-to-br from-green-100 to-white min-h-screen p-6 md:p-10">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-center text-green-700 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🏥 First Aid Inventory
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length > 0 ? (
          items.map((item: any, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 relative overflow-hidden"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.item_name}</h3>
              <p className="text-gray-700 mb-1"><strong>Quantity:</strong> {item.quantity}</p>
              <p className="text-sm text-gray-500 mb-1"><strong>Last Updated:</strong> {item.last_updated}</p>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center bg-white p-6 rounded-xl shadow text-gray-600 border-l-4 border-green-400">
            <p className="text-2xl font-semibold text-green-500 mb-2">🛠️ No Inventory Items Found</p>
            <p>Please ensure inventory items are added to the system.</p>
          </div>
        )}
      </div>
    </div>
  );
}
