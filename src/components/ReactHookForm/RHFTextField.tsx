import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export default function RHFTextField({
  name,
  fullWidth = true,
  ...other
}: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          error={!!error}
          helperText={error?.message}
          fullWidth={fullWidth}
          {...other}
        />
      )}
    />
  );
}
