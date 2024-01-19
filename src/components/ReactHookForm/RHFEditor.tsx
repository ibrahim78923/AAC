// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Box, FormHelperText } from '@mui/material';
import CustomLabel from '../CustomLabel';
import CustomTextEditor from '../CustomTextEditor';

// ----------------------------------------------------------------------

export default function RHFEditor({ name, required, disabled, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box position="relative">
          {other?.label && (
            <CustomLabel label={other?.label} required={required} />
          )}
          <CustomTextEditor
            id={name}
            name={name}
            value={field?.value}
            onChange={field?.onChange}
            error={!!error}
            readOnly={disabled}
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
