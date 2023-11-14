import { useFormContext, Controller } from 'react-hook-form';
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';

import { v4 as uuidv4 } from 'uuid';

export default function RHFMultiCheckbox({ name, options, ...other }: any) {
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
            <FormGroup>
              {options.map((option: any) => (
                <FormControlLabel
                  key={uuidv4()}
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
              ))}
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
