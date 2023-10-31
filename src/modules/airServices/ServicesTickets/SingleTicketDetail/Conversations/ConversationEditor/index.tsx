// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Box, FormHelperText } from '@mui/material';

import ConversationTextEditor from '../ConversationTextEditor';
import ConversationTextLabel from '../ConversationTextLabel';

// ----------------------------------------------------------------------

export default function ConversationEditor({ name, required, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box position="relative">
          {other?.label && (
            <ConversationTextLabel
              label={other?.label}
              error={error}
              required={required}
            />
          )}
          <ConversationTextEditor
            id={name}
            name={name}
            value={field.value}
            onChange={field.onChange}
            error={!!error}
            {...other}
          />
          <FormHelperText
            error
            sx={{
              textTransform: 'capitalize',
              mt: 0,
            }}
          >
            {error?.message}
          </FormHelperText>
        </Box>
      )}
    />
  );
}
