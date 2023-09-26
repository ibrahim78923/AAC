import { TextField } from '@mui/material';
import { useTheme } from '@emotion/react';

interface inputTextField {
  field: any;
  name: string;
  placeholder: string;
  width: string;
  height: string;
  autoComplete: string;
  InputProps: any;
  type: string;
  hasError: any;
}

export default function InputField({
  field,
  name,
  placeholder,
  width,
  height,
  autoComplete,
  InputProps,
  type,
  hasError,
}: inputTextField) {
  const theme = useTheme();
  return (
    <TextField
      {...field}
      fullWidth
      name={name}
      placeholder={placeholder}
      autoFocus
      autoComplete={autoComplete}
      sx={{
        '& div': {
          border: 'none',
          '&:hover fieldset': {
            borderColor: '#88DFD3 !important',
            boxShadow: '0px 0px 0px 3px #A0E5DB80',
          },
          '&:focus fieldset': {
            borderColor: 'none !important',
          },
        },
        width: width,
        '& input': {
          height: height,
          border: `none`,
          borderRadius: '8px',
          fontSize: '16px',
          padding: '10px',
          color: 'black',
        },
        '& fieldset': {
          border: `1px solid ${
            hasError ? theme?.palette?.error?.main : '#E5E7EB'
          }`,
        },
      }}
      InputProps={InputProps}
      type={type}
    />
  );
}
