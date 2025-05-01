import React from "react";
import { TextField } from "@mui/material";

const CommonTextField = (props) => {
  const { label, name, value, onChange, errorMessage, ...rest } = props;

  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      error={!!errorMessage}
      helperText={errorMessage}
      {...rest}
    />
  );
};

export default CommonTextField;
