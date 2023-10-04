// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, Typography } from '@mui/material';
import CustomLabel from '../Label';
// ----------------------------------------------------------------------

export default function RHFTextField({ name, required, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          {other?.label && (
            <CustomLabel
              label={other?.label}
              error={error}
              required={required}
            />
          )}
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helperText={
              <Typography
                component={'span'}
                position={'absolute'}
                bottom={-13}
                left={0}
              >
                {error?.message}
              </Typography>
            }
            {...other}
            label=""
            inputProps={{
              style: {
                height: 27,
              },
            }}
          />
        </>
      )}
    />
  );
}
