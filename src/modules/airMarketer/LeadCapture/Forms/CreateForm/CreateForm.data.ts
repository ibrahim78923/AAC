import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const dynamicallyFormValidationSchema = Yup.object().shape({
  email: Yup?.string()?.trim()?.required('Field is Required'),
});

export const dynamicallyFormDefaultValues = {
  email: '',
};

export const dynamicallyFormArray = [
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
      placeholder: 'Enter form email',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
];

export const styleFormvalidationSchema = Yup?.object()?.shape({
  Width: Yup?.string(),
  BackgroundColor: Yup?.string(),
  TextColor: Yup?.string(),
  CardColor: Yup?.string(),
  ButtonColor: Yup?.string(),
  ButtonTextColor: Yup?.string(),
  Font: Yup?.string(),
});

export const styleFormDefaultValues = {
  Width: '',
  BackgroundColor: '',
  TextColor: '',
  CardColor: '',
  ButtonColor: '',
  ButtonTextColor: '',
  Font: '',
};

export const styleFormArray = [
  {
    componentProps: {
      name: 'Width',
      label: 'Width',
      fullWidth: true,
      placeholder: 'Enter Width',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      varient: 'heading',
      heading: 'Color Setting',
    },
    md: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'BackgroundColor',
      label: 'Background Color',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'TextColor',
      label: 'Text Color',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'CardColor',
      label: 'Card Color',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'ButtonColor',
      label: 'Button Color',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'ButtonTextColor',
      label: 'Button Text Color',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'Font',
      label: 'Font',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: '10', label: '10' },
      { value: '12', label: '12' },
      { value: '14', label: '14' },
      { value: '16', label: '16' },
      { value: '18', label: '18' },
    ],
    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      varient: 'paragraph',
      paragraph: 'Update the font that is used for your form.',
    },
    md: 12,
    component: Typography,
  },
];
