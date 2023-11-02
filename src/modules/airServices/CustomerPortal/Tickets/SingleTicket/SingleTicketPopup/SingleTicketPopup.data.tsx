import { RHFCheckbox, RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const singleTicketPopupValidationSchema = Yup.object().shape({
  addPeople: Yup.string().required('Field is Required'),
  emailNotification: Yup.string().required('Field is Required'),
});

export const singleTicketPopupDefaultValues = {
  addPeople: '',
  emailNotification: '',
};

export const singleTicketPopupDataArray = [
  {
    componentProps: {
      name: 'addPeople',
      label: 'Add People',
      type: 'text',
      size: 'small',
      fullWidth: true,
      select: true,
      required: false,
    },
    options: [
      { value: 'All', label: 'All' },
      { value: 'Only to you', label: 'Only to you' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'emailNotification',
      label: 'Also send Email Notification',
      required: false,
    },
    component: RHFCheckbox,
  },
];
