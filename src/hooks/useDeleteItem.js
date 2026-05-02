import { useState } from "react";
import { toast } from "react-toastify";

export default function useDeleteItem(apiFn, onSuccess) {
  const [deletingId, setDeletingId] = useState(null);

  const deleteItem = async (id) => {
    setDeletingId(id);
    try {
      const response = await apiFn(id);
      console.log(response);
      const message = response?.data?.message || "Successfully Deleted";
      toast.success(message);
      onSuccess?.(id);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };
  return { deleteItem, deletingId };
}
