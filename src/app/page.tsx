export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 font-mono grid grid-cols-1 lg:grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <aside className="bg-gray-900 text-white p-4 shadow-xl">
        <h2 className="text-xl font-bold mb-6">Clinic System</h2>
        <nav className="space-y-3 text-sm">
          <a href="/" className="block hover:text-cyan-400">Dashboard</a>

          <div className="mt-4 text-xs uppercase text-gray-400">Clinical</div>
          <a href="/patients" className="block hover:text-cyan-400">Patients</a>
          <a href="/outpatient" className="block hover:text-cyan-400">Outpatient</a>
          <a href="/maternal-child" className="block hover:text-cyan-400">Maternal & Child</a>
          <a href="/counseling" className="block hover:text-cyan-400">Counseling</a>
          <a href="/minor-theater" className="block hover:text-cyan-400">Minor Theater</a>
          <a href="/nutrition" className="block hover:text-cyan-400">Nutrition</a>
          <a href="/emergency" className="block hover:text-cyan-400">Emergency</a>
          <a href="/chronic_disease_management" className="block hover:text-cyan-400">Chronic Disease</a>
          <a href="/triage_vitals" className="block hover:text-cyan-400">Triage & Vitals</a>

          <div className="mt-4 text-xs uppercase text-gray-400">Diagnostics</div>
          <a href="/laboratory" className="block hover:text-cyan-400">Laboratory</a>
          <a href="/stis" className="block hover:text-cyan-400">STIs</a>

          <div className="mt-4 text-xs uppercase text-gray-400">Medication</div>
          <a href="/pharmacy" className="block hover:text-cyan-400">Pharmacy</a>
          <a href="/resource_management" className="block hover:text-cyan-400">Resource Mgmt</a>

          <div className="mt-4 text-xs uppercase text-gray-400">Admin</div>
          <a href="/billing_payments" className="block hover:text-cyan-400">Billing</a>
          <a href="/staff" className="block hover:text-cyan-400">Staff</a>
          <a href="/internal_communication" className="block hover:text-cyan-400">Communication</a>
          <a href="/admin_dashboard" className="block hover:text-cyan-400">Admin Dashboard</a>

          <div className="mt-4 text-xs uppercase text-gray-400">Public</div>
          <a href="/outreach" className="block hover:text-cyan-400">Outreach</a>
          <a href="/patient_portal" className="block hover:text-cyan-400">Patient Portal</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="p-6 overflow-y-scroll">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {/* Stats Cards */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h3 className="text-gray-700 font-semibold">Total Patients</h3>
            <p className="text-3xl font-bold text-cyan-600">1,204</p>
          </div>
          <div className="bg-white shadow rounded-2xl p-6">
            <h3 className="text-gray-700 font-semibold">Pending Lab Results</h3>
            <p className="text-3xl font-bold text-yellow-500">36</p>
          </div>
          <div className="bg-white shadow rounded-2xl p-6">
            <h3 className="text-gray-700 font-semibold">Admissions Today</h3>
            <p className="text-3xl font-bold text-green-600">12</p>
          </div>

          {/* Table */}
          <div className="col-span-1 lg:col-span-2 bg-white shadow rounded-2xl p-6 mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Active Patients</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="py-2">ID</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">#00123</td>
                  <td className="py-2">Jane Doe</td>
                  <td className="py-2 text-green-600 font-medium">Admitted</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">#00124</td>
                  <td className="py-2">John Smith</td>
                  <td className="py-2 text-yellow-500 font-medium">Waiting Lab</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}




