import {
  RHFDatePicker,
  RHFTextField,
  RHFSelect,
  RHFSearchableSelect,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  selectDeal: Yup.string().required('Field is Required'),
  quoteTemplate: Yup.string().required('Field is Required'),
  quoteName: Yup.string().required('Field is Required'),
  quoteExpiration: Yup.string().required('Field is Required'),
});

export const initValues = {
  selectDeal: '',
  quoteTemplate: '',
  quoteExpiration: '',
  quoteNotes: '',
  quoteTerms: '',
};

export const createQuoteFormFields = [
  {
    id: 'selectDeal',
    component: RHFSearchableSelect,
    componentProps: {
      name: 'selectDeal',
      label: 'Select Deal*',
      fullWidth: true,
      options: [
        { value: 'deal1', label: 'Deal Name 1' },
        { value: 'deal2', label: 'Deal Name 2' },
      ],
      isFooter: true,
      footerText: 'Create New Deal',
    },
  },
  {
    id: 'quoteTemplate',
    component: RHFSelect,
    componentProps: {
      name: 'quoteTemplate',
      label: 'Select Quote template*',
      fullWidth: true,
      select: true,
      placeholder: 'Select',
    },
    options: [
      { value: 'basic', label: 'Basic' },
      { value: 'original', label: 'Original' },
    ],
  },
  {
    id: 'quoteName',
    component: RHFTextField,
    componentProps: {
      name: 'quoteName',
      label: 'Quote Name*',
      fullWidth: true,
      placeholder: 'New quote',
    },
  },
  {
    id: 'quoteExpiration',
    component: RHFDatePicker,
    componentProps: {
      name: 'quoteExpiration',
      label: 'Quote Expiration Date*',
      fullWidth: true,
      placeholder: 'Select',
    },
  },
  {
    id: 'quoteNotes',
    component: RHFTextField,
    componentProps: {
      name: 'quoteNotes',
      label: 'Notes',
      fullWidth: true,
      multiline: true,
      rows: 3,
      placeholder: 'Enter notes you like to show buyer.',
    },
  },
  {
    id: 'quoteTerms',
    component: RHFTextField,
    componentProps: {
      name: 'quoteTerms',
      label: 'Terms and Condition for purchase',
      fullWidth: true,
      multiline: true,
      rows: 3,
      placeholder: 'Enter details',
    },
  },
  {
    id: 'templateComment',
    component: RHFTextField,
    componentProps: {
      name: 'templateComment',
      fullWidth: true,
      placeholder: 'Write comment here...',
      multiline: true,
      rows: 3,
    },
  },
];
