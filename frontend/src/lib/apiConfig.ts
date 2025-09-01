const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3333";

// --- Auth ---
export const AUTH_API = {
  login: `${BASE_URL}/api/v1/auth/login`,
  register: `${BASE_URL}/api/v1/auth/register`,
};

// --- File Upload ---
export const FILE_UPLOAD_API = {
  exe: `${BASE_URL}/api/v1/file-upload/exe`,
  cpp: `${BASE_URL}/api/v1/file-upload/cpp`,
  icon: `${BASE_URL}/api/v1/file-upload/icon`,
};

// --- Execution ---
export const EXECUTE_API = {
  run: `${BASE_URL}/api/v1/execute`,
};

// --- Problems ---
export const PROBLEMS_API = {
  list: `${BASE_URL}/api/v1/problems`,
  detail: (slug: string) => `${BASE_URL}/api/v1/problems/${slug}`,
};

// --- Tests ---
export const TESTS_API = {
  list: `${BASE_URL}/api/v1/tests`,
  detail: (slug: string) => `${BASE_URL}/api/v1/tests/${slug}`,
  isStarted: (slug: string) => `${BASE_URL}/api/v1/tests/${slug}/isstarted`,
  start: (slug: string) => `${BASE_URL}/api/v1/tests/${slug}/start`,
  stop: (slug: string) => `${BASE_URL}/api/v1/tests/${slug}/stop`,
};

// --- Health ---
export const HEALTH_API = {
  metricsJson: `${BASE_URL}/api/v1/health/metrics-json`,
  metrics: `${BASE_URL}/api/v1/health/metrics`,
  version: `${BASE_URL}/api/v1/health/version`,
  readiness: `${BASE_URL}/api/v1/health/readiness`,
  liveness: `${BASE_URL}/api/v1/health/liveness`,
};

export const ICONS_API = {
  public: (filename: string) => `${BASE_URL}/icons/${filename}`,
};
