import { RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const configurationFormValidationSchema = Yup?.object()?.shape({
  configName: Yup?.string()?.required('Required Field'),
  accountSid: Yup?.string()?.required('Required Field'),
  authToken: Yup?.string()?.required('Required Field'),
  serviceName: Yup?.string()?.required('Required Field'),
  messageServiceId: Yup?.string()?.required('Required Field'),
  number: Yup?.string()
    ?.matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    ?.required('Required Field'),
});

export const configurationFormDefaultValues = {
  configName: '',
  accountSid: '',
  authToken: '',
  serviceName: '',
  messageServiceId: '',
  number: '',
};

export const ConfigurationFormDataArray = () => {
  return [
    {
      componentProps: {
        name: 'configName',
        label: 'Config Name',
        fullWidth: true,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'accountSid',
        label: 'ACCOUNT SID',
        fullWidth: true,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'authToken',
        label: 'AUTH TOKEN',
        fullWidth: true,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'serviceName',
        label: 'Service Name (Medium)',
        fullWidth: true,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'messageServiceId',
        label: 'Message Service ID',
        fullWidth: true,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'number',
        label: 'Number',
        fullWidth: true,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
  ];
};
