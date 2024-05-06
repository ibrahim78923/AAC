import {
  RHFDropZone,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

export const customizedButtonData = [
  {
    componentProps: {
      name: 'buttonContent',
      label: 'Button content',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
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
      helperText:
        "Enter padding, e.g., '12px', or multiple values separated by commas, e.g., '10px, 12px, 13px'.",
    },
    component: RHFTextField,
    xs: 12,
  },
  {
    componentProps: {
      name: 'buttonMargin',
      label: 'Button Margin',
      fullWidth: true,
      helperText:
        "Enter margin, e.g., '12px', or multiple values separated by commas, e.g., '10px, 12px, 13px'.",
    },
    component: RHFTextField,
    xs: 12,
  },
];

export const ImageButtonData = [
  {
    componentProps: {
      name: 'buttonContent',
      label: 'Picture',
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

export const buttonInfoData = [
  {
    component: RHFTextField,
    xs: 12,
    componentProps: {
      name: 'ctaInternalName',
      label: 'CTA Internal Name',
      placeholder: 'Left18px',
      fullWidth: true,
      required: true,
    },
  },
  {
    component: RHFSelect,
    xs: 8,
    componentProps: {
      name: 'urlRedirectType',
      label: 'URL Redirect Type',
      select: true,
    },
    options: [
      { value: 'new', label: 'New' },
      { value: 'air apple cart page', label: 'Air Apple Cart Page' },
      { value: 'air apple blog post', label: 'Air Apple Blog Post' },
      { value: 'meeting link', label: 'Meeting Link' },
      { value: 'file link', label: 'File Link' },
    ],
  },
  {
    component: RHFTextField,
    xs: 12,
    componentProps: {
      name: 'url',
      label: 'Enter URL',
      fullWidth: true,
    },
  },
];
