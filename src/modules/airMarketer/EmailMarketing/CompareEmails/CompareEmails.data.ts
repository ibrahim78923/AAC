import * as Yup from 'yup';

export const personalEmail = [
  {
    label: 'My Business Email',
    value: 'myPersonalEmail',
  },
  {
    label: 'Business Email',
    value: 'businessEmail',
  },
  {
    label: 'Network',
    value: 'network',
  },
  {
    label: 'Office Application',
    value: 'officeApplication',
  },
  {
    label: 'Office Furniture',
    value: 'officeFurniture',
  },
];
export const businessEmail = [
  {
    label: 'My Personal Email',
    value: 'myPersonalEmail',
  },
  {
    label: 'Business Email',
    value: 'businessEmail',
  },
  {
    label: 'Network',
    value: 'network',
  },
  {
    label: 'Office Application',
    value: 'officeApplication',
  },
  {
    label: 'Office Furniture',
    value: 'officeFurniture',
  },
];

export const defaultEmailsCompareFields = [
  {
    uniqueName: 'slot_one',
  },
  {
    uniqueName: 'slot_two',
  },
];

export const addEmailValidationSchema = Yup?.object()?.shape({
  email: Yup?.mixed()?.nullable()?.required('Email is required'),
});

export const addEmailDefaultValues = {
  email: null,
};
