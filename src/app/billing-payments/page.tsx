'use client';

import { useState, useEffect } from 'react';
import { fetchServices, fetchInvoices, fetchPayments } from 'lib/api';

export default function ClinicBillingDashboard() {
  const [services, setServices] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'services' | 'invoices' | 'payments'>('services');

  useEffect(() => {
    fetchServices().then(setServices).catch(console.error);
    fetchInvoices().then(setInvoices).catch(console.error);
    fetchPayments().then(setPayments).catch(console.error);
  }, []);

  const tabClasses = (tab: string) =>
    `cursor-pointer px-6 py-2 text-sm font-medium transition ${
      activeTab === tab
        ? 'text-white border-b-2 border-white'
        : 'text-gray-400 hover:text-white'
    }`;

  const tableBase = 'min-w-full text-left text-sm';
  const thBase = 'px-4 py-2 font-semibold text-gray-200 border-b border-gray-700';
  const tdBase = 'px-4 py-3 text-gray-100 border-b border-gray-700';
  const rowHover = 'group hover:bg-gray-800';

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-4 md:px-16">
      {/* Header */}
      <header className="w-full max-w-6xl border-b border-gray-700 pb-6 mb-10">
        <h1 className="text-4xl font-extrabold">Clinic Billing Overview</h1>
        <p className="mt-2 text-gray-400">Quick glance at your services, invoices, and payments</p>
      </header>

      {/* Stats Section */}
      <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-700 bg-gray-900 rounded-lg overflow-hidden shadow-lg mb-12">
        <div className="p-6 text-center">
          <p className="text-xs uppercase text-gray-400 mb-1">Total Services</p>
          <p className="text-3xl font-bold">{services.length}</p>
        </div>
        <div className="p-6 text-center">
          <p className="text-xs uppercase text-gray-400 mb-1">Total Invoices</p>
          <p className="text-3xl font-bold">{invoices.length}</p>
        </div>
        <div className="p-6 text-center">
          <p className="text-xs uppercase text-gray-400 mb-1">Total Payments</p>
          <p className="text-3xl font-bold">{payments.length}</p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <nav className="w-full max-w-6xl mb-8">
        <div className="flex justify-center space-x-4">
          <button onClick={() => setActiveTab('services')} className={tabClasses('services')}>
            Services
          </button>
          <button onClick={() => setActiveTab('invoices')} className={tabClasses('invoices')}>
            Invoices
          </button>
          <button onClick={() => setActiveTab('payments')} className={tabClasses('payments')}>
            Payments
          </button>
        </div>
      </nav>

      {/* Content Section */}
      <section className="w-full max-w-6xl bg-gray-900 rounded-lg shadow-lg overflow-x-auto p-6">
        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <table className={`${tableBase} divide-y divide-gray-700`}>
            <thead className="bg-gray-800">
              <tr>
                <th className={thBase}>Patient ID</th>
                <th className={thBase}>Patient Name</th>
                <th className={thBase}>Service</th>
                <th className={thBase}>Price</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} className={rowHover}>
                  <td className={tdBase}>{s.patient ?? '—'}</td>
                  <td className={tdBase}>{s.patient_name ?? '—'}</td>
                  <td className={tdBase}>{s.name}</td>
                  <td className={tdBase}>Ksh {s.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* INVOICES TAB */}
        {activeTab === 'invoices' && (
          <table className={`${tableBase} divide-y divide-gray-700`}>
            <thead className="bg-gray-800">
              <tr>
                <th className={thBase}>Patient ID</th>
                <th className={thBase}>Patient Name</th>
                <th className={thBase}>Date</th>
                <th className={thBase}>Total</th>
                <th className={thBase}>Paid</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className={rowHover}>
                  <td className={tdBase}>{inv.patient}</td>
                  <td className={tdBase}>{inv.patient_name}</td>
                  <td className={tdBase}>{inv.date}</td>
                  <td className={tdBase}>Ksh {inv.total_amount}</td>
                  <td className={tdBase}>{inv.paid ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* PAYMENTS TAB */}
        {activeTab === 'payments' && (
          <table className={`${tableBase} divide-y divide-gray-700`}>
            <thead className="bg-gray-800">
              <tr>
                <th className={thBase}>Invoice ID</th>
                <th className={thBase}>Patient Name</th>
                <th className={thBase}>Amount</th>
                <th className={thBase}>Method</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className={rowHover}>
                  <td className={tdBase}>{p.invoice}</td>
                  <td className={tdBase}>{p.patient_name}</td>
                  <td className={tdBase}>Ksh {p.amount_paid}</td>
                  <td className={tdBase}>{p.payment_method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

