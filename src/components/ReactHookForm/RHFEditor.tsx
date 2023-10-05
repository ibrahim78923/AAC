import { useFormContext, Controller } from 'react-hook-form';
import TextEditor from '../TextEditor';

export default function RHFEditor({ name, fullWidth = true, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextEditor
          {...field}
          error={!!error}
          helperText={error?.message}
          fullWidth={fullWidth}
          onChange={(text) => {
            field.onChange(text);
          }}
          {...other}
        />
      )}
    />
  );
}
