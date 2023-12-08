import { RHFRadioGroup } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const twoFactorPolicyValidationSchema = Yup?.object()?.shape({
  twoFactorPolicy: Yup?.mixed(),
});

export const twoFactorPolicyDefaultValues = {
  twoFactorPolicy: '',
};

export const twoFactorPolicyDataArray = [
  {
    id: 6587,
    componentProps: {
      name: 'twoFactorPolicy',
      label: '',
      row: false,
      options: [
        { value: 'Mandate 2FA For', label: 'Mandate 2FA For' },
        {
          value: 'Don’t Mandate 2FA',
          label: 'Don’t Mandate 2FA',
        },
      ],
    },
    component: RHFRadioGroup,
  },
];

export const twoFactorPolicyActionDropdown = [
  {
    title: 'All Users',
  },
  {
    title: 'Others',
  },
];

export const tooltipMessage = `Enable additional authentication with any authenticator app of your choice 
  Note: When you enable 2FA, all the applicable users 
  will receive an email immediately informing them to set up 2FA.`;
