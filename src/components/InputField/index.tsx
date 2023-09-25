import { TextField } from '@mui/material';

interface inputTextField {
  field: any;
  name: string;
  placeholder: string;
  width: string;
  height: string;
  autoComplete: string;
  InputProps: any;
  type: string;
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
}: inputTextField) {
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
          border: '1.5px solid #E5E7EB',
          borderRadius: '8px',
          fontSize: '16px',
          padding: '10px',
          color: 'black',
        },
      }}
      InputProps={InputProps}
      type={type}
    />
  );
}
