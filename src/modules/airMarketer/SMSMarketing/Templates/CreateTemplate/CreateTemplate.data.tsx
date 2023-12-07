import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  SocialAccount: Yup?.string(),
  Campaign: Yup?.string(),
  PostDetails: Yup?.string(),
  Media: Yup?.string(),
});

export const defaultValues = {
  SocialAccount: '',
  Campaign: '',
  PostDetails: '',
  Media: '',
};

export const CreateTemplateDataArray = [
  {
    componentProps: {
      name: 'TemplateName',
      label: 'Template Name',
      fullWidth: true,
      placeholder: 'Enter Name',
    },
    component: RHFTextField,

    md: 12,
  },
  {
    componentProps: {
      name: 'Category',
      label: 'Category',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'AccountUpdate', label: 'Account update' },
      { value: 'TicketUpdate', label: 'Ticket Update' },
      { value: 'AlertUpdate', label: 'Alert Update' },
      { value: 'AppointmentUpdate', label: 'Appointment update' },
      { value: 'PersonalFinanceUpdate', label: 'Personal finance update' },
      { value: 'ShoppingUpdate', label: 'Shopping Update' },
      { value: 'PaymentUpdate', label: 'Payment update' },
      { value: 'Others', label: 'Others' },
    ],

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'Language',
      label: 'Language',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'English', label: 'English' },
      { value: 'Armenian', label: 'Armenian' },
      { value: 'Dinka', label: 'Dinka' },
      { value: 'Kirundi', label: 'Kirundi' },
      { value: 'Azerbaijani', label: 'Azerbaijani' },
      { value: 'Turkmen', label: 'Turkmen' },
      { value: 'Uzbek', label: 'Uzbek' },
      { value: 'Kurdish', label: 'Kurdish' },
    ],
    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'Details',
      label: 'Details',
      fullWidth: true,
      placeholder: 'Type',
      multiline: true,
      rows: 4,
    },
    component: RHFTextField,

    md: 12,
  },
];
