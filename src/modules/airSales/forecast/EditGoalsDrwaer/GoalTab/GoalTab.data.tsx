import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const editGoalValidationSchema = Yup.object().shape({
  name: Yup.string(),
  user: Yup.string(),
  duration: Yup.string(),
  dealPipelines: Yup.string(),
});

export const editGoalDefaultValues = {
  name: '',
  user: '',
  duration: '',
  dealPipelines: '',
};

export const editGoalArray = (showMonth: any, dealPipelineOption: any) => {
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
        select: true,
        disabled: true,
      },
      options: dealPipelineOption,
      component: RHFSelect,
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
