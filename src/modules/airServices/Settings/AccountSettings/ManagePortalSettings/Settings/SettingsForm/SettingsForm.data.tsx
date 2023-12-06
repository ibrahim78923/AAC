import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const settingsFormValidationSchema = Yup?.object()?.shape({
  portalName: Yup?.string(),
  portalURL: Yup?.string(),
  dateFormat: Yup?.string(),
  timeFormat: Yup?.string(),
  primaryLanguage: Yup?.string(),
});

export const settingsFormDefaultValues = (data?: any) => {
  return {
    portalName: data?.productName ?? '',
    portalURL: data?.price ?? '',
    dateFormat: data?.warrantyValidity?.month ?? '',
    timeFormat: data?.warrantyValidity?.year ?? '',
    primaryLanguage: data?.quantity ?? '',
  };
};

const primaryLanguageOptions = ['English', 'Spanish', 'French'];

const timeFormatOptions = ['12-hours', '24 hours'];

const dateFormatOptions = [
  'DAY-MONTH-YEAR',
  'MONTH-DAY-YEAR',
  'YEAR-MONTH-DAY',
];

export const settingsFormDataArray = [
  {
    _id: 2786,
    gridLength: 6,
    componentProps: {
      name: 'portalName',
      label: 'Portal Name',
      type: 'text',
      size: 'small',
    },
    component: RHFTextField,
  },
  {
    _id: 2786,
    gridLength: 6,
    componentProps: {
      name: 'portalURL',
      label: 'Portal URL',
      type: 'text',
      size: 'small',
    },
    component: RHFTextField,
  },
  {
    _id: 9478,
    gridLength: 6,
    componentProps: {
      name: 'dateFormat',
      label: 'Date Format',
      type: 'text',
      size: 'small',
      placeholder: 'Select',
      options: dateFormatOptions,
    },
    component: RHFAutocomplete,
  },

  {
    _id: 3456,
    gridLength: 6,
    componentProps: {
      name: 'timeFormat',
      label: 'Time Format',
      size: 'small',
      placeholder: 'Select',
      options: timeFormatOptions,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 4435,
    gridLength: 6,
    componentProps: {
      name: 'primaryLanguage',
      label: 'Primary Language',
      size: 'small',
      placeholder: 'Select',
      options: primaryLanguageOptions,
    },
    component: RHFAutocomplete,
  },
];
