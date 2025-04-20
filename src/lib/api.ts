// src/lib/api.ts
const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// ——— Patients ———
export async function fetchPatients() {
  const res = await fetch(`${API}/patients/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
}
export async function createPatient(data: any) {
  const res = await fetch(`${API}/patients/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create patient");
  return res.json();
}

// ——— Outpatient ———
export async function fetchQueue() {
  const res = await fetch(`${API}/outpatient/queue/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch queue");
  return res.json();
}
export async function fetchConsultations() {
  const res = await fetch(`${API}/outpatient/consultations/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch consultations");
  return res.json();
}
export async function fetchReferrals() {
  const res = await fetch(`${API}/outpatient/referrals/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch referrals");
  return res.json();
}
// ——— Maternal & Child ———
export async function fetchAntenatalPostnatalRecords() {
    const res = await fetch(`${API}/maternal-child-health/antenatal-postnatal/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch antenatal/postnatal records");
    return res.json();
  }
  
  export async function fetchVaccinationRecords() {
    const res = await fetch(`${API}/maternal-child-health/vaccinations/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch vaccination records");
    return res.json();
  }
  
  export async function fetchGrowthMonitoring() {
    const res = await fetch(`${API}/maternal-child-health/growth-monitoring/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch growth monitoring");
    return res.json();
  }
  
  export async function fetchFamilyPlanning() {
    const res = await fetch(`${API}/maternal-child-health/family-planning/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch family planning");
    return res.json();
  }
  

