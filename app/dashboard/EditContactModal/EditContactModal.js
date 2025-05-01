import React, { useState, useEffect } from "react";
import { Button, Stack } from "@mui/material";
import CustomModal from "@/app/components/CustomModal/CustomModal";
import CommonTextField from "@/app/components/CommonTextField/CommonTextField";

const defaultData = {
  name: "",
  email: "",
  phone: "",
  type: "",
};

const EditContactModal = (props) => {
  const { onClose, contactData } = props;

  const [formData, setFormData] = useState(contactData || defaultData);
  const [errors, setErrors] = useState({});

  const handleChange = (updatedField) => {
    setFormData((prev) => ({ ...prev, ...updatedField }));
    // Clear the error for the updated field
    const key = Object.keys(updatedField)[0];
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validateBody = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value || value.trim() === "") {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSave = () => {
    console.log("Valid data to be sent:", formData);
    // API call or other logic here
  };

  const handleSave = () => {
    if (validateBody()) {
      onSave();
      onClose();
    }
  };

  return (
    <CustomModal
      onClose={onClose}
      title="Edit Contact"
      footer={
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      }
    >
      <Stack spacing={2}>
        <CommonTextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={(value) => handleChange({ name: value })}
          required={true}
          errorMessage={errors?.name}
        />
        <CommonTextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={(value) => handleChange({ email: value })}
          required={true}
          errorMessage={errors?.email}
        />
        <CommonTextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={(value) => handleChange({ phone: value })}
          required={true}
          errorMessage={errors?.phone}
        />
        <CommonTextField
          label="Type"
          name="type"
          value={formData.type}
          onChange={(value) => handleChange({ type: value })}
          required={true}
          errorMessage={errors?.type}
        />
      </Stack>
    </CustomModal>
  );
};

export default EditContactModal;
