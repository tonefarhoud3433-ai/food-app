import { useState } from "react";
import { showError, showSuccess } from "../utils/toastConfig";

export default function useCreateItem(apiFn, onSuccess) {
  const [loading, setLoading] = useState(false);
  const createItem = async (data) => {
    let name = data?.name || "";
    setLoading(true);
    try {
      const response = await apiFn(data);
      const message = response?.data?.message || `Successfully Created ${name}`;
      showSuccess(message);
      onSuccess?.(response?.data);
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      showError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createItem,
    loading,
  };
}
