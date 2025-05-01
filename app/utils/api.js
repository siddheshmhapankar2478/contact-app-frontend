import axios from "axios";

export const makeApiCall = async (
  method,
  path,
  data = null,
  headers = {},
  dataType = "JSON"
) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + path;

  const apiHeaders = { ...headers };
  let payload = data;

  if (dataType === "JSON" && data) {
    apiHeaders["Content-Type"] = "application/json";
    payload = JSON.stringify(data);
  }

  try {
    const response = await axios({
      method,
      url: apiUrl,
      headers: apiHeaders,
      data: method !== "GET" ? payload : undefined,
    });

    const resData = response;

    if (resData?.data?.error) {
      return {
        error: resData.data.error[0] || "Something went wrong.",
      };
    }

    return resData;
  } catch (err) {
    const status = err?.response?.status;

    if (status === 401) {
      logout();
      return { error: "Session not valid, please login again!" };
    }

    if (status === 403) {
      return { error: "You are not authorized to access this page" };
    }

    console.error(err);
    return {
      error: err?.response?.data?.message || "Something went wrong",
    };
  }
};
