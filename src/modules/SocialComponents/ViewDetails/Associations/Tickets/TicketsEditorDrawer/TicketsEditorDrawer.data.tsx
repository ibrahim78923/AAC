import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { DRAWER_TITLE } from '@/constants';
import { TICKET_PRIORITY, TICKET_STATUS } from '@/constants/strings';
import * as Yup from 'yup';

const ticketStatusOptions = [
  {
    _id: TICKET_STATUS?.OPEN,
    label: TICKET_STATUS?.OPEN,
  },
  {
    _id: TICKET_STATUS?.PENDING,
    label: TICKET_STATUS?.PENDING,
  },
  {
    _id: TICKET_STATUS?.RESOLVED,
    label: TICKET_STATUS?.RESOLVED,
  },
  {
    _id: TICKET_STATUS?.CLOSED,
    label: TICKET_STATUS?.CLOSED,
  },
  {
    _id: TICKET_STATUS?.SPAM,
    label: TICKET_STATUS?.SPAM,
  },
];

const ticketPriorityOptions = [
  {
    _id: TICKET_PRIORITY?.LOW,
    label: TICKET_PRIORITY?.LOW,
  },
  {
    _id: TICKET_PRIORITY?.MEDIUM,
    label: TICKET_PRIORITY?.MEDIUM,
  },
  {
    _id: TICKET_PRIORITY?.HIGH,
    label: TICKET_PRIORITY?.HIGH,
  },
  {
    _id: TICKET_PRIORITY?.URGENT,
    label: TICKET_PRIORITY?.URGENT,
  },
];

export const ticketsValidationSchema = Yup?.object()?.shape({
  subject: Yup?.string()?.trim()?.required('Field is Required'),
  ticketStatus: Yup?.string()?.trim()?.required('Field is Required'),
  requester: Yup?.mixed()?.nullable()?.required('Field is Required'),
  status: Yup?.mixed()?.nullable()?.required('Field is Required'),
  category: Yup?.mixed()?.nullable()?.required('Field is Required'),
  priority: Yup?.mixed()?.nullable()?.required('Field is Required'),
});

export const ticketsDefaultValues = {
  ticketStatus: 'New Ticket',
  subject: '',
  requester: null,
  description: '',
  category: null,
  status: null,
  priority: null,
  attachfile: '',
};

export const ticketsDataArray = (
  apiQueryRequester?: any,
  apiQueryCategory?: any,
  openDrawer?: any,
  productId?: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      required: true,
      apiQuery: apiQueryRequester,
      disabled: openDrawer === DRAWER_TITLE?.VIEW,
      externalParams: {
        admin: true,
        productId: productId,
      },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
      placeholder: 'Add Requester',
    },
    component: RHFAutocompleteAsync,
  },
  {
    componentProps: {
      name: 'subject',
      label: 'subject',
      fullWidth: true,
      required: true,
      placeholder: 'Enter subject',
      disabled: openDrawer === DRAWER_TITLE?.VIEW,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      disabled: openDrawer === DRAWER_TITLE?.VIEW,
    },
    component: RHFEditor,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
      apiQuery: apiQueryCategory,
      placeholder: 'Choose Category',
      getOptionLabel: (option: any) => option?.categoryName,
      disabled: openDrawer === DRAWER_TITLE?.VIEW,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 5,
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      required: true,
      placeholder: 'Choose Status',
      options: ticketStatusOptions,
      getOptionLabel: (option: any) => option?.label,
      disabled: openDrawer === DRAWER_TITLE?.VIEW,
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      name: 'priority',
      label: 'Priority',
      fullWidth: true,
      required: true,
      placeholder: 'Choose Priority',
      options: ticketPriorityOptions,
      getOptionLabel: (option: any) => option?.label,
      disabled: openDrawer === DRAWER_TITLE?.VIEW,
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'attachFile',
      label: '',
      fullWidth: true,
      disabled: openDrawer === DRAWER_TITLE?.VIEW,
    },
    component: RHFDropZone,
    md: 12,
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
