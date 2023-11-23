import { RHFRadioGroup } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const contactsValidationSchema = Yup.object().shape({
  contacts: Yup.string(),
});

export const contactsDefaultValues = {
  contacts: '',
};

export const contactsArray = [
  {
    componentProps: {
      name: 'contacts',
      fullWidth: true,
      defaultValue: 'all',
      options: [
        { value: 'all', label: 'All Contacts' },
        { value: 'groups', label: 'Groups' },
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },
];
