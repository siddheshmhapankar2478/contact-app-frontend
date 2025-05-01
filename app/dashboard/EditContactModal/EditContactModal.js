import React, { useState } from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
import CustomModal from "@/app/components/CustomModal/CustomModal";
import CommonTextField from "@/app/components/CommonTextField/CommonTextField";
import useFetchData from "@/app/hooks/useFetchData";

const defaultData = {
  name: "",
  email: "",
  phone: "",
  type: "",
};

const EditContactModal = (props) => {
  const { onClose, contactData, fetchData } = props;

  const [formData, setFormData] = useState(contactData || defaultData);
  const [errors, setErrors] = useState({});
  const {
    isLoading,
    setIsLoading,
    fetchData: handleCreate,
  } = useFetchData({
    url: contactData
      ? `/api/contact/update/${contactData._id}`
      : `/api/contact/update`,
    makeApiCall: false,
    method: "POST",
  });

  const handleChange = (updatedField) =>
    setFormData((prev) => ({ ...prev, ...updatedField }));

  const validateBody = () => {
    const newErrors = {};
    const requiredFields = ["name", "email", "phone", "type"];
    requiredFields.forEach((field) => {
      const value = formData[field];
      if (value === "string") {
        if (value.trim() === "") {
          newErrors[field] = "This field is required";
        }
      } else if (!value) {
        newErrors[field] = "This field is required";
      }
    });

    console.log({ newErrors });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateBody()) {
      try {
        const response = await handleCreate(formData);
        if (response.data) {
          setIsLoading(false);
          onClose();
          await fetchData();
        }
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }
  };

  return (
    <CustomModal
      onClose={onClose}
      title={contactData ? "Edit Contact" : "Add Contact"}
      footer={
        <Button
          onClick={handleSave}
          disabled={isLoading}
          variant="contained"
          endIcon={isLoading ? <CircularProgress size={16} /> : null}
        >
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
