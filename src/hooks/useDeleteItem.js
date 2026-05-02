import { useState } from "react";
import { toast } from "react-toastify";

export default function useDeleteItem(apiFn, onSuccess) {
  const [loading, setLoading] = useState(false);

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const response = await apiFn(id);
      toast.success(response?.data?.message);
      onSuccess?.(id);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return { deleteItem, loading };
}
