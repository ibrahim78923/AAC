import { Fragment, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Autocomplete, Typography } from '@mui/material';
import CustomLabel from '../Label';

export default function RHFAutocomplete({
  name,
  options,
  required,
  noOptionsText = 'Nothing in the List',
  ...other
}: any) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  const label = other?.label;

  const onChanged = (e: any, newValue: any, onChange: any) => {
    onChange(newValue);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Autocomplete
            id={name}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            options={options}
            onChange={(e: any, newValue: any) => {
              onChanged(e, newValue, onChange);
            }}
            autoComplete
            noOptionsText={noOptionsText}
            value={value}
            {...other}
            renderInput={(params) => (
              <>
                {other?.label && (
                  <CustomLabel
                    label={other?.label}
                    error={error}
                    required={required}
                  />
                )}
                <TextField
                  {...params}
                  label=""
                  placeholder={label}
                  error={!!error}
                  helperText={
                    <Typography
                      component={'span'}
                      sx={{ display: 'block', mt: -1, ml: -1 }}
                    >
                      {error?.message}
                    </Typography>
                  }
                  InputProps={{
                    ...params?.InputProps,
                    endAdornment: (
                      <Fragment>{params?.InputProps?.endAdornment}</Fragment>
                    ),
                  }}
                />
              </>
            )}
          />
        );
      }}
    />
  );
}
