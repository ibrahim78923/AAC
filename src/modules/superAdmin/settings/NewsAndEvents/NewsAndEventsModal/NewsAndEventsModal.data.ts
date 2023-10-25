import { RHFEditor, RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const newsAndEventsFormValidationSchema = Yup.object().shape({
  type: Yup.string().trim().required('Field is Required'),
  question: Yup.string().trim().required('Field is Required'),
});

export const newsAndEventsFormDefaultValues = {
  type: '',
  question: '',
};

export const newsAndEventsFormFiltersDataArray = [
  {
    componentProps: {
      name: 'question',
      label: 'Question',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'type',
      label: 'Type',
      select: true,
    },
    options: [
      { value: 'Event', label: 'Event' },
      { value: 'News', label: 'News' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'answer',
      label: 'Description',
    },
    component: RHFEditor,
    md: 12,
  },
];
