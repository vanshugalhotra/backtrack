import { getToken } from "@/lib/auth";

// Create mock 401 response if user is not logged in
function createMockResponse(
  message = "FORBIDDEN: Please log in to access this resource",
  status = 401,
): Response {
  return new Response(JSON.stringify({ statusCode: status, message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const fetchWithAuth = async (
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> => {
  const token = getToken();

  if (!token) {
    return createMockResponse();
  }

  const headers: HeadersInit = {
    ...(init.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(input, {
    ...init,
    headers,
  });

  return response;
};
