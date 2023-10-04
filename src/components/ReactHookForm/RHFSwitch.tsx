// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Switch, FormControlLabel } from '@mui/material';
import CustomLabel from '../Label';

// ----------------------------------------------------------------------

export default function RHFSwitch({ name, disabled, required, ...other }: any) {
  const { control } = useFormContext();
  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Switch disabled={disabled} {...field} checked={field.value} />
              {other?.label && (
                <CustomLabel
                  label={other?.label}
                  error={error}
                  required={required}
                />
              )}
            </>
          )}
        />
      }
      {...other}
    />
  );
}
