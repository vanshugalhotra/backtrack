import { useState } from "react";
import { useGlobalUI } from "../../context/GlobalUIContext";

const useLogin = () => {
  const [token, setToken] = useState<string | null>(null);
  const { setLoading, setError } = useGlobalUI();

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || "statusCode" in data) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred during login");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { token, login };
};

export default useLogin;
