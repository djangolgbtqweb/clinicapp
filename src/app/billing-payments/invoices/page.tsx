'use client';
import { useState,useEffect } from 'react';
import { fetchInvoices } from 'lib/api';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  useEffect(() => { fetchInvoices().then(setInvoices).catch(console.error); }, []);
  return (
    <main className="p-8 bg-green-50">
      <h1 className="text-2xl mb-4">Invoices</h1>
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-100"><tr><th>Patient</th><th>Date</th><th>Total</th><th>Paid</th></tr></thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.patient.name || inv.patient}</td>
              <td>{inv.date}</td>
              <td>Ksh {inv.total_amount}</td>
              <td>{inv.paid ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

