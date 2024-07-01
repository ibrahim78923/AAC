// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { DateTimePicker } from '@mui/x-date-pickers';
import { Typography } from '@mui/material';
import CustomLabel from '../CustomLabel';
import { DateRangePickerIcon } from '@/assets/icons';

// ----------------------------------------------------------------------

export default function RHFDesktopDateTimePicker({
  name,
  label,
  required,
  openPickerIcon = DateRangePickerIcon,
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
          <DateTimePicker
            {...field}
            {...other}
            disablePast
            slots={{
              openPickerIcon: openPickerIcon,
            }}
            slotProps={{
              textField: {
                ...other?.textFieldProps,
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
