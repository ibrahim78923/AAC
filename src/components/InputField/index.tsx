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
          border: `1.5px solid ${
            hasError ? theme?.palette?.error?.main : '#E5E7EB'
          }`,
        },
      }}
      InputProps={InputProps}
      type={type}
    />
  );
}
