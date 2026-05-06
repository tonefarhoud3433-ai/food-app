import { useState } from "react";
import { showError, showSuccess } from "../utils/toastConfig";

export default function useUpdateItem(apiFn, onSuccess) {
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const updateItem = async (id, data) => {
    setLoading(true);
    setUpdatingId(id);
    try {
      const response = await apiFn(id, data);
      const message =
        response?.data?.message || `Successfully Updated ${data?.name}`;

      showSuccess(message);

      onSuccess?.();
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";

      showError(message);
      return false;
    } finally {
      setLoading(false);
      setUpdatingId(null);
    }
  };
  return { updateItem, loading, updatingId };
}
