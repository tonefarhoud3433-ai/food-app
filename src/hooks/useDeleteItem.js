import { useState } from "react";
import { showError, showSuccess } from "../utils/toastConfig";

export default function useDeleteItem(apiFn, onSuccess) {
  const [deletingId, setDeletingId] = useState(null);

  const deleteItem = async (id) => {
    setDeletingId(id);
    try {
      const response = await apiFn(id);
      const message = response?.data?.message || "Successfully Deleted";
      showSuccess(message);
      onSuccess?.(id);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      showError(message);
    } finally {
      setDeletingId(null);
    }
  };
  return { deleteItem, deletingId };
}
