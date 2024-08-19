import { RHFTextField } from '@/components/ReactHookForm';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import * as Yup from 'yup';

export const editGoalValidationSchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    name: Yup.string(),
    user: Yup.string(),
    duration: Yup.string(),
    dealPipelines: Yup.string(),
    ...formSchema,
  });
};

export const editGoalDefaultValues = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);

  return {
    name: '',
    user: '',
    duration: '',
    dealPipelines: '',
    // name: data?.name ?? '',
    ...initialValues,
  };
};

export const editGoalArray = (showMonth: any) => {
  const monthFields = [
    { month: 'jan', label: 'Jan' },
    { month: 'feb', label: 'Feb' },
    { month: 'mar', label: 'Mar' },
    { month: 'apr', label: 'Apr' },
    { month: 'may', label: 'May' },
    { month: 'jun', label: 'Jun' },
    { month: 'jul', label: 'Jul' },
    { month: 'aug', label: 'Aug' },
    { month: 'sep', label: 'Sep' },
    { month: 'oct', label: 'Oct' },
    { month: 'nov', label: 'Nov' },
    { month: 'dec', label: 'Dec' },
  ];

  return [
    {
      componentProps: {
        name: 'name',
        label: 'Name',
        fullWidth: true,
        select: false,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'user',
        label: 'User',
        fullWidth: true,
        select: false,
        disabled: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'duration',
        label: 'Duration',
        fullWidth: true,
        select: false,
        disabled: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'dealPipelines',
        label: 'Deal Pipelines',
        fullWidth: true,
        disabled: true,
      },
      component: RHFTextField,
      md: 12,
    },
    ...monthFields
      .filter((field) => showMonth?.includes(field?.month))
      .map((field) => ({
        componentProps: {
          name: field?.month,
          label: '',
          fullWidth: true,
          select: false,
          type: 'number',
          text: field?.label,
        },
        component: RHFTextField,
        md: 12,
      })),
  ];
};
