import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export default function RHFSelect({ name, children, ...other }: any) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
          value={field.value ? field.value : ' '}
        >
          <option value=" ">Select Option</option>
          {children}
        </TextField>
      )}
    />
  );
}
