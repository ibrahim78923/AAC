import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const chatEditorFormDefaultValues = (data?: any) => {
  if (data?.isEdit)
    return {
      text: !!data?.reply ? data?.reply : data?.text ? data?.text : '',
    };
  return {
    text: '',
  };
};

export const chatEditorFormValidationSchema = Yup?.object()?.shape({
  text: Yup?.string()?.trim()?.required('message is required'),
});

export const chatEditorFormFieldsDynamic = [
  {
    id: 1,
    component: RHFTextField,
    componentsProps: {
      name: 'text',
    },
  },
];
