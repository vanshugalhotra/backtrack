import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { TESTS_API } from "@/lib/apiConfig";

const useDeleteTest = () => {
  const deleteTest = async (slug: string) => {
    try {
      const res = await fetchWithAuth(TESTS_API.detail(slug), {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        return { success: false, error: error.message || "Failed to delete test" };
      }

      return { success: true };
    } catch {
      return { success: false, error: "Unexpected error deleting test" };
    }
  };

  return { deleteTest };
};

export default useDeleteTest;
