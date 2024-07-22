import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { TICKETS_TYPE } from '@/constants';
import { ROLES } from '@/constants/strings';
import * as Yup from 'yup';

export const ticketsValidationSchema: any = Yup?.object()?.shape({
  subject: Yup?.string()?.when('ticketStatus', ([ticket]: any, field: any) =>
    ticket === TICKETS_TYPE?.NEW_TICKETS
      ? field?.required('Field is required')
      : field.optional(),
  ),
  requester: Yup?.object()?.when('ticketStatus', ([ticket]: any, field: any) =>
    ticket === TICKETS_TYPE?.NEW_TICKETS
      ? field?.required('Field is required')
      : field.nullable().optional(),
  ),
  status: Yup?.string()?.when('ticketStatus', ([ticket]: any, field: any) =>
    ticket === TICKETS_TYPE?.NEW_TICKETS
      ? field?.required('Field is required')
      : field?.optional(),
  ),
  ticketId: Yup?.object()?.when('ticketStatus', ([ticket]: any, field: any) =>
    ticket === TICKETS_TYPE?.NEW_TICKETS
      ? field.nullable().optional()
      : field?.required('Field is required'),
  ),
});

export const ticketsDefaultValues: any = {
  ticketStatus: TICKETS_TYPE?.NEW_TICKETS,
  subject: '',
  requester: null,
  description: '',
  category: null,
  status: '',
  priority: '',
  attachfile: '',
  ticketId: null,
};

export const ticketsDataArray = (addTicketFormParams: any) => {
  const { apiQueryRequester, apiQueryCategories } = addTicketFormParams;

  return [
    {
      componentProps: {
        name: 'requester',
        label: 'Requester',
        placeholder: 'Add Requester',
        fullWidth: true,
        required: true,
        apiQuery: apiQueryRequester,
        externalParams: {
          limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
          role: ROLES?.ORG_REQUESTER,
        },
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
      },
      component: RHFAutocompleteAsync,
    },
    {
      componentProps: {
        name: 'subject',
        label: 'Subject',
        required: true,
        placeHolder: 'Subject',
        fullWidth: true,
        placeholder: 'Enter here',
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'description',
        label: 'Description',
        fullWidth: true,
      },
      component: RHFEditor,
      md: 12,
    },
    {
      componentProps: {
        name: 'category',
        label: 'Category',
        placeholder: 'Choose Category',
        fullWidth: true,
        apiQuery: apiQueryCategories,
        getOptionLabel: (option: any) => option?.categoryName,
      },
      component: RHFAutocompleteAsync,
    },
    {
      componentProps: {
        name: 'status',
        label: 'Status',
        placeholder: 'Select Status',
        required: true,
        select: true,
        options: ['OPEN', 'PENDING', 'RESOLVED', 'CLOSED', 'SPAMS'],
      },
      component: RHFAutocomplete,
      md: 12,
    },
    {
      componentProps: {
        name: 'priority',
        label: 'Priority',
        placeholder: 'Select Priority',
        select: true,
        options: ['LOW', 'MEDIUM', 'HIGH', 'URJENT'],
      },
      component: RHFAutocomplete,
      md: 12,
    },
    {
      componentProps: {
        name: 'attachFile',
        label: '',
        fullWidth: true,
      },
      component: RHFDropZone,
      md: 12,
    },
  ];
};

export const existingTicketDataArray = (ticketsList: any) => [
  {
    id: 'ticketId',
    component: RHFAutocompleteAsync,
    md: 12,
    componentProps: {
      name: 'ticketId',
      label: 'Select Ticket',
      placeholder: 'Select Ticket',
      fullWidth: true,
      apiQuery: ticketsList,
      getOptionLabel: (option: any) => option?.ticketIdNumber,
      externalParams: { metaData: false },
      required: true,
    },
  },
];

export const ticketOptions = [
  {
    label: 'New Ticket',
    value: 'new-ticket',
  },
  {
    label: 'Existing Ticket',
    value: 'existing-ticket',
  },
];

export const drawerTitle: any = {
  Add: 'Add Tickets',
  Edit: 'Edit Tickets',
  View: 'View Tickets',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
