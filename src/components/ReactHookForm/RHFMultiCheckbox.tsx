import { useFormContext, Controller } from 'react-hook-form';
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Grid,
} from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
import CustomLabel from '../CustomLabel';
import { useEffect } from 'react';

export default function RHFMultiCheckbox({
  GridView,
  required,
  label,
  name,
  options,
  ...other
}: any) {
  const { control, setValue, getValues } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const onSelected = (option: any) => {
          const selectedValues = field?.value || [];
          if (selectedValues?.some((item: any) => item === option?.value)) {
            return selectedValues.filter(
              (value: any) => value !== option?.value,
            );
          } else {
            return [...selectedValues, option?.value];
          }
        };

        useEffect(() => {
          const currentValues = getValues(name) || [];
          const initialSelected = options
            ?.filter((option: any) => option?.checked)
            ?.map((option: any) => option?.value);

          const updatedValues = Array?.from(
            new Set([...currentValues, ...initialSelected]),
          );

          setValue(name, updatedValues, { shouldValidate: true });
        }, [options?.isChecked]);

        return (
          <>
            {label && <CustomLabel label={label} required={required} />}
            <FormGroup>
              <Grid container>
                {options?.map((option: any) => (
                  <Grid item xs={12} md={GridView} key={uuidv4()}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field?.value?.some(
                            (item: any) => item === option?.value,
                          )}
                          onChange={() => field?.onChange(onSelected(option))}
                        />
                      }
                      label={option?.label}
                      {...other}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
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
