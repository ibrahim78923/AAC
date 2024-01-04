import {
  RHFAutocomplete,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';

const timeoutOptions = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
];

export const loginMethodsDataArray = [
  {
    _id: 4676,
    text: 'Air Apple Cart Login',
    toolTipMessage:
      'Users can use their email ID and password to create and log into their Air Apple Cart account.',
    showIcon: true,
    componentProps: {
      name: 'cartLogin',
      label: '',
    },
    component: RHFSwitch,
  },
  {
    _id: 4766,
    text: 'Password Policy',
    componentProps: {
      name: 'passwordPolicy',
      label: '',
    },
    component: RHFSwitch,
  },
  {
    _id: 6876,
    text: 'Google Login',
    toolTipMessage:
      'Users can login into their Air Apple Cart account via their Google credentials.',
    showIcon: true,
    componentProps: {
      name: 'googleLogin',
      label: '',
    },
    component: RHFSwitch,
  },
  {
    _id: 7567,
    text: 'SSO Login',
    toolTipMessage:
      'Configure SAML/ OAuth/OIDC/JWT SSO with the identity provider of your choice.',
    showIcon: true,
    componentProps: {
      name: 'sSOLogin',
      label: '',
    },
    component: RHFSwitch,
  },
  {
    _id: 5467,
    text: 'Session Timeout',
    timeOutDropdown: true,
    componentProps: {
      name: 'sessionTimeout',
      label: '',
    },
    component: RHFSwitch,
  },
  {
    _id: 6755,
    text: 'Authentication for public URLS',
    toolTipMessage:
      'Allow only logged-in users to access Public Ticket URLs and Approval URLs',
    showIcon: true,
    componentProps: {
      name: 'publicURLS',
      label: '',
    },
    component: RHFSwitch,
  },
  {
    _id: 7867,
    text: 'Admin Notification',
    toolTipMessage:
      'Notification will be sent when Agent is Added or Deleted or IP Range Restriction is modified',
    showAdmin: true,
    gridLength: 6,
    componentProps: {
      name: 'adminNotification',
      label: '',
      type: 'text',
      size: 'small',
      placeholder: 'Select Admin',
      options: ['BE1'],
    },
    component: RHFAutocomplete,
  },
];

export const timeoutDataArray = [
  {
    _id: 8678,
    gridLength: 1.5,
    componentProps: {
      name: 'time',
      label: '',
      size: 'small',
      type: 'number',
    },
    component: RHFTextField,
  },
  {
    _id: 9080,
    gridLength: 1.5,
    componentProps: {
      name: 'day',
      label: '',
      size: 'small',
      placeholder: '14 Days',
      options: timeoutOptions,
    },
    component: RHFAutocomplete,
  },
];
