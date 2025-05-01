import { useEffect, useState } from "react";
import { makeApiCall } from "../utils/api";

const useFetchData = (options = {}) => {
  const {
    method = "GET",
    body = null,
    headers = {},
    dataType = "JSON",
    makeApiCall: shouldCallApi = true,
    url,
  } = options;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(shouldCallApi);
  const [error, setError] = useState(null);

  const fetchData = async (payload = {}) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    const mergedPayload = { ...body, ...payload };

    const response = await makeApiCall(
      method,
      url,
      mergedPayload,
      headers,
      dataType
    );

    if (response?.error) {
      setError(response.error);
    }

    setData(response);
    setIsLoading(false);
    return response;
  };

  useEffect(() => {
    if (shouldCallApi) fetchData();
  }, []);

  return [data, isLoading, error, fetchData];
};

export default useFetchData;
