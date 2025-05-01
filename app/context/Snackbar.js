"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    message: "",
    type: "success",
    open: false,
  });

  const showSnackbar = useCallback(({ message, type = "success" }) => {
    setSnackbar({ message, type, open: true });
  }, []);

  const handleClose = () => setSnackbar((prev) => ({ ...prev, open: false }));

  const anchorOrigin = { vertical: "bottom", horizontal: "left" };

  const alertStyle =
    snackbar.type === "success"
      ? { backgroundColor: "#e6f4ea", color: "#1b5e20" }
      : snackbar.type === "error"
      ? { backgroundColor: "#ffebee", color: "#b71c1c" }
      : {};

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        key={snackbar.type + snackbar.message}
      >
        <Alert
          severity={snackbar.type}
          onClose={handleClose}
          sx={{ width: "100%", ...alertStyle }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
