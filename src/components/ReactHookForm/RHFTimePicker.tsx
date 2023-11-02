// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TimePicker } from '@mui/x-date-pickers';
import { Typography } from '@mui/material';
import CustomLabel from '../CustomLabel';
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
          <TimePicker
            {...field}
            {...other}
            slotProps={{
              textField: {
                helperText: (
                  <Typography
                    component={'span'}
                    sx={{ display: 'block', mt: -1, ml: -1 }}
                  >
                    {error?.message}
                  </Typography>
                ),
                error: error,
                fullWidth: other?.fullWidth,
                size: other?.size,
              },
            }}
            label={''}
          />
        </>
      )}
    />
  );
}
