import { useFormContext, Controller } from 'react-hook-form';
import { MobileTimePicker } from '@mui/x-date-pickers';

export default function RHFTimePicker({ name, label, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MobileTimePicker
          {...field}
          {...other}
          slotProps={{
            textField: {
              helperText: error ? error?.message : '',
              error: error,
              fullWidth: other?.fullWidth,
              size: other?.size,
            },
          }}
          label={label}
        />
      )}
    />
  );
}
