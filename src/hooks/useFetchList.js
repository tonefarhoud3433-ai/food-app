import { useEffect, useState } from "react";
import { showError } from "../utils/toastConfig";

export default function useFetchList(apiCall, params = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiCall(params);
      setData(response?.data?.data || response?.data || []);
      setTotalPages(response?.data?.totalNumberOfPages || 0);
      setTotalRecords(response?.data?.totalNumberOfRecords || 0);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(params)]);

  return {
    data,
    loading,
    refetch: fetchData,
    setData,
    totalPages,
    totalRecords,
  };
}
