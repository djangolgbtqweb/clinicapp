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

// ——— Counseling ———

export async function fetchCounselingSessions() {
  const res = await fetch(`${API}/counseling/counseling-sessions/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch counseling sessions");
  return res.json();
}

export async function fetchHealthEducationLogs() {
  const res = await fetch(`${API}/counseling/health-education-logs/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch education logs");
  return res.json();
}

export async function fetchPrivateNotes() {
  const res = await fetch(`${API}/counseling/private-notes/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch private notes");
  return res.json();
}

export async function fetchFollowUpReminders() {
  const res = await fetch(`${API}/counseling/follow-up-reminders/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch follow-up reminders");
  return res.json();
}

// ——— Minor Theater ———

const MINOR_THEATER_API = `${API}/minor-theater`;

export async function fetchSurgeries() {
  const res = await fetch(`${MINOR_THEATER_API}/surgeries/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch surgeries');
  return res.json();
}

export async function fetchOperationRecords() {
  const res = await fetch(`${MINOR_THEATER_API}/operation-records/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch operation records');
  return res.json();
}

export async function fetchEquipment() {
  const res = await fetch(`${MINOR_THEATER_API}/equipment/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch equipment');
  return res.json();
}

export async function fetchPostOpFollowUps() {
  const res = await fetch(`${MINOR_THEATER_API}/post-op-followups/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch post-op follow-ups');
  return res.json();
}

export const fetchEquipmentTracking = async () => {
  try {
    const response = await fetch(`${MINOR_THEATER_API}/equipment/`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch equipment tracking data');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ——— Nutrition ———

const NUTRITION_API = `${API}/nutrition`;

export async function fetchDietaryAssessments() {
  const res = await fetch(`${NUTRITION_API}/dietary-assessments/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch dietary assessments');
  return res.json();
}

export async function createDietaryAssessment(data: any) {
  const res = await fetch(`${NUTRITION_API}/dietary-assessments/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create dietary assessment');
  return res.json();
}
export async function fetchMealPlans() {
  const res = await fetch(`${NUTRITION_API}/meal-plans/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch meal plans');
  return res.json();
  
}


export async function fetchSupplements() {
  const res = await fetch(`${NUTRITION_API}/supplements/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch supplements');
  return res.json();
}

export async function fetchProgressMonitoring() {
  const res = await fetch(`${NUTRITION_API}/progress/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch progress data');
  return res.json();
}


export async function createMealPlan(data: any) {
  const res = await fetch(`${NUTRITION_API}/meal-plans/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to create meal plan');
  return res.json();
}

// ——— Emergency ———

const EMERGENCY_API = `${API}/emergency`;

export async function fetchEmergencyCases() {
  const res = await fetch(`${EMERGENCY_API}/emergency-cases/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch emergency cases');
  return res.json();
}

export async function createEmergencyCase(data: any) {
  const res = await fetch(`${EMERGENCY_API}/emergency-cases/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create emergency case');
  return res.json();
}

export async function fetchTriageLogs() {
  const res = await fetch(`${EMERGENCY_API}/triage-logs/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch triage logs');
  return res.json();
}

export async function createTriageLog(data: any) {
  const res = await fetch(`${EMERGENCY_API}/triage-logs/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create triage log');
  return res.json();
}

export async function fetchEmergencyReferrals() {
  const res = await fetch(`${EMERGENCY_API}/referrals/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch referrals');
  return res.json();
}

export async function createReferral(data: any) {
  const res = await fetch(`${EMERGENCY_API}/referrals/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create referral');
  return res.json();
}

export async function fetchFirstAidInventory() {
  const res = await fetch(`${EMERGENCY_API}/first-aid-inventory/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch first aid inventory');
  return res.json();
}

export async function updateFirstAidItem(id: number, data: any) {
  const res = await fetch(`${EMERGENCY_API}/first-aid-inventory/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update first aid item');
  return res.json();
}

// ——— Chronic Disease Management ———
const CHRONIC_DISEASE_API = `${API}/chronic-disease-management`;

export async function fetchDiseases() {
  const res = await fetch(`${CHRONIC_DISEASE_API}/diseases/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch diseases');
  return res.json();
}

export async function fetchFollowUps() {
  const res = await fetch(`${CHRONIC_DISEASE_API}/follow-ups/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch follow-ups');
  return res.json();
}


const LAB_API = `${API}/laboratory`;

export async function fetchLabTests() {
  const res = await fetch(`${LAB_API}/lab-tests/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch lab tests');
  return res.json();
}

export async function fetchSampleTracking() {
  const res = await fetch(`${LAB_API}/sample-tracking/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch sample tracking');
  return res.json();
}

export async function fetchLabResults() {
  const res = await fetch(`${LAB_API}/lab-results/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch lab results');
  return res.json();
}

// src/lib/api.ts
const STI_API = `${API}/stis`;

export async function fetchDiagnoses() {
  const res = await fetch(`${STI_API}/diagnoses/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load diagnoses');
  return res.json();
}

export async function fetchMedications() {
  const res = await fetch(`${STI_API}/medications/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load medications');
  return res.json();
}

export async function fetchEducationMaterials() {
  const res = await fetch(`${STI_API}/education-materials/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load education materials');
  return res.json();
}

export async function fetchFollowups() {
  const res = await fetch(`${STI_API}/followups/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load follow-ups');
  return res.json();
}

// lib/api.ts
const PHARMACY_API = `${API}/pharmacy`;

export async function fetchPharmacyMedications() {
  const res = await fetch(`${PHARMACY_API}/medications/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch medications');
  return res.json();
}

export async function fetchTotalCost(id: number) {
  const res = await fetch(`${PHARMACY_API}/medications/${id}/total-cost/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch total cost');
  return res.json();
}

export async function fetchPrescriptions() {
  const res = await fetch(`${PHARMACY_API}/prescriptions/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch prescriptions');
  return res.json();
}

export async function fetchDispensingHistory() {
  const res = await fetch(`${PHARMACY_API}/dispensing-history/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch dispensing history');
  return res.json();
}

export async function fetchRestockingAlerts() {
  const res = await fetch(`${PHARMACY_API}/restocking-alerts/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch restocking alerts');
  return res.json();
}

// ——— Resource Management ———
const RM_API = `${API}/resource-management`;
export async function fetchRooms() {
  const res = await fetch(`${RM_API}/rooms/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch rooms');
  return res.json();
}
export async function fetchRoomAssignments() {
  const res = await fetch(`${RM_API}/room-assignments/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch room assignments');
  return res.json();
}
export async function fetchResourceEquipment() {
  const res = await fetch(`${RM_API}/equipment/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch equipment');
  return res.json();
}
export async function fetchEquipmentBookings() {
  const res = await fetch(`${RM_API}/equipment-bookings/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch equipment bookings');
  return res.json();
}