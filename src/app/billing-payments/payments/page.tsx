'use client';
import { useState,useEffect } from 'react';
import { fetchPayments } from 'lib/api';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  useEffect(() => { fetchPayments().then(setPayments).catch(console.error); }, []);
  return (
    <main className="p-8 bg-purple-50">
      <h1 className="text-2xl mb-4">Payments</h1>
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-100"><tr><th>Invoice</th><th>Amount</th><th>Method</th></tr></thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <td>{p.invoice}</td>
              <td>Ksh {p.amount_paid}</td>
              <td>{p.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
