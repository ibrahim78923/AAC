import { Typography } from '@mui/material';
import {
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const targetingValidation = Yup.object().shape({
  category: Yup.string().required('Field is Required'),
  audience: Yup.string().required('Field is Required'),
  location: Yup.string().required('Field is Required'),
  startAge: Yup.string().required('Field is Required'),
  endAge: Yup.string().required('Field is Required'),
});
export const targetingDefaultValues = {
  category: '',
  audience: '',
  location: '',
  startAge: null,
  endAge: '',
};
export const targetingFormData = [
  {
    componentProps: {
      name: 'category',
      label: 'Special Ad Category',
      fullWidth: true,
      required: true,
      select: true,
    },
    options: [
      { value: 'geekFam', label: 'Geek Fam Solutions' },
      { value: 'orcalo', label: 'Orcalo Holdings' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      varient: 'body1',
      heading: 'Audience',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'audience',
      row: true,
      fullWidth: true,
      options: [
        { value: 'newAudience', label: 'New Audience' },
        { value: 'savedAudience', label: 'Select a saved Audience' },
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },
  {
    componentProps: {
      varient: 'body1',
      heading: 'Targeting people who match the following criteria',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'location',
      fullWidth: true,
      label: 'Location',
      required: true,
      select: true,
    },
    options: [
      { value: 'lahore', label: 'Lahore' },
      { value: 'rawalpindi', label: 'Rawalpindi' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      varient: 'body2',
      heading: 'Age Range',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'location',
      fullWidth: true,
      placeholder: 'Start Age',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'location',
      fullWidth: true,
      placeholder: 'End Age',
    },
    component: RHFTextField,
    md: 6,
  },
];
