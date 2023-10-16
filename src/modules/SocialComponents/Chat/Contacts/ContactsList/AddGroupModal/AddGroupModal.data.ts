import { RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const addGroupValidationSchema = Yup.object().shape({
  groupTitle: Yup.string().trim().required('Field is Required'),
  candidates: Yup.string().required('Field is Required'),
});

export const addGroupDefaultValues = {
  groupTitle: '',
  candidates: '',
};

export const addGroupFiltersDataArray = [
  {
    componentProps: {
      name: 'groupTitle',
      label: 'Group Title',
    },
    component: RHFTextField,
    md: 12,
  },
  // {
  //   componentProps: {
  //     name: 'participant',
  //     label: 'Add Participant',
  //     isCheckBox: true,
  //   },
  //   options: [
  //     {
  //       image: 'https://cdn-icons-png.flaticon.com/512/236/236831.png',
  //       value: 'JohnDoe',
  //       label: 'John Doe',
  //     },
  //     {
  //       image: 'https://cdn-icons-png.flaticon.com/512/236/236831.png',
  //       value: 'Andrew',
  //       label: 'Andrew',
  //     },
  //     {
  //       image: 'https://cdn-icons-png.flaticon.com/512/236/236831.png',
  //       value: 'RichardRobertson',
  //       label: 'Richard robertson',
  //     },
  //     {
  //       image: 'https://cdn-icons-png.flaticon.com/512/236/236831.png',
  //       value: 'Franksten',
  //       label: 'Franksten',
  //     },
  //   ],
  //   component: RHFMultiSearchableSelect,
  //   md: 12,
  // },
];
