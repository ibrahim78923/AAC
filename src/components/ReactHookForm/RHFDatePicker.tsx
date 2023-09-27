import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';

export default function RHFDatePicker({ name, label, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <DatePicker
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
        );
      }}
    />
  );
}
