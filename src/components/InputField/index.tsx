import { TextField } from '@mui/material';
import { InterfaceInputTextField } from '@/types/modules/InputField';

export default function InputField({
  field,
  name,
  placeholder,
  width,
  height,
  autoComplete,
  InputProps,
  type,
  error,
}: InterfaceInputTextField) {
  const inputStyle = {
    '& div': {
      border: 'none',
      '&:hover fieldset': {
        borderColor: '#88DFD3 !important',
        boxShadow: '0px 0px 0px 3px #A0E5DB80',
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
  };

  return (
    <TextField
      {...field}
      fullWidth
      name={name}
      placeholder={placeholder}
      autoFocus
      autoComplete={autoComplete}
      sx={inputStyle}
      InputProps={InputProps}
      type={type}
      error={error}
      helperText={error}
    />
  );
}
