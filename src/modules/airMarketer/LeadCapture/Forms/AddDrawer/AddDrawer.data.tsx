import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addFormvalidationSchema = Yup?.object()?.shape({
  name: Yup.string().test(
    'is-valid',
    'Name must be alphanumeric & max length 50',
    function (value) {
      if (!value) {
        return this.createError({ message: 'Field is Required' });
      }
      return /^[a-zA-Z0-9\s]+$/.test(value)
        ? value.length <= 50
          ? true
          : this.createError({ message: 'Name must be at most 50 characters' })
        : this.createError({ message: 'Name must be alphanumeric' });
    },
  ),
});

export const addFormDefaultValues = {
  name: undefined,
};

export const formsArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
      placeholder: 'Enter form name',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
