import React, { useState } from 'react';
import { RHFTextField } from '@/components/ReactHookForm';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => ({
  '& .MuiOutlinedInput-input': {
    padding: 0,
    fontSize: 11,
    color: theme?.palette?.custom?.light,
  },
  '& .MuiOutlinedInput-root': {
    height: 13,
    padding: 0,
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {},
    '&.Mui-focused fieldset': {},
  },
  '& .MuiFormHelperText-root': {
    display: 'none',
    margin: 0,
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
    {
      WebkitAppearance: 'none',
      margin: 0,
    },
});

export default function DataFieldNumber({
  data,
  handleUpdateDynamicField,
}: any) {
  const [selectedDate, setSelectedDate] = useState(data?.value);
  const handleDateChange = (e: any) => {
    setSelectedDate(e?.target?.value);
    handleUpdateDynamicField(data?.index, {
      value: e?.target?.value,
    });
  };
  return (
    <RHFTextField
      name={data?.name}
      placeholder={data?.placeholder || 'Add value'}
      size="small"
      fullWidth
      type="number"
      sx={styles}
      inputProps={{
        inputMode: 'numeric',
        min: 0,
      }}
      value={selectedDate}
      onChange={handleDateChange}
    />
  );
}
