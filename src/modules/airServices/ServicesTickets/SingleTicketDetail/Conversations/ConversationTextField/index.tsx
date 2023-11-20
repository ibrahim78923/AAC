import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Typography, TextField } from '@mui/material';
import CustomLabel from '@/components/CustomLabel';

const ConversationTextField = ({ name, required, ...other }) => {
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
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helperText={
              <Typography
                component="span"
                sx={{ display: 'block', mt: -1, ml: -1 }}
              >
                {error?.message}
              </Typography>
            }
            FormHelperTextProps={{
              classes: {
                root: '',
              },
            }}
            {...other}
            label=""
          />
        </>
      )}
    />
  );
};
export default ConversationTextField;
