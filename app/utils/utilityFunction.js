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
