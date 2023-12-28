// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Box,
  Radio,
  RadioGroup,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';
import CustomLabel from '../CustomLabel';

// ----------------------------------------------------------------------

export default function RHFRadioGroup({
  name,
  options,
  required,
  disabled,
  ...other
}: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box position="relative">
          {other?.label && (
            <CustomLabel label={other?.label} required={required} />
          )}
          <RadioGroup {...field} row {...other}>
            {options?.map((option: any) => (
              <FormControlLabel
                key={option?.value}
                value={option?.value}
                control={<Radio />}
                label={option?.label}
                disabled={disabled}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ display: 'block', mt: -0.5, ml: 0 }}>
              {error?.message}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
}
