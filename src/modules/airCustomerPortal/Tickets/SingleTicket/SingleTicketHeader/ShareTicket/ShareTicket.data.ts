import { RHFAutocompleteAsync, RHFCheckbox } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const shareTicketValidationSchema = Yup.object().shape({
  addPeoples: Yup?.array()
    ?.min(1, 'At least one person is required')
    ?.nullable()
    ?.required('Required'),
  sendNotification: Yup?.boolean(),
});

export const shareTicketDefaultValues = {
  addPeoples: [],
  sendNotification: false,
};

export const shareTicket = (userDropdown: any) => [
  {
    id: 1,
    componentProps: {
      name: 'addPeoples',
      label: 'Add People',
      placeholder: 'Invite Someone',
      fullWidth: true,
      apiQuery: userDropdown,
      required: true,
      externalParams: { admin: true, requester: true },
      getOptionLabel: (option: any) =>
        `${option?.firstName}  ${option?.lastName}`,
      multiple: true,
      size: 'small',
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'sendNotification',
      label: 'Also send Email Notification',
      fullWidth: true,
    },
    component: RHFCheckbox,
    md: 12,
  },
];
