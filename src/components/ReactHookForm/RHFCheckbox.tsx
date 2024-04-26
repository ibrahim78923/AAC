// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Checkbox, FormControlLabel } from '@mui/material';
import CustomLabel from '../CustomLabel';

// ----------------------------------------------------------------------

export default function RHFCheckbox({ name, required, ...other }: any) {
  const { control } = useFormContext();
  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <Checkbox
                {...field}
                checked={field?.value}
                disabled={other?.disabled}
                sx={(theme) => ({
                  stroke: theme?.palette?.background?.default,
                  strokeWidth: 1,
                })}
                {...other}
              />
              {other?.label && (
                <CustomLabel
                  label={other?.label}
                  required={required}
                  marginBottom={0}
                />
              )}
            </>
          )}
        />
      }
      label=""
    />
  );
}

// ----------------------------------------------------------------------
