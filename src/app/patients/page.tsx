'use client'

import { useEffect, useState } from 'react'
import { fetchPatients } from 'lib/api'

interface Patient {
  id: number
  first_name: string
  last_name: string
  date_of_birth: string
  gender: string
  phone_number: string
  email: string
  address: string
  is_active: boolean
  allergies: string | null
  blood_type: string | null
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  is_smoker: boolean
  is_diabetic: boolean
  is_pregnant: boolean
  previous_conditions: string | null
  created_at: string
  updated_at: string
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPatients()
      .then(data => setPatients(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const columns = [
    'ID',
    'Name',
    'Gender',
    'DOB',
    'Phone',
    'Email',
    'Blood',
    'Allergies',
    'Emergency Contact',
    'Medical History',
    'Smoker',
    'Diabetic',
    'Pregnant',
  ]

  return (
    <div className="p-4 sm:p-6 bg-gray-600 min-h-screen font-mono">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-300">Patient Registry</h1>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto w-full bg-white shadow rounded-lg">
        <table className="w-full table-fixed border-separate border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              {columns.map(col => (
                <th
                  key={col}
                  className="border-b border-gray-300 px-2 py-1 text-xs sm:text-sm uppercase text-gray-600"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array(5).fill(null).map((_, rI) => (
                  <tr key={rI} className="animate-pulse">
                    {columns.map((__, cI) => (
                      <td key={cI} className="border-b border-gray-200 px-2 py-1">
                        <div className="h-3 bg-gray-300 rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))
              : patients.length > 0
              ? patients.map((p, i) => (
                  <tr
                    key={p.id}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="border-b border-gray-200 px-2 py-1 text-xs sm:text-sm break-words">{p.id}</td>
                    <td className="border-b border-gray-200 px-2 py-1 text-xs sm:text-sm break-words">{p.first_name} {p.last_name}</td>
                    <td className="border-b border-gray-200 px-2 py-1 text-xs sm:text-sm break-words">{p.gender}</td>
                    <td className="border-b border-gray-200 px-2 py-1 text-xs sm:text-sm break-words">{p.date_of_birth}</td>
                    <td className="border-b border-gray-200 px-2 py-1 text-xs sm:text-sm break-words">{p.phone_number}</td>
                    <td className="border-b border-gray-200 px-2 py-1 text-xs sm:text-sm break-words">{p.email}</td>
                    <td className="border-b border-gray-200 px-2 py-1 text-xs sm:text-sm break-words">{p.blood_type || '—'}</td>
                    <td className="border-b border-gray-200 px-2 py-1 text-xs sm:text-sm break-words">{p.allergies || '—'}</td>
                    <td className="border-b border-gray-200 px-2 py-1 text-xs sm:text-sm break-words">
                      {p.emergency_contact_name
                        ? `${p.emergency_contact_name} (${p.emergency_contact_phone})`
                        : '—'}
                    </td>
                    <td className="border-b border-gray-200 px-2 py-1 text-xs sm:text-sm break-words whitespace-pre-line">{p.previous_conditions || '—'}</td>
                    <td className="border-b border-gray-200 px-2 py-1 text-xs sm:text-sm break-words">{p.is_smoker ? 'Yes' : 'No'}</td>
                    <td className="border-b border-gray-200 px-2 py-1 text-xs sm:text-sm break-words">{p.is_diabetic ? 'Yes' : 'No'}</td>
                    <td className="border-b border-gray-200 px-2 py-1 text-xs sm:text-sm break-words">{p.is_pregnant ? 'Yes' : 'No'}</td>
                  </tr>
                ))
              : (
                <tr>
                  <td colSpan={columns.length} className="text-center text-gray-500 py-6">
                    No patient records found.
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>

      {/* Mobile: vertical layout for each patient */}
      <div className="lg:hidden space-y-4">
        {(loading || patients.length === 0) && (
          <>
            {Array(1).fill(null).map((_, i) => (
              <div
                key={i}
                className="bg-white shadow rounded-lg p-4"
              >
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {columns.map((col, idx) => (
                    <div key={idx} className="col-span-2 flex justify-between">
                      <span className="font-medium text-gray-600">{col}:</span>
                      <span className="text-gray-400">
                        {loading ? (
                          <span className="inline-block w-16 h-3 bg-gray-300 rounded animate-pulse"></span>
                        ) : (
                          '—'
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {patients.length > 0 && !loading &&
          patients.map(p => (
            <div key={p.id} className="bg-white shadow rounded-lg p-4">
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="font-medium text-gray-600">ID:</span>
                <span>{p.id}</span>
                <span className="font-medium text-gray-600">Name:</span>
                <span>{p.first_name} {p.last_name}</span>
                <span className="font-medium text-gray-600">Gender:</span>
                <span>{p.gender}</span>
                <span className="font-medium text-gray-600">DOB:</span>
                <span>{p.date_of_birth}</span>
                <span className="font-medium text-gray-600">Phone:</span>
                <span>{p.phone_number}</span>
                <span className="font-medium text-gray-600">Email:</span>
                <span>{p.email}</span>
                <span className="font-medium text-gray-600">Blood:</span>
                <span>{p.blood_type || '—'}</span>
                <span className="font-medium text-gray-600">Allergies:</span>
                <span>{p.allergies || '—'}</span>
                <span className="font-medium text-gray-600">Emergency Contact:</span>
                <span>{p.emergency_contact_name ? `${p.emergency_contact_name} (${p.emergency_contact_phone})` : '—'}</span>
                <span className="font-medium text-gray-600">Medical History:</span>
                <span className="whitespace-pre-line">{p.previous_conditions || '—'}</span>
                <span className="font-medium text-gray-600">Smoker:</span>
                <span>{p.is_smoker ? 'Yes' : 'No'}</span>
                <span className="font-medium text-gray-600">Diabetic:</span>
                <span>{p.is_diabetic ? 'Yes' : 'No'}</span>
                <span className="font-medium text-gray-600">Pregnant:</span>
                <span>{p.is_pregnant ? 'Yes' : 'No'}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}






