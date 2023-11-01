// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, Typography } from '@mui/material';
import CustomLabel from '../CustomLabel';
// ----------------------------------------------------------------------

export default function RHFTextField({ name, required, ...other }: any) {
  const { control } = useFormContext();
  // console.log(name);
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
                sx={{ display: 'block', mt: -1, ml: -1 }}
              >
                {error?.message}
              </Typography>
            }
            FormHelperTextProps={{
              classes: {
                root: '',
                color: 'green',
              },
            }}
            {...other}
            label=""
          />
        </>
      )}
    />
  );
}
