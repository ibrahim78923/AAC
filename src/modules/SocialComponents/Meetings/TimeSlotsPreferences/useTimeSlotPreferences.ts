import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { defaultValues } from './TimeSlotsPreferences.data';

export const useTimeSlotPreferences = () => {
  const theme = useTheme();
  const [disabled, setDisabled] = useState(true);

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit, watch, setValue } = methods;

  const onSubmit = async () => {
    try {
      await methods?.trigger();
      successSnackbar('Added Weekly Hours Successfully');
    } catch (err) {
      errorSnackbar();
    }
  };

  return {
    methods,
    disabled,
    setDisabled,
    theme,
    onSubmit,
    handleSubmit,
    watch,
    setValue,
  };
};
