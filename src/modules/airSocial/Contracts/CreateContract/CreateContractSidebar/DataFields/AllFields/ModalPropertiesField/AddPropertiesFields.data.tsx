import {
  RHFCheckbox,
  RHFDatePicker,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const PropertiesValidationSchema = Yup.object().shape({
  date: Yup?.string()?.trim(),
  dateFormate: Yup?.string()?.trim(),
  AddDescription: Yup?.string()?.trim(),
  description: Yup?.string()?.trim(),
});

export const PropertiesCheckboxValidationSchema = Yup.object().shape({
  AddDescription: Yup?.string()?.trim(),
});

export const PropertiesSelectValidationSchema = Yup.object().shape({
  selectValue: Yup?.string()?.trim(),
  AddDescription: Yup?.string()?.trim(),
  label: Yup?.string()?.trim(),
  settings: Yup?.string()?.trim(),
});

export const PropertiesNumberValidationSchema = Yup.object().shape({
  value: Yup?.string()?.trim(),
  AddDescription: Yup?.string()?.trim(),
  format: Yup?.string()?.trim(),
  settings: Yup?.string()?.trim(),
});

export const PropertiesDefaultValues = {
  date: '',
  dateFormate: '',
};

export const PropertiesDateFields = [
  {
    componentProps: {
      name: 'date',
      label: 'Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'AddDescription',
      label: 'Add field description',
      fullWidth: true,
    },
    component: RHFCheckbox,
    md: 12,
  },

  {
    componentProps: {
      name: 'dateFormate',
      label: 'Formatting',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'DMMMYYYY', label: 'D MMM YYYY' },
      { value: 'DMMMMMYYYY', label: 'D MMMMM YYYY' },
      { value: 'DMMMMYYYY', label: 'D. MMMM YYYY' },
      { value: 'DDMMMMYYYY', label: 'DD MMMM YYYY' },
      { value: 'DDMMMMYYYY', label: 'DD MMMM, YYYY' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'settings',
      label: 'settings (Required field)',
      fullWidth: true,
      placeholder: 'enter text....',
      row: 4,
    },
    component: RHFSwitch,
    md: 12,
  },
];

export const PropertiesCheckboxFields = [
  {
    componentProps: {
      name: 'AddDescription',
      label: 'Add field description',
      fullWidth: true,
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'settings',
      label: 'settings (Required field)',
      fullWidth: true,
      placeholder: 'enter text....',
      row: 4,
    },
    component: RHFSwitch,
    md: 12,
  },
];

export const PropertiesSelectFields = [
  {
    componentProps: {
      name: 'selectValue',
      label: 'value',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'AddDescription',
      label: 'Add field description',
      fullWidth: true,
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'label',
      label: 'Label',
      placeholder: 'Add label...',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'settings',
      label: 'settings (Required field)',
      fullWidth: true,
      placeholder: 'enter text....',
      row: 4,
    },
    component: RHFSwitch,
    md: 12,
  },
];

export const PropertiesNumberFields = [
  {
    componentProps: {
      name: 'value',
      label: 'Value',
      placeholder: 'Enter Value',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'AddDescription',
      label: 'Add field description',
      fullWidth: true,
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'format',
      label: 'formatting',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'NoFormatting', label: 'No formatting' },
      { value: 'WithoutSeparator', label: 'Without separator' },
      { value: 'Comma', label: 'Comma' },
      { value: 'DecimalPart', label: 'Decimal part' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'settings',
      label: 'settings (Required field)',
      fullWidth: true,
      placeholder: 'enter text....',
      row: 4,
    },
    component: RHFSwitch,
    md: 12,
  },
];
