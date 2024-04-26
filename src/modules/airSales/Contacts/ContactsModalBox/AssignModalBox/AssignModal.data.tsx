import { RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const customValidationSchema = Yup?.object()?.shape({
  contact: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  contact: '',
};

export const AssignModalData = [
  {
    componentProps: {
      name: 'Contact Owner',
      label: 'Contact Owner',
      placeholder: 'Select',
      select: true,
    },
    options: [
      { value: 'Savanah Shane', label: 'Savanah Shane' },
      { value: 'Phoenix Baker', label: 'Phoenix Baker' },
      { value: 'Cameron Williamson', label: 'Cameron Williamson' },
      { value: 'Brooklyn Simmons', label: 'Brooklyn Simmons' },
    ],
    component: RHFSelect,
    md: 4,
  },
];
