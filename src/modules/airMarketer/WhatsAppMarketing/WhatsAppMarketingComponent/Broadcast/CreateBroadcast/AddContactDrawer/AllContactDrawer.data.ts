import { RHFRadioGroup } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const contactsValidationSchema: any = Yup.object().shape({
  contacts: Yup.string(),
});

export const contactsDefaultValues = (recipientType: any) => ({
  contacts: recipientType ?? 'all',
});

export const contactsArray = [
  {
    componentProps: {
      name: 'contacts',
      fullWidth: true,
      options: [
        { value: 'all', label: 'All Contacts' },
        { value: 'groups', label: 'Groups' },
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },
];
