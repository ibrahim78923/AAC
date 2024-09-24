import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';
import {
  ImageIcon,
  SpaceIcon,
  TextIcon,
  DividerIcon,
  InputIcon,
} from '@/assets/icons';

export const dynamicallyFormValidationSchema = Yup.object().shape({
  email: Yup?.string()?.trim()?.required('Field is Required'),
});

export const dynamicallyFormDefaultValues = {
  email: '',
};

export const dynamicallyFormArray = [];

const colorRegEx = /^$|^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const styleFormvalidationSchema = Yup?.object()?.shape({
  width: Yup?.string()?.matches(/^\d*$/, 'Width must be a number').nullable(),
  bodyBgColor: Yup?.string()?.matches(colorRegEx, 'Invalid Color').nullable(),
  bodyTextColor: Yup?.string()?.matches(colorRegEx, 'Invalid Color').nullable(),
  buttonBgColor: Yup?.string()?.matches(colorRegEx, 'Invalid Color').nullable(),
  buttonTextColor: Yup?.string()
    ?.matches(colorRegEx, 'Invalid Color')
    .nullable(),
  bodyFontSize: Yup?.string(),
});

export const styleFormDefaultValues = (formStyling: any) => ({
  width: formStyling?.body?.width?.replace('px', '') ?? null,
  bodyBgColor: formStyling?.body?.backgroundColor ?? null,
  bodyTextColor: formStyling?.body?.color ?? null,
  buttonBgColor: formStyling?.button?.backgroundColor ?? null,
  buttonTextColor: formStyling?.button?.color ?? '',
  bodyFontSize: formStyling?.body?.fontSize?.replace('px', '') ?? null,
});

export const styleFormArray = [
  {
    componentProps: {
      name: 'width',
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
      name: 'bodyBgColor',
      label: 'Background Color',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'bodyTextColor',
      label: 'Text Color',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  // {
  //   componentProps: {
  //     name: 'cardColor',
  //     label: 'Card Color',
  //     fullWidth: true,
  //   },
  //   component: RHFTextField,
  //   md: 6,
  // },
  {
    componentProps: {
      name: 'buttonBgColor',
      label: 'Button Color',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'buttonTextColor',
      label: 'Button Text Color',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'bodyFontSize',
      label: 'Font Size',
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

export const sideBarMenuArray = [
  {
    name: 'Text',
    type: 'Text',
    icon: <TextIcon />,
  },
  {
    name: 'Input Field',
    type: 'Input',
    icon: <InputIcon />,
  },
  {
    name: 'Image',
    type: 'Image',
    icon: <ImageIcon />,
  },
  {
    name: 'Spacing',
    type: 'Spacing',
    icon: <SpaceIcon />,
  },
  {
    name: 'Divider',
    type: 'Divider',
    icon: <DividerIcon />,
  },
  {
    name: 'Button',
    type: 'Button',
    icon: <InputIcon />,
  },
];

export const customersAttributesArray = [
  {
    name: 'First Name',
    type: 'firstName',
    icon: <InputIcon />,
  },
  {
    name: 'Last Name',
    type: 'lastName',
    icon: <InputIcon />,
  },
  {
    name: ' Email',
    type: 'email',
    icon: <InputIcon />,
  },
  {
    name: 'Date of Birth',
    type: 'dateOfBirth',
    icon: <InputIcon />,
  },
  {
    name: 'Phone Number',
    type: 'phoneNumber',
    icon: <InputIcon />,
  },
  {
    name: 'Address',
    type: 'address',
    icon: <InputIcon />,
  },
  {
    name: 'Preferred Language',
    type: 'preferredLanguage',
    icon: <InputIcon />,
  },
];

export const fieldsType = {
  TEXT: 'paragraph',
  INPUT: 'input',
  TEXTAREA: 'textarea',
  IMAGE: 'file',
  DATEPICKER: 'datepicker',
  SPACING: 'space',
  DIVIDER: 'divider',
  BUTTON: 'button',
  SELECT: 'select',
  FIRSTNAME: 'firstName',
  LASTNAME: 'lastName',
  EMAIL: 'email',
  DATEOFBIRTH: 'dateOfBirth',
  PHONENUMBER: 'phoneNumber',
  ADDRESS: 'address',
  PREFERREDLANGUAGE: 'preferredLanguage',
};
