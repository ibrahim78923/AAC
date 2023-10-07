import { useFormContext, Controller } from 'react-hook-form';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CustomLabel from '../Label';

export default function RHFButtonGroup({
  name,
  children,
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
          {other?.label && (
            <CustomLabel
              label={other?.label}
              error={error}
              required={required}
            />
          )}
          <ToggleButtonGroup
            sx={{ display: 'flex', mt: '16px', gap: '20px' }}
            {...other}
            {...field}
            exclusive
          >
            {children}
          </ToggleButtonGroup>
        </>
      )}
    />
  );
}
