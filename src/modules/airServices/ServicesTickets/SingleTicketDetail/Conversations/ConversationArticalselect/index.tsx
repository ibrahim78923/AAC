// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, Typography } from '@mui/material';

import ConversationTextLabel from '../ConversationTextLabel';
// ----------------------------------------------------------------------

export default function ConversationArticalselect({
  name,
  required,
  ...other
}: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          {other?.label && (
            <ConversationTextLabel
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
                component={'span'}
                sx={{ display: 'block', mt: -1, ml: -1 }}
              >
                {error?.message}
              </Typography>
            }
            FormHelperTextProps={{
              classes: {
                root: '',
                color: 'green',
              },
            }}
            {...other}
            label=""
          />
        </>
      )}
    />
  );
}
