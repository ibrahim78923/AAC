import { Box, Theme } from '@mui/material';
import { DeleteIcon, EditBlackIcon } from '@/assets/icons';

import { RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const configurationEditFormValidationSchema = Yup?.object()?.shape({
  configName: Yup?.string()?.required('Required Field'),
  accountSid: Yup?.string()?.required('Required Field'),
  authToken: Yup?.string()?.required('Required Field'),
  serviceName: Yup?.string()?.required('Required Field'),
  messageServiceId: Yup?.string()?.required('Required Field'),
  number: Yup?.string()
    ?.matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    ?.required('Required Field'),
});

export const configurationEditFormDefaultValues = {
  configName: '',
  accountSid: '',
  authToken: '',
  serviceName: '',
  messageServiceId: '',
  number: '',
};

export const ConfigurationEditFormDataArray = () => {
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

export const columns = (theme: Theme, setIsEditDrawerOpen: any) => {
  return [
    {
      accessorFn: (row: any) => row?.configurationName,
      id: 'configurationName',
      cell: (info: any) => info.getValue(),
      header: 'Configuration Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.number,
      id: 'number',
      isSortable: false,
      header: 'Number',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.action,
      id: 'action',
      isSortable: false,
      header: 'Action',
      cell: () => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box
            sx={{
              cursor: 'pointer',
              background: theme?.palette?.grey?.[400],
              padding: '5px',
              borderRadius: '50%',
            }}
            onClick={() => setIsEditDrawerOpen(true)}
          >
            <EditBlackIcon />
          </Box>
          <Box
            sx={{
              cursor: 'pointer',
              background: theme?.palette?.grey?.[400],
              padding: '5px',
              borderRadius: '50%',
            }}
          >
            <DeleteIcon />
          </Box>
        </Box>
      ),
    },
  ];
};

export const integrationConfigurationData = [
  {
    configurationName: 'Twilio',
    number: '+1234567890',
  },
  {
    configurationName: 'AirFP',
    number: '+1234567890',
  },
];
