import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Typography } from '@mui/material';
import CustomLabel from '../CustomLabel';

export default function RHFSelect({ name, children, required, ...other }: any) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          {other?.label && (
            <CustomLabel label={other?.label} required={required} />
          )}
          <TextField
            {...field}
            select
            fullWidth
            SelectProps={{ native: true }}
            error={!!error}
            helperText={
              <Typography
                component={'span'}
                sx={{ display: 'block', mt: -1, ml: -1 }}
              >
                {error?.message}
              </Typography>
            }
            {...other}
            label=""
            value={field?.value ?? ' '}
          >
            <option value=" ">Select Option</option>
            {children}
          </TextField>
        </>
      )}
    />
  );
}
