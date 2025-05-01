import { useEffect, useState } from "react";
import { makeApiCall } from "../utils/api";
import { useSnackbar } from "../context/Snackbar";

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

  const { showSnackbar } = useSnackbar();

  const fetchData = async (payload = {}) => {
    let response = null;

    try {
      setIsLoading(true);
      setError(null);
      setData(null);

      const mergedPayload = { ...body, ...payload };

      response = await makeApiCall(
        method,
        url,
        mergedPayload,
        headers,
        dataType
      );

      if (response.data) {
        const { message } = response.data;

        setData(response.data);
        if (message)
          showSnackbar({
            message: message,
            type: "success",
          });
      } else throw new Error(response.error);
    } catch (err) {
      console.error(err);
      showSnackbar({
        message: err.message,
        type: "error",
      });
    } finally {
      return response;
    }
  };

  useEffect(() => {
    if (shouldCallApi) fetchData();
  }, []);

  return { data, isLoading, setIsLoading, error, fetchData };
};

export default useFetchData;
