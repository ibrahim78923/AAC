import { useForm } from 'react-hook-form';
import { defaultValues } from './TimeSlotsWeekly/TimeSlotWeekly.data';
import { useState } from 'react';
import { useTheme } from '@mui/material';

export const useTimeSlotPreferences = () => {
  const theme = useTheme();
  const [disabled, setDisabled] = useState('true');
  const methods = useForm({
    defaultValues: defaultValues(),
  });
  return {
    methods,
    disabled,
    setDisabled,
    theme,
  };
};
