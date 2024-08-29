import { RHFTextField } from '@/components/ReactHookForm';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import * as Yup from 'yup';

export const validationSchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    name: Yup?.string()?.required('Field is Required'),
    ...formSchema,
  });
};

export const defaultValuesFolder = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);

  return {
    name: data?.name ?? '',
    ...initialValues,
  };
};

export const dataArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Folder Name',
      fullWidth: true,
      select: false,
      placeholder: 'Enter name',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
