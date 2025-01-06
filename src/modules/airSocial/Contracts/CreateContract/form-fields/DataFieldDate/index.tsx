import React from 'react';
import { RHFDatePicker } from '@/components/ReactHookForm';
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
  '& .MuiInputAdornment-root': {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    margin: 0,
    '& .MuiButtonBase-root': {
      height: '100%',
      width: '100%',
      padding: 0,
      margin: 0,
      borderRadius: 0,
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '& svg': {
        display: 'none',
      },
    },
  },
});

export default function DataFieldDate({ data }: any) {
  return (
    <RHFDatePicker
      name={data?.name}
      placeholder={data?.placeholder || 'Set date'}
      size="small"
      fullWidth
      sx={styles}
    />
  );
}
