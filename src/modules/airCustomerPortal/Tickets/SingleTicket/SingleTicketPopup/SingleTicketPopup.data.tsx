import { RHFAutocomplete, RHFCheckbox } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const singleTicketPopupValidationSchema = Yup?.object()?.shape({
  addPeople: Yup?.string()?.required('Field is Required'),
  emailNotification: Yup?.string(),
});

export const singleTicketPopupDefaultValues = {
  addPeople: '',
  emailNotification: '',
};

const addPeopleAutocomplete = ['All', 'Only to you'];

export const singleTicketPopupDataArray = [
  {
    id: 7797,
    componentProps: {
      name: 'addPeople',
      label: 'Add People',
      type: 'text',
      size: 'small',
      placeholder: 'Select',
      fullWidth: true,
      options: addPeopleAutocomplete,
    },
    component: RHFAutocomplete,
  },
  {
    id: 7578,
    componentProps: {
      name: 'emailNotification',
      label: 'Also send Email Notification',
    },
    component: RHFCheckbox,
  },
];
