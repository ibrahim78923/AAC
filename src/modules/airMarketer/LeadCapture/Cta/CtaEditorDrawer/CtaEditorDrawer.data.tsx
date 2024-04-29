import {
  RHFDropZone,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Button } from '@mui/material';
import * as Yup from 'yup';

export const CTAValidationSchema = Yup?.object()?.shape({
  buttonHtml: Yup?.string()?.trim()?.required('Field is Required'),
  // ctaInternalName: Yup?.string()?.trim()?.required('Field is Required'),
  // url: Yup?.string()?.trim()?.required('Field is Required'),
});

export const CTADefaultValues = {
  buttonHtml: '',
  // buttonStyle: '',
  // buttonColor: '',
  // buttonSize: '',
  // buttonPadding: '',
  // buttonMargin: '',
  // ctaInternalName: '',
  // urlRedirectType: '',
  // url: ''
};

export const CTADataArray = [
  {
    componentProps: {
      name: 'buttonHtml',
      label: 'Button content',
      fullWidth: true,
      required: true,
    },
    component: RHFEditor,
    xs: 12,
  },
  {
    componentProps: {
      name: 'buttonStyle',
      label: 'Button style',
      select: true,
    },
    options: [
      { value: 'Default', label: 'Default' },
      { value: 'Simple', label: 'Simple' },
      { value: 'Basic', label: 'Basic' },
      { value: 'Minimal', label: 'Minimal' },
      { value: 'Standard', label: 'Standard' },
    ],
    component: RHFSelect,
    xs: 12,
  },

  {
    componentProps: {
      name: 'buttonColor',
      label: 'Button Color',
      fullWidth: true,
    },
    component: RHFTextField,
    xs: 12,
  },

  {
    componentProps: {
      name: 'buttonSize',
      label: 'Button Size',
      select: true,
    },
    options: [{ value: 'Fit to Size', label: 'Fit to Size' }],
    component: RHFSelect,
    xs: 12,
  },

  {
    componentProps: {
      name: 'buttonPadding',
      label: 'Button Padding',
      fullWidth: true,
    },
    component: RHFTextField,
    xs: 12,
  },
  {
    componentProps: {
      name: 'buttonMargin',
      label: 'Button Margin',
      fullWidth: true,
    },
    component: RHFTextField,
    xs: 12,
  },
];

export const CTAInternalName = [
  {
    componentProps: {
      name: 'ctaInternalName',
      label: 'CTA Internal Name',
      fullWidth: true,
    },
    component: RHFTextField,
    xs: 12,
  },
  {
    componentProps: {
      name: 'urlRedirectType',
      label: 'URL Redirect Type',
      select: true,
    },
    options: [
      { value: 'New', label: 'New' },
      { value: 'Air Apple Cart Page', label: 'Air Apple Cart Page' },
      { value: 'Air Apple Blog Post', label: 'Air Apple Blog Post' },
      { value: 'Meeting Link', label: 'Meeting Link' },
      { value: 'File Link', label: 'File Link' },
    ],
    component: RHFSelect,
    xs: 8,
  },

  {
    componentProps: {
      variant: 'outlined',
      text: 'dddd',
    },

    component: Button,
    xs: 4,
  },

  {
    componentProps: {
      name: 'url',
      label: 'Enter URL',
      fullWidth: true,
    },
    component: RHFTextField,
    xs: 12,
  },
];

export const CTAImageDataArray = [
  {
    componentProps: {
      name: 'ButtonContent',
      label: 'Button content',
      fullWidth: true,
    },
    component: RHFDropZone,
    xs: 12,
  },

  {
    componentProps: {
      name: 'imageWidth',
      label: 'Image Width',
      fullWidth: true,
    },
    component: RHFTextField,
    xs: 12,
  },
  {
    componentProps: {
      name: 'imageHeight',
      label: 'Image Height',
      fullWidth: true,
    },
    component: RHFTextField,
    xs: 12,
  },
  {
    componentProps: {
      name: 'altText',
      label: 'Alt Text',
      fullWidth: true,
    },
    component: RHFTextField,
    xs: 12,
  },
];

export const drawerTitle: any = {
  Add: 'Create CTA',
  Edit: 'Edit CTA',
  View: 'View CTA',
};

export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
  Next: 'Next',
};

export const CTA_BUTTON_TITLE = {
  CUSTOMIZE_BUTTON: 'Customize',
  IMAGE_CUSTOMIZE: 'Image',
};

export const FORM_STEP = {
  CUSTOM_ACTION: 'custom-action',
  CTA_INTERNAL: 'cta-internal',
  IMAGE_ACTION: 'image-action',
  IMAGE_CTA_INTERNAL: 'custom-action',
};

export const urlRedirectType = [
  { value: 'new', label: 'New' },
  { value: 'air apple cart page', label: 'Air Apple Cart Page' },
  { value: 'air apple blog post', label: 'Air Apple Blog Post' },
  { value: 'meeting link', label: 'Meeting Link' },
  { value: 'file link', label: 'File Link' },
];
