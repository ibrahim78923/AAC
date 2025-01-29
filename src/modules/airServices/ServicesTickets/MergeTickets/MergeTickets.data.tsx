import { RHFAutocomplete } from '@/components/ReactHookForm';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { TICKET_SELECTION_TYPE } from '@/constants/strings';
import { Typography } from '@mui/material';
import * as Yup from 'yup';
import { RequesterFieldDropdown } from '../ServiceTicketFormFields/RequesterFieldDropdown';
import { TicketByIdFieldDropdown } from '../ServiceTicketFormFields/TicketByIdFieldDropdown';
import { TicketBySubjectFieldDropdown } from '../ServiceTicketFormFields/TicketBySubjectFieldDropdown';
import { TicketByRequesterFieldDropdown } from '../ServiceTicketFormFields/TicketByRequesterFieldDropdown';

export const mergeTicketsFormValidationSchema = Yup?.object()?.shape({
  ticketSelection: Yup?.mixed()?.nullable()?.required('Required'),
  searchTicket: Yup?.mixed()
    ?.nullable()
    ?.when('ticketSelection', {
      is: (value: any) => value?._id !== TICKET_SELECTION_TYPE?.ID,
      then: () => Yup?.array()?.min(1, 'Ticket is required'),
      otherwise: (schema: any) => schema?.notRequired(),
    }),
  requester: Yup?.mixed()
    ?.nullable()
    ?.when('ticketSelection', {
      is: (value: any) => value?._id === TICKET_SELECTION_TYPE?.REQUESTER,
      then: () => Yup?.mixed()?.nullable()?.required('Requester is required'),
      otherwise: (schema: any) => schema?.notRequired(),
    }),
  searchTicketId: Yup?.mixed()
    ?.nullable()
    ?.when('ticketSelection', {
      is: (value: any) => value?._id === TICKET_SELECTION_TYPE?.ID,
      then: () => Yup?.mixed()?.nullable()?.required('Ticket is required'),
      otherwise: (schema: any) => schema?.notRequired(),
    }),
});

export const mergeTicketsFormDefaultValue: any = {
  ticketSelection: {
    _id: TICKET_SELECTION_TYPE?.REQUESTER,
    label: TICKET_SELECTION_TYPE?.REQUESTER,
  },
  searchTicket: [],
  requester: null,
  searchTicketId: null,
};

const ticketSelectionOptions = [
  {
    _id: TICKET_SELECTION_TYPE?.REQUESTER,
    label: TICKET_SELECTION_TYPE?.REQUESTER,
  },
  {
    _id: TICKET_SELECTION_TYPE?.SUBJECT,
    label: TICKET_SELECTION_TYPE?.SUBJECT,
  },
  { _id: TICKET_SELECTION_TYPE?.ID, label: TICKET_SELECTION_TYPE?.ID },
];

export const ticketSelectionFieldDropdowns = {
  [TICKET_SELECTION_TYPE?.REQUESTER]: TicketByRequesterFieldDropdown,
  [TICKET_SELECTION_TYPE?.ID]: TicketByIdFieldDropdown,
  [TICKET_SELECTION_TYPE?.SUBJECT]: TicketBySubjectFieldDropdown,
};

export const mergeTicketsFormFieldsDynamic = (
  watchForTicketSelection: any,
  watch: any,
) => {
  return [
    {
      _id: 1,
      component: RHFAutocomplete,
      componentProps: {
        name: 'ticketSelection',
        label: 'Find ticket by',
        fullWidth: true,
        options: ticketSelectionOptions,
        getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
      },
    },
    ...(watchForTicketSelection?._id === TICKET_SELECTION_TYPE?.REQUESTER
      ? [
          {
            _id: 2,
            componentProps: {
              label: 'Search requester id',
              hasEndIcon: false,
            },
            component: RequesterFieldDropdown,
          },
          {
            _id: 3,
            component: Typography,
            heading: `${
              !!watch('requester')?._id
                ? `The requester id is ${watch('requester')
                    ?._id}. Paste this in below search field`
                : ``
            }`,
            componentProps: {
              color: 'slateBlue.main',
              variant: 'body2',
            },
          },
        ]
      : []),
    ...(!!watchForTicketSelection?._id
      ? [
          {
            _id: 4,
            component:
              ticketSelectionFieldDropdowns?.[watchForTicketSelection?._id],
          },
        ]
      : []),
  ];
};
