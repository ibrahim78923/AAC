import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { ROLES, TICKET_SELECTION_TYPE } from '@/constants/strings';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const mergeTicketsFormValidationSchema = Yup?.object()?.shape({
  ticketSelection: Yup?.mixed()?.nullable()?.required('Required'),
  searchTicket: Yup?.mixed()?.nullable()?.required('Required'),
});

export const mergeTicketsFormDefaultValue: any = {
  ticketSelection: {
    _id: TICKET_SELECTION_TYPE?.REQUESTER,
    label: TICKET_SELECTION_TYPE?.REQUESTER,
  },
  searchTicket: [],
  requester: null,
};
const ticketSelectionType = [
  TICKET_SELECTION_TYPE?.REQUESTER,
  TICKET_SELECTION_TYPE?.SUBJECT,
  TICKET_SELECTION_TYPE?.ID,
];
export const check: any = (
  apiQueryTicketBySubject: any,
  apiQueryTicketByRequester: any,
  apiQueryTicketById: any,
  selectedSearchType: any,
) => {
  const respectiveParam: any = {
    [TICKET_SELECTION_TYPE?.REQUESTER]: {
      apiQuery: apiQueryTicketByRequester,
      queryKey: 'id',
    },
    [TICKET_SELECTION_TYPE?.SUBJECT]: {
      apiQuery: apiQueryTicketBySubject,
      queryKey: 'search',
    },
    [TICKET_SELECTION_TYPE?.ID]: {
      apiQuery: apiQueryTicketById,
      queryKey: 'ticketId',
    },
  };
  if (!ticketSelectionType?.includes(selectedSearchType))
    return respectiveParam[TICKET_SELECTION_TYPE?.REQUESTER];
  return respectiveParam[selectedSearchType];
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
export const mergeTicketsFormFieldsDynamic = (
  watchForTicketSelection: any,
  apiQueryRequester: any,
  apiQueryTicketByRequester: any,
  apiQueryTicketBySubject: any,
  apiQueryTicketById: any,
  getValues: any,
) => [
  {
    id: 1,
    component: RHFAutocomplete,
    componentProps: {
      name: 'ticketSelection',
      label: 'Find ticket by',
      fullWidth: true,
      options: ticketSelectionOptions,
      getOptionLabel: (option: any) => option?.label,
    },
  },
  ...(watchForTicketSelection?._id === TICKET_SELECTION_TYPE?.REQUESTER
    ? [
        {
          id: 3,
          componentProps: {
            name: 'requester',
            label: 'Search Requester id',
            fullWidth: true,
            required: true,
            apiQuery: apiQueryRequester,
            externalParams: { limit: 50, role: ROLES?.ORG_REQUESTER },
            getOptionLabel: (option: any) =>
              `${option?.firstName} ${option?.lastName}`,
            placeholder: 'Add Requester',
          },
          component: RHFAutocompleteAsync,
        },
        {
          id: 4,
          component: Typography,
          heading: `${
            !!getValues('requester')?._id
              ? `The requester id is ${getValues('requester')?._id}`
              : ``
          }`,
          componentProps: {
            color: 'slateBlue.main',
            variant: 'body2',
          },
        },
      ]
    : []),
  {
    id: 2,
    component: RHFAutocompleteAsync,
    componentProps: {
      name: 'searchTicket',
      label: 'Search Ticket',
      fullWidth: true,
      required: true,
      multiple: watchForTicketSelection?._id !== TICKET_SELECTION_TYPE?.ID,
      queryKey: check(
        apiQueryTicketBySubject,
        apiQueryTicketByRequester,
        apiQueryTicketById,
        watchForTicketSelection?._id,
      )?.queryKey,
      apiQuery: check(
        apiQueryTicketBySubject,
        apiQueryTicketByRequester,
        apiQueryTicketById,
        watchForTicketSelection?._id,
      )?.apiQuery,
      getOptionLabel: (option: any) =>
        `${option?.ticketIdNumber} ${option?.subject}`,
    },
  },
];
