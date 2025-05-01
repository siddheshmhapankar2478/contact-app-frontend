import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const CustomModal = ({
  onClose,
  title,
  children,
  footer,
  defaultStyling = true,
  maxWidth = "sm",
  fullWidth = true,
  dialogProps = {},
  titleProps = {},
  contentProps = {},
  footerProps = {},
}) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          ...dialogProps,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: defaultStyling ? 2 : 0,
          pt: defaultStyling ? 2 : 0,
          pb: defaultStyling ? 1 : 0,
          borderBottom: "1px solid #eee",
          ...titleProps,
        }}
      >
        <DialogTitle sx={{ p: 0, fontSize: "1.25rem", fontWeight: 600 }}>
          {title}
        </DialogTitle>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </Box>

      <DialogContent
        dividers
        sx={{
          px: defaultStyling ? 2 : 0,
          py: defaultStyling ? 1 : 0,
          overflowY: "auto",
          ...contentProps,
        }}
      >
        {children}
      </DialogContent>

      <DialogActions
        sx={{
          px: defaultStyling ? 2 : 0,
          py: defaultStyling ? 1 : 0,
          borderTop: "1px solid #eee",
          ...footerProps,
        }}
      >
        {footer}
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
