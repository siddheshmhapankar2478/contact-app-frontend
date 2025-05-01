import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

const ConfirmationModal = ({
  text = "Are you sure you want to proceed?",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  maxWidth = "xs",
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirmClick = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={true}
      maxWidth={maxWidth}
      fullWidth={true}
      PaperProps={{
        sx: {
          maxHeight: "50vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <DialogContent sx={{ pt: 3, pb: 1, px: 3 }}>
        <Typography>{text}</Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onCancel} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          onClick={handleConfirmClick}
          variant="contained"
          color="error"
          disabled={loading}
          endIcon={
            loading ? <CircularProgress size={16} color="inherit" /> : null
          }
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
