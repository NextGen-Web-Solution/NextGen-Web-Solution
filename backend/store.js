// Temporary in-memory store. Replace these methods with your database queries.
// Data is cleared whenever the API process restarts.
const inquiries = [];
const statusChecks = [];
const loginAttempts = new Map();

export const store = {
  inquiries,
  statusChecks,
  loginAttempts,
  findInquiry(id) { return inquiries.find((item) => item.id === id); },
  listInquiries() { return [...inquiries].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 500); },
};
