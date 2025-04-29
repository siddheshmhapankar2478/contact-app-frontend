import axios from "axios";
import { useEffect, useState } from "react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

const useFetchData = (url, options = {}) => {
  const {
    method = "GET",
    body = null,
    headers = {},
    makeApiCall = true,
  } = options;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (updatedBody = {}) => {
    if (!url) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const updatedBodyData = { ...body, ...updatedBody };

    try {
      const config = {
        method,
        url,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        ...(method !== "GET" && { data: updatedBodyData }),
      };

      const response = await api(config);
      setData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (makeApiCall) fetchData();
  }, []);

  return [data, isLoading, error, fetchData];
};

export default useFetchData;
