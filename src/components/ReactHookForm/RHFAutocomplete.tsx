import { Fragment, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Autocomplete } from '@mui/material';

export default function RHFAutocomplete({
  name,
  options,
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
              <TextField
                {...params}
                placeholder={label}
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  ...params?.InputProps,
                  endAdornment: (
                    <Fragment>{params?.InputProps?.endAdornment}</Fragment>
                  ),
                }}
              />
            )}
          />
        );
      }}
    />
  );
}
