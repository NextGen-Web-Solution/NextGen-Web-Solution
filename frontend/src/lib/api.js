const configuredBackendUrl = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").trim();
const backendUrl = configuredBackendUrl.replace(/\/+$/, "");

export const API_BASE = `${backendUrl}/api`;
