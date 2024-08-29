import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import {
  AutocompleteAsyncOptionsI,
  AutocompleteOptionsI,
} from '@/components/ReactHookForm/ReactHookForm.interface';
import { TICKET_SELECTION_TYPE } from '@/constants/strings';
import { truncateText } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

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

const ticketSelectionType = [
  TICKET_SELECTION_TYPE?.REQUESTER,
  TICKET_SELECTION_TYPE?.SUBJECT,
  TICKET_SELECTION_TYPE?.ID,
];

export const check: any = (
  apiQueryTicketBySubject: any,
  apiQueryTicketByRequester: any,
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
  getValues: any,
  apiQueryTicketById: any,
) => {
  return [
    {
      id: 1,
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
            id: 3,
            componentProps: {
              name: 'requester',
              label: 'Search requester id',
              fullWidth: true,
              required: true,
              apiQuery: apiQueryRequester,
              externalParams: {
                requester: true,
                admin: true,
              },
              getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
                `${option?.firstName} ${option?.lastName}`,
              placeholder: 'Search Requester',
            },
            component: RHFAutocompleteAsync,
          },
          {
            id: 4,
            component: Typography,
            heading: `${
              !!getValues('requester')?._id
                ? `The requester id is ${getValues('requester')
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
    ...(watchForTicketSelection?._id !== TICKET_SELECTION_TYPE?.ID
      ? [
          {
            id: 2,
            component: RHFAutocompleteAsync,
            componentProps: {
              name: 'searchTicket',
              label: 'Search ticket',
              fullWidth: true,
              required: true,
              multiple: true,
              queryKey: check(
                apiQueryTicketBySubject,
                apiQueryTicketByRequester,
                watchForTicketSelection?._id,
              )?.queryKey,
              apiQuery: check(
                apiQueryTicketBySubject,
                apiQueryTicketByRequester,
                watchForTicketSelection?._id,
              )?.apiQuery,
              getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
                `${option?.ticketIdNumber} ${' '} ${truncateText(
                  option?.subject,
                )}`,
            },
          },
        ]
      : [
          {
            id: 5,
            component: RHFAutocompleteAsync,
            componentProps: {
              name: 'searchTicketId',
              label: 'Search ticket',
              fullWidth: true,
              required: true,
              queryKey: 'ticketIdNumber',
              apiQuery: apiQueryTicketById,
              getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
                `${option?.ticketIdNumber} ${' '} ${truncateText(
                  option?.subject,
                )}`,
            },
          },
        ]),
  ];
};
