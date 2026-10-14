import axios from "axios";

// Production: the Django API is served on the same domain under /api.
const API_BASE_URL = "https://eswacu.169-58-244-210.sslip.io/api";

const api = axios.create({ baseURL: API_BASE_URL });

// Attach the admin auth token (if logged in) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// If a stored token is no longer valid, clear it and send admins back to login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      const path = window.location.pathname;
      if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
        window.location.assign("/admin/login");
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Builds a FormData object from a plain object, skipping empty/undefined
 * values, so file fields and text fields can go in one multipart request.
 * (Axios sets the multipart boundary header itself - don't set it by hand.)
 */
export const toFormData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    formData.append(key, value);
  });
  return formData;
};

// Asking for a big page means lists (admin tables, directories) are never
// silently cut off at the first 50 records.
const listParams = (params) => ({ page_size: 500, ...params });

/**
 * One helper per resource: list / create / update / remove.
 * `files: true` sends create/update as multipart so images and PDFs upload.
 */
const resource = (path, { files = false } = {}) => ({
  list: (params) => api.get(`/${path}/`, { params: listParams(params) }),
  create: (data) => api.post(`/${path}/`, files ? toFormData(data) : data),
  update: (id, data) => api.patch(`/${path}/${id}/`, files ? toFormData(data) : data),
  remove: (id) => api.delete(`/${path}/${id}/`),
});

export const impactStats = resource("impact-stats");
export const leadership = resource("leadership", { files: true });
export const affiliates = resource("affiliates", { files: true });
export const membershipApplications = resource("membership-applications");
export const services = resource("services");
export const projects = resource("projects", { files: true });
export const news = resource("news", { files: true });
export const events = resource("events", { files: true });
export const resources = resource("resources", { files: true });
export const opportunities = resource("opportunities", { files: true });
export const opportunityApplications = resource("opportunity-applications");
export const contactMessages = resource("contact-messages");
export const adminUsers = resource("admin-users");

/* ---------- Public form submissions ---------- */
export const submitContact = (data) => api.post("/contact-messages/", data);
export const submitMembership = (data) => api.post("/membership-applications/", toFormData(data));
export const submitOpportunityApplication = (data) =>
  api.post("/opportunity-applications/", toFormData(data));

/* ---------- Auth ---------- */
export const loginAdmin = (username, password) => api.post("/auth/token/", { username, password });

// The token endpoint only returns a token, so the panel remembers the typed
// username purely to show it in the top bar.
export const setStoredAdminUser = (username) => localStorage.setItem("authUser", username);
export const getStoredAdminUser = () => localStorage.getItem("authUser");

export const logoutAdmin = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");
};

export default api;