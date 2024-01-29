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
  placeholder,
  isOptionEqualToValue = (option: any, newValue: any) =>
    option?._id === newValue?._id,
  getOptionLabel = (option: any) => option?.replaceAll?.('_', ' '),
  ...other
}: any) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  const theme: any = useTheme();

  const onChanged = (e: any, newValue: any, onChange: any) => {
    if (multiple) {
      onChange(newValue?.map((item: any) => item));
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
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            PaperComponent={(props) => (
              <Paper
                {...props}
                sx={{
                  backgroundColor: theme?.palette?.common?.white,
                  border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                  borderRadius: 1,
                  boxShadow: 1,
                  color: 'grey.600',
                }}
              >
                {props?.children}
              </Paper>
            )}
            {...other}
            renderInput={(params) => (
              <>
                {other?.label && (
                  <CustomLabel label={other?.label} required={required} />
                )}
                <TextField
                  {...params}
                  label=""
                  error={!!error}
                  placeholder={placeholder}
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
