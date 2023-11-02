import { useTheme } from '@mui/material';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

export const useExistingIncident = ({ onClose }: any) => {
  const [searchBy, setSearchBy] = useState<any>();

  const [checkboxValues, setCheckboxValues] = useState<any>({});

  const theme: any = useTheme();

  // Function to handle checkbox change
  const handleCheckboxChange = (event: any) => {
    const { id, checked } = event.target;
    setCheckboxValues((prevValues: any) => ({
      ...prevValues,
      [id]: checked,
    }));
  };

  const handleSubmit: any = () => {
    // Filter out checkboxes with values set to false
    Object.keys(checkboxValues).filter((id) => checkboxValues?.[id]);
    // TODO: const selectedCheckboxes = Object.keys(checkboxValues).filter(
    //   (id) => checkboxValues[id],
    // );

    enqueueSnackbar('Incident Associated Successfully!', {
      variant: 'success',
    });
    onClose(false);
  };

  return {
    handleSubmit,
    searchBy,
    setSearchBy,
    theme,
    checkboxValues,
    handleCheckboxChange,
  };
};
