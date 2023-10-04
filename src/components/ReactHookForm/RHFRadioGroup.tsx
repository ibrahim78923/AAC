// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Radio,
  RadioGroup,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';
import CustomLabel from '../Label';

// ----------------------------------------------------------------------

export default function RHFRadioGroup({
  name,
  options,
  required,
  // getOptionLabel,
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
          <RadioGroup {...field} row {...other}>
            {options.map((option: any) => (
              <FormControlLabel
                key={option?.value}
                value={option?.value}
                control={<Radio />}
                label={option?.label}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2, position: 'absolute' }}>
              {error.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
}
