import RHFTextField from '@/components/ReactHookForm/RHFTextField';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  sender: Yup.string().required('Field is Required'),
  details: Yup.string().required('Field is Required'),
  compaign: Yup.string().required('Field is Required'),
  addedContacts: Yup.string().required('Field is Required'),
  useTemplate: Yup.string().required('Field is Required'),
  recipients: Yup.string().required('Field is Required'),
  details2: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  sender: '',
  details: '',
  compaign: '',
  addedContacts: '',
  useTemplate: '',
  recipients: '',
  details2: '',
};

export const createBroadcast = [
  {
    componentProps: {
      name: 'sender',
      label: 'Sender',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'details',
      label: 'Details',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'compaign',
      label: 'Compaign',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'addedContacts',
      label: 'Added Contacts',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'useTemplate',
      label: 'Use Template (Optional)',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'recipients',
      label: 'Recipients',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
];
