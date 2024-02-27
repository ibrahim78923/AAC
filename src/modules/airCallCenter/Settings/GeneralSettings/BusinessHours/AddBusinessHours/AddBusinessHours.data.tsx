import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string().trim().required('Field is Required'),
  timeZone: Yup.string().trim().required('Field is Required'),
});

export const defaultValues = {
  title: '',
  description: '',
  timeZone: '',
};

export const AddBusinessHoursFields = [
  {
    id: 'title',
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'title',
      label: 'Title',
      placeholder: 'John',
      required: true,
    },
  },
  {
    id: 'description',
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'this business calendar belongs to Chicago timeline',
    },
  },
  {
    id: 'timeZone',
    md: 12,
    component: RHFSelect,
    componentProps: {
      name: 'timeZone',
      label: 'select The time zone',
      select: true,
      placeholder: 'John',
      required: true,
    },
    options: [
      { value: 'South Africa', label: 'South Africa' },
      { value: 'Poland', label: 'Poland' },
      {
        value: 'Iran (Islamic Republic of)',
        label: 'Iran (Islamic Republic of)',
      },
      { value: 'Réunion', label: 'Réunion' },
      {
        value: 'Saint Vincent and the Grenadines',
        label: 'Saint Vincent and the Grenadines',
      },
      { value: 'Afghanistan', label: 'Afghanistan' },
      { value: 'Viet Nam', label: 'Viet Nam' },
    ],
  },
];
