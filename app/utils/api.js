import axios from "axios";
import { getCookie, logout } from "./utilityFunction";

export const makeApiCall = async (
  method,
  path,
  data = null,
  headers = {},
  dataType = "JSON"
) => {
  const sessionData = getCookie("session_data");
  const { user_id, token } = sessionData || {};

  if (path.includes("[user_id]") && user_id) {
    path = path.replace("[user_id]", user_id);
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + path;

  const apiHeaders = {
    ...headers,
    ...(token ? { "session-token": token } : {}),
  };
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
