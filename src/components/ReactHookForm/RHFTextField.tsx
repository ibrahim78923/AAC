// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, Typography } from '@mui/material';
import CustomLabel from '../CustomLabel';
// ----------------------------------------------------------------------

export default function RHFTextField({
  name,
  required,
  onBlurHandler,
  ...other
}: any) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={other?.defaultValue || ''}
      render={({ field, fieldState: { error } }) => (
        <>
          {other?.label && (
            <label htmlFor={name}>
              <CustomLabel label={other?.label} required={required} />
            </label>
          )}
          <TextField
            {...field}
            id={name}
            value={field?.value || ''}
            onChange={field?.onChange}
            onBlur={() => {
              onBlurHandler?.();
              field?.onBlur?.();
            }}
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
