'use client';

import { useEffect, useState } from 'react';
import { FaLeaf, FaPlus, FaClipboardList } from 'react-icons/fa';
import { fetchDietaryAssessments, createDietaryAssessment } from 'lib/api'; // Adjust path if needed

type Assessment = {
  id: number;
  patient_name: string;
  date: string;
  notes: string;
};

export default function DietaryAssessmentsPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [formData, setFormData] = useState({
    patient_name: '',
    date: '',
    notes: '',
  });

  const fetchAssessments = async () => {
    try {
      const data = await fetchDietaryAssessments();
      setAssessments(data);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDietaryAssessment(formData);
      setFormData({
        patient_name: '',
        date: '',
        notes: '',
      });
      fetchAssessments();
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-green-50 to-lime-50 px-6 md:px-24 py-10">
      {/* Back Link */}
      <div className="mb-6">
        <a
          href="/nutrition"
          className="inline-flex items-center text-green-700 hover:text-green-900 transition font-medium"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Nutrition
        </a>
      </div>

      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 flex items-center justify-center gap-2">
          <FaLeaf /> Dietary Assessments
        </h1>
        <p className="text-gray-600 mt-2">Document patient habits and nutrition goals.</p>
      </section>

      {/* Form */}
      <section className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto mb-14">
        <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
          <FaPlus /> New Assessment
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            name="patient_name"
            placeholder="Patient Name"
            value={formData.patient_name}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            rows={4}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Submit Assessment
          </button>
        </form>
      </section>

      {/* Existing Assessments */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-800 flex items-center gap-2">
          <FaClipboardList /> Past Records
        </h2>
        {assessments.length === 0 ? (
          <p className="text-gray-500">No assessments yet.</p>
        ) : (
          <div className="grid gap-6">
            {assessments.map((a) => (
              <div key={a.id} className="border-l-4 border-green-400 bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-500">Date: {a.date}</p>
                <p className="font-semibold text-gray-800">Patient: {a.patient_name}</p>
                <p className="mt-2"><strong>Notes:</strong> {a.notes}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

