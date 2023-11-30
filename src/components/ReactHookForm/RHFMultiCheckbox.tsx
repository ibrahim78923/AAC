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

export default function RHFMultiCheckbox({
  GridView,
  required,
  label,
  name,
  options,
  ...other
}: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const onSelected = (option: any) =>
          field?.value?.some((item: any) => item === option?.value)
            ? field?.value?.filter((value: any) => value !== option?.value)
            : [...field?.value, option?.value];

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
