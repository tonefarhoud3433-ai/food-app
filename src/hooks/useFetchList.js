import { useEffect, useState } from "react";
import { showError } from "../utils/toastConfig";

export default function useFetchList(apiCall) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiCall();
      setData(response?.data?.data || []);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
    refetch: fetchData,
    setData,
  };
}
