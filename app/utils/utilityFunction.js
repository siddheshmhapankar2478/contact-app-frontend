export const setCookie = (data) => {
  if (Array.isArray(data)) {
    data.forEach((d) => {
      document.cookie = `${d.key}=${JSON.stringify(d.value)};path=/;`;
    });
  } else {
    document.cookie = `${data.key}=${JSON.stringify(data.value)};path=/;`;
  }
};

export const getCookie = (key) => {
  return JSON.parse(
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(key))
      ?.split("=")[1] || null
  );
};


export const deleteAllCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    const key = cookie.split("=")[0].trim();
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
};

export const logout = () => {
  deleteAllCookies();
  window.location.href = "/";
};

