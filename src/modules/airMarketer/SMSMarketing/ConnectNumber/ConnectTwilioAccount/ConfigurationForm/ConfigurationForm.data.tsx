import { RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const configurationFormValidationSchema = Yup?.object()?.shape({
  configName: Yup?.string()?.required('Required Field'),
  accountSid: Yup?.string()?.required('Required Field'),
  authToken: Yup?.string()?.required('Required Field'),
  serviceName: Yup?.string()?.required('Required Field'),
});

export const configurationFormDefaultValues = {
  configName: '',
  accountSid: '',
  authToken: '',
  serviceName: '',
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
  ];
};
