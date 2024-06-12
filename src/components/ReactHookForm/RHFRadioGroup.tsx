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
import { Fragment } from 'react';

// ----------------------------------------------------------------------

export default function RHFRadioGroup({
  name,
  options,
  required,
  disabled,
  defaultValue,
  ...other
}: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <Box position="relative" sx={other?.boxSx}>
              {other?.label && (
                <CustomLabel label={other?.label} required={required} />
              )}
              <RadioGroup {...field} row {...other}>
                {options?.map((option: any) => (
                  <Fragment key={option?.value}>
                    <FormControlLabel
                      value={option?.value}
                      control={<Radio />}
                      label={option?.label}
                      disabled={disabled}
                      sx={other?.optionSx}
                    />
                    {option?.value === field?.value ? option?.filter : ''}
                  </Fragment>
                ))}
              </RadioGroup>
            </Box>
            {!!error && (
              <FormHelperText error sx={{ display: 'block', mt: -0.5, ml: 0 }}>
                {error?.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
}
