'use client';

import { useEffect, useState } from 'react';
import { fetchMealPlans, createMealPlan } from 'lib/api';

type MealPlan = {
  id: number;
  patient_name: string;
  start_date: string;
  end_date: string;
  plan_details: string;
};

export default function MealPlanPage() {
  const [plans, setPlans] = useState<MealPlan[]>([]);
  const [formData, setFormData] = useState({
    patient_name: '',
    start_date: '',
    end_date: '',
    plan_details: '',
  });

  const fetchPlans = async () => {
    try {
      const data = await fetchMealPlans();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching meal plans:', error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMealPlan(formData);  // Send the corrected data structure
      setFormData({
        patient_name: '',
        start_date: '',
        end_date: '',
        plan_details: '',
      });
      fetchPlans();
    } catch (error) {
      console.error('Error submitting meal plan:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-yellow-50 to-orange-50 px-6 md:px-24 py-10">
      <div className="mb-6">
        <a
          href="/nutrition"
          className="inline-flex items-center text-yellow-700 hover:text-yellow-900 transition font-medium"
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

      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-yellow-800">Meal Plans</h1>
        <p className="text-gray-600 mt-2">Plan and track patients' dietary recommendations.</p>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto mb-14">
        <h2 className="text-xl font-semibold text-yellow-700 mb-4">New Meal Plan</h2>
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
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <textarea
            name="plan_details"
            placeholder="Plan Details"
            value={formData.plan_details}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            rows={4}
            required
          />
          <button
            type="submit"
            className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition"
          >
            Submit Meal Plan
          </button>
        </form>
      </section>

      <section className="space-y-6">
        {plans.length === 0 ? (
          <p className="text-gray-500">No meal plans yet.</p>
        ) : (
          plans.map((plan) => (
            <div
              key={plan.id}
              className="border-l-4 border-yellow-400 bg-white p-4 rounded-md shadow-sm"
            >
              <p className="text-sm text-gray-500">{plan.start_date} - {plan.end_date}</p>
              <p className="font-semibold text-gray-800">Patient: {plan.patient_name}</p>
              <p className="mt-2">{plan.plan_details}</p>
            </div>
          ))
        )}
      </section>
    </main>
  );
}



