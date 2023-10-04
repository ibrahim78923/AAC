// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
import TextEditor from '../TextEditor';
import CustomLabel from '../Label';

// ----------------------------------------------------------------------

export default function RHFEditor({ name, required, ...other }: any) {
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
          <TextEditor
            id={name}
            name={name}
            value={field.value}
            onChange={field.onChange}
            error={!!error}
            {...other}
          />
          <FormHelperText
            error
            sx={{ px: 2, position: 'absolute', textTransform: 'capitalize' }}
          >
            {error?.message}
          </FormHelperText>
        </>
      )}
    />
  );
}
