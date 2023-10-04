// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Typography } from '@mui/material';
import CustomLabel from '../Label';
// ----------------------------------------------------------------------

export default function RHFTimePicker({
  name,
  label,
  required,
  ...other
}: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          {label && (
            <CustomLabel label={label} error={error} required={required} />
          )}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              {...field}
              {...other}
              slotProps={{
                textField: {
                  helperText: (
                    <Typography component={'span'} position={'absolute'}>
                      {error?.message}
                    </Typography>
                  ),
                  error: error,
                  fullWidth: other.fullWidth,
                  size: other.size,
                },
              }}
              label={''}
            />
          </LocalizationProvider>
        </>
      )}
    />
  );
}
