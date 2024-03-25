import { RHFAutocomplete, RHFCheckbox } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const singleTicketShareValidationSchema = Yup?.object()?.shape({
  addPeople: Yup?.mixed()?.nullable()?.required('People is required'),
  emailNotification: Yup?.string(),
});

export const singleTicketShareDefaultValues = {
  addPeople: null,
  emailNotification: '',
};

const addPeopleAutocomplete = ['All', 'Only to you'];

export const singleTicketShareDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'addPeople',
      label: 'Add People',
      size: 'small',
      required: true,
      placeholder: 'Select',
      fullWidth: true,
      options: addPeopleAutocomplete,
    },
    component: RHFAutocomplete,
  },
  {
    id: 2,
    componentProps: {
      name: 'emailNotification',
      label: 'Also send Email Notification',
    },
    component: RHFCheckbox,
  },
];
