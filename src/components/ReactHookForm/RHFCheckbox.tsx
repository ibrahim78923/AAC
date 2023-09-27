import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel } from '@mui/material';

export default function RHFCheckbox({ name, label, ...other }: any) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              checked={field?.value}
              disabled={other?.disabled}
              sx={(theme) => ({
                stroke: theme?.palette?.background?.default,
                strokeWidth: 1,
              })}
            />
          )}
        />
      }
    />
  );
}
