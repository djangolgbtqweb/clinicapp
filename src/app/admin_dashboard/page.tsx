'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPatient } from 'lib/api'
import Link from 'next/link'
import { ArrowLeft, Users, FilePlus, Home } from 'lucide-react'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    phone_number: '',
    email: '',
    address: '',
    is_active: true,
    allergies: '',
    blood_type: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    is_smoker: false,
    is_diabetic: false,
    is_pregnant: false,
    previous_conditions: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, type, value } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await createPatient(form)
      router.push('/patients')
    } catch (err: any) {
      setError(err.message || 'Error creating patient')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-150 text-black flex-shrink-0">
        <div className="p-6 text-2xl font-bold flex items-center space-x-2">
          <Home className="w-6 h-6" />
          <span>Clinic Admin</span>
        </div>
        <ul className="mt-8">
          <li>
            <Link href="/patients" className="flex items-center px-6 py-3 hover:bg-gray-300">
              <Users className="w-5 h-5 mr-3" /> Patients
            </Link>
          </li>
          <li>
            <Link href="/admin_dashboard" className="flex items-center px-6 py-3 bg-gray-300">
              <FilePlus className="w-5 h-5 mr-3" /> Add Patient
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-gray-90 shadow px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-black hover:text-black">
              <ArrowLeft className="w-5 h-5" />
              <span className="ml-2">Dashboard</span>
            </Link>
            <h1 className="text-xl font-semibold">Add New Patient</h1>
          </div>
        </header>

        {/* Form Card */}
        <div className="max-w-3xl mx-auto mt-8 px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Gender & DOB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    name="date_of_birth"
                    type="date"
                    value={form.date_of_birth}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    name="phone_number"
                    value={form.phone_number}
                    onChange={handleChange}
                    placeholder="+254712345678"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={2}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Status Flags */}
              <div className="flex items-center space-x-8">
                {['is_active','is_smoker','is_diabetic','is_pregnant'].map(flag => (
                  <label key={flag} className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={flag}
                      checked={(form as any)[flag]}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{flag.replace('is_','').replace('_',' ')}</span>
                  </label>
                ))}
              </div>

              {/* Medical Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Blood Type</label>
                  <select
                    name="blood_type"
                    value={form.blood_type}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select blood type</option>
                    {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bt => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Allergies</label>
                  <input
                    name="allergies"
                    value={form.allergies}
                    onChange={handleChange}
                    placeholder="e.g. Peanuts"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="emergency_contact_name"
                    value={form.emergency_contact_name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    name="emergency_contact_phone"
                    value={form.emergency_contact_phone}
                    onChange={handleChange}
                    placeholder="+254700000000"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Medical History</label>
                <textarea
                  name="previous_conditions"
                  value={form.previous_conditions}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g. Asthma, Surgery in 2020"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {error && <p className="text-red-600">{error}</p>}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-6 py-2 bg-gray-400 text-white text-sm font-medium rounded-md shadow hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Saving…' : 'Save Patient'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
