import { useState } from "react";

const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...arg) => {
    setLoading(true);
    const response = await apiFunc(...arg);

    setLoading(false);

    if (!response.ok) return setError(true);

    setError(false);
    setData(response.data);
  };

  return { error, loading, data, request };
};

export default useApi;
