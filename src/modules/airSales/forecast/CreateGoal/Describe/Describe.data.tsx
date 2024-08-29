import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import * as Yup from 'yup';

export const goalDetailsValidationSchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    goalName: Yup.string().required('field is required'),
    trackingMethod: Yup.string().required('field is required'),
    ...formSchema,
  });
};

export const goalDetailsDefaultValues = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);
  return {
    goalName: '',
    trackingMethod: '',
    ...initialValues,
  };
};

export const goalDetailsTemplateArray = [
  {
    componentProps: {
      name: 'goalName',
      label: 'Goal Name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'trackingMethod',
      label: 'Tracking Method',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      {
        value: 'Higher value is better, Lower is worse',
        label: 'Higher value is better, Lower is worse',
      },
      {
        value: 'Lower value is better, Higher is worse',
        label: 'Lower value is better, Higher is worse',
      },
    ],
    component: RHFSelect,
    md: 12,
  },
];
