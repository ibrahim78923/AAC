import { Fragment, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  TextField,
  Autocomplete,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import CustomLabel from '../CustomLabel';

export default function RHFAutocomplete({
  name,
  options,
  required,
  noOptionsText = 'Nothing in the List',
  multiple = false,
  ...other
}: any) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  const theme: any = useTheme();

  const label = other?.label;

  const onChanged = (e: any, newValue: any, onChange: any) => {
    if (multiple) {
      onChange(newValue.map((item: any) => item));
    } else {
      onChange(newValue);
    }
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
            multiple={multiple}
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
            PaperComponent={(props) =>
              multiple ? (
                <Fragment>{props.children}</Fragment>
              ) : (
                <Paper
                  {...props}
                  style={{ backgroundColor: theme.palette.grey[100] }}
                >
                  {props.children}
                </Paper>
              )
            }
            {...other}
            renderInput={(params) => (
              <>
                {other?.label && (
                  <CustomLabel
                    label={label}
                    error={error}
                    required={required}
                  />
                )}
                <TextField
                  {...params}
                  label=""
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
