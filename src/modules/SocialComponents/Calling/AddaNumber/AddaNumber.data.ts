import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const addaNumberValidationSchema = Yup?.object()?.shape({
  number: Yup?.string()?.trim()?.required('Field is Required'),
});

export const addaNumberDefaultValues = {
  number: '',
};

export const addaNumberFiltersDataArray = [
  {
    componentProps: {
      name: 'number',
      label: 'Enter Number',
    },
    component: RHFTextField,
    md: 12,
  },
];

export const citiesData = [
  {
    label: 'Bristol',
    value: 'Bristol',
    areaCodes: [
      {
        label: '(917) 994-1821',
        value: '(917) 994-1821',
      },
      {
        label: '(917) 934-1821',
        value: '(917) 934-1821',
      },
    ],
  },
  {
    label: 'London',
    value: 'London',
    areaCodes: [
      {
        label: '(917) 994-1821',
        value: '(917) 994-1821',
      },
      {
        label: '(917) 934-1821',
        value: '(917) 934-1821',
      },
    ],
  },
];
