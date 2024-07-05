// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { Typography } from '@mui/material';
import CustomLabel from '../CustomLabel';
import dayjs from 'dayjs';

// ----------------------------------------------------------------------

export default function RHFDateTimePicker({
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
          {label && <CustomLabel label={label} required={required} />}
          <MobileDateTimePicker
            sx={{
              '&.MuiClockNumber-root .Mui-disabled': {
                color: 'blue !important',
              },
            }}
            {...field}
            {...other}
            disablePast
            maxDateTime={dayjs().add(5, 'minute')}
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
                label: '',
              },
            }}
            label={label}
          />
        </>
      )}
    />
  );
}
