import { jwtDecode } from "jwt-decode";


export interface DecodedToken {
  sub: string;
  role: "ADMIN" | "USER";
  iat: number;
  exp: number;
}

export function decodeToken(token: string): DecodedToken {
  return jwtDecode(token);
}

export function getToken(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
}

export function logout(): void {
  localStorage.removeItem("token");
}
