import { useFormContext, Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import SwitchableDatepicker from '../SwitchableDatepicker';

export default function RHFSwitchableDatepicker({
  name,
  required,
  ...other
}: any) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <SwitchableDatepicker
            {...field}
            name={name}
            required={required}
            field={field}
            error={error}
            {...other}
          />
        );
      }}
    />
  );
}
