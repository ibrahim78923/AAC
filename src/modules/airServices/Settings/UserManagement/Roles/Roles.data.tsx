import {
  RHFCheckbox,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { Typography } from '@mui/material';
export const upsertRolesValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Name is required'),
  description: Yup?.string()?.nullable(),
  editNotes: Yup?.string()?.trim()?.notRequired(),
  createEditTasks: Yup?.string()?.trim()?.notRequired(),
  viewTickets: Yup?.string()?.trim()?.notRequired(),
  sendTickets: Yup?.string()?.trim()?.notRequired(),
  mergeTicket: Yup?.string()?.trim()?.notRequired(),
  deleteTicket: Yup?.string()?.trim()?.notRequired(),
  forwardConversation: Yup?.string()?.trim()?.notRequired(),
  editProperties: Yup?.string()?.trim()?.notRequired(),
  viewResponders: Yup?.string()?.trim()?.notRequired(),
  deleteConversation: Yup?.string()?.trim()?.notRequired(),
  viewResponse: Yup?.string()?.trim()?.notRequired(),
  viewAsset: Yup?.string()?.trim()?.notRequired(),
  manageCost: Yup?.string()?.trim()?.notRequired(),
  viewContracts: Yup?.string()?.trim()?.notRequired(),
  viewPurchase: Yup?.string()?.trim()?.notRequired(),
  manageGroup: Yup?.string()?.trim()?.notRequired(),
  manageWork: Yup?.string()?.trim()?.notRequired(),
  announcements: Yup?.string()?.trim()?.notRequired(),
  createEditAnnouncement: Yup?.string()?.trim()?.notRequired(),
  solutions: Yup?.string()?.trim()?.notRequired(),
});

export const upsertRolesDefaultValues = {
  name: '',
  description: '',
  viewTickets: '',
  sendTickets: '',
  mergeTicket: '',
  deleteTicket: '',
  forwardConversation: '',
  editProperties: '',
  viewResponders: '',
  editNotes: '',
  createEditTasks: '',
  deleteConversation: '',
  viewResponse: '',
  viewAsset: '',
  manageCost: '',
  viewContracts: '',
  viewPurchase: '',
  manageGroup: '',
  manageWork: '',
  announcements: '',
  createEditAnnouncement: '',
  solutions: '',
};

export const upsertRolesData = [
  {
    title: 'Name',
    componentProps: {
      name: 'name',
      placeholder: 'Enter Role Name',
      fullWidth: true,
      required: true,
    },

    component: RHFTextField,
    md: 7,
  },
  {
    title: 'Description',
    componentProps: {
      name: 'description',
      placeholder: 'Enter Role Description here',
      fullWidth: true,
      style: { height: '20vh' },
    },
    component: RHFEditor,
    md: 7,
    mb: 2,
  },
];
export const RolesAccordionsTicketsData = {
  Tickets: [
    {
      componentProps: {
        color: '#7a7a7b',
        varient: 'h6',
        heading: 'Agent Can',
      },
      gridLength: 8,

      component: Typography,
    },
    {
      componentProps: {
        name: 'viewTickets',
        label: 'View Tickets',
        sx: { mb: 4 },
      },
      component: RHFCheckbox,
      md: 12,
    },

    {
      componentProps: {
        name: 'sendTickets',
        label: 'Send reply to a tickets',
        sx: { mb: 4 },
      },
      component: RHFCheckbox,
      md: 12,
    },
    {
      componentProps: {
        name: 'mergeTicket',
        label: 'Merge / split a ticket',
        sx: { mb: 4 },
      },
      component: RHFCheckbox,
      md: 12,
    },
    {
      componentProps: {
        name: 'deleteTicket',
        label: 'Delete a ticket',
        sx: { mb: 4 },
      },
      component: RHFCheckbox,
      md: 12,
    },
    {
      componentProps: {
        name: 'forwardConversation',
        label: 'Forward a conversation',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
    {
      componentProps: {
        name: 'editProperties',
        label: 'Edit ticket properties',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
    {
      componentProps: {
        name: 'viewResponders',
        label: 'View / add on-call responders',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
    {
      componentProps: {
        name: 'editNotes',
        label: 'Edit Notes',
        fullWidth: true,
      },

      component: RHFCheckbox,
      md: 12,
    },
    {
      componentProps: {
        name: 'createEditTasks',
        label: 'Create and Edit Tasks in tickets',
        fullWidth: true,
      },

      component: RHFCheckbox,
      md: 12,
    },
    {
      componentProps: {
        name: 'deleteConversation',
        label: 'Delete a conversation',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
    {
      componentProps: {
        name: 'viewResponse',
        label: 'View CSAT Response',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
  ],
  Inventory: [
    {
      componentProps: {
        name: 'viewAsset',
        label: 'View Asset',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
    {
      componentProps: {
        name: 'manageCost',
        label: 'Manage Cost',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
  ],
  Contracts: [
    {
      componentProps: {
        name: 'viewContracts',
        label: 'View Contracts',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
  ],
  'Purchase Orders': [
    {
      componentProps: {
        name: 'viewPurchase',
        label: 'View Purchase',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
  ],

  Workload: [
    {
      componentProps: {
        name: 'manageGroup',
        label: 'Manage group member’s workload',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
    {
      componentProps: {
        name: 'manageWork',
        label: 'Manage group member’s workload',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
  ],
  Announcements: [
    {
      componentProps: {
        name: 'announcements',
        label: 'Create or Edit Announcements',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
    {
      componentProps: {
        name: 'createEditAnnouncement',
        label: 'Create or Edit Announcements',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
  ],
  Solutions: [
    {
      componentProps: {
        name: 'solutions',
        label: 'Solutions',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
  ],
};

export const ticketOptionViewsEditNotes = [
  { label: 'Edit everyone’s notes', value: 'Edit everyone’s notes' },
  {
    label: 'Edit only their own notes',
    value: 'Edit only their own notes',
  },
];
export const ticketOptionViewsEditEntries = [
  {
    label: 'Edit everyone’s time entries',
    value: 'Edit everyone’s time entries',
  },
  {
    label: 'Edit only their time',
    value: 'Edit only their time activity',
  },
];
export const ticketOptionViewAnnouncements = [
  {
    label: 'Edit everyone’s time Announcements',
    value: 'Edit everyone’s time entries',
  },
  {
    label: 'Edit only their Announcements',
    value: 'Edit only their time',
  },
];

export const inventoryOptions = [
  {
    label: 'Create and Edit Asset',
    name: 'Create and Edit Asset Inventory',
  },
  {
    label: 'Edit Changes',
    name: 'Edit Changes',
  },
];
export const contractOptions = [
  {
    label: 'Create and Edit contract',
    name: 'Create and Edit Asset Contract',
  },
  {
    label: 'Edit contract',
    name: 'Edit contract',
  },
];

export const purchaseOptions = [
  {
    label: 'Create and Edit purchase',
    name: 'Create and Edit Asset',
  },
  {
    label: 'Edit purchase',
    name: 'Edit purchase',
  },
];
export const solutionsOptions = [
  {
    label: 'Create and Edit solution',
    name: 'Create and Edit Purchase',
  },
  {
    label: 'Edit solution',
    name: 'Edit solution',
  },
];

export const rolesCardOptions = ['Edit', 'Delete'];
