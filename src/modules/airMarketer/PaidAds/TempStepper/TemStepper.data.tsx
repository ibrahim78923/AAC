import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const automationValidationSchema = Yup.object().shape({
  contactsList: Yup.string().required('Field is Required'),
});

export const automationDefaultValues = {
  contactsList: '',
};

export const automationDataArray = [
  {
    label: 'first',
    data: {
      componentProps: {
        name: 'contactList',
        label: 'Add contacts to a list',
        placeholder: 'Enter list name',
        required: true,
        fullWidth: true,
        small:
          'When a contact interacts with your ads, add them to an active list so you can market to them later.',
      },
      component: RHFTextField,
      md: 12,
    },
  },
];
