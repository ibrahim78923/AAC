import { RHFEditor, RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const newsAndEventsFormValidationSchema = Yup.object().shape({
  type: Yup?.string()?.trim()?.required('Field is Required'),
  name: Yup?.string()?.trim().required('Field is Required'),
});

export const newsAndEventsFormDefaultValues = {
  type: '',
  name: '',
  description: '',
};

export const newsAndEventsFormFiltersDataArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'type',
      label: 'Type',
      select: true,
      required: true,
    },
    options: [
      { value: 'event', label: 'Event' },
      { value: 'news', label: 'News' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
    },
    component: RHFEditor,
    md: 12,
  },
];
