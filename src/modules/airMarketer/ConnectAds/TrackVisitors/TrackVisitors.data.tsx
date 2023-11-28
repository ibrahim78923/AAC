import { RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const customValidationSchema = Yup?.object()?.shape({
  pixel: Yup?.string()?.required('Field is Required'),
});

export const customDefaultValues = {
  pixel: '',
};

export const TrackVisitorsData = [
  {
    componentProps: {
      name: 'pixel',
      label: 'Select a Pixel',
      type: 'text',
      size: 'small',
      fullWidth: true,
      select: true,
      required: false,
    },
    options: [
      { value: 'All', label: 'Select' },
      { value: 'Only to you', label: 'Only to you' },
    ],
    component: RHFSelect,
    md: 4,
  },
];
