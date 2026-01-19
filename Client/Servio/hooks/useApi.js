import { useState } from "react";

const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async (...arg) => {
    setLoading(true);
    setMessage(null)
    const response = await apiFunc(...arg);

    setStatus(response.status);
    if (response.data.message) setMessage(response.data.message);
    setLoading(false);

    if (!response.ok) {
      return setError(true);
    }

    setError(false);
    setData(response.data.data);
  };

  return { error, loading, data, request, message, status };
};

export default useApi;
