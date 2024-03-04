import {
  RHFCheckbox,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const upsertRolesValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Required'),
  description: Yup?.string()?.trim(),
});

export const upsertRolesDefaultValues = {
  name: '',
  description: '',
  editNotes: '',
  createEditTasksInTickets: '',
  createEditAnnouncements: '',
};

export const upsertRolesFormData = [
  {
    id: 1,
    componentProps: {
      label: 'Name',
      name: 'name',
      placeholder: 'Enter Role Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      label: 'Description',
      name: 'description',
      placeholder: 'Enter Role Description',
      style: { height: '20vh' },
    },
    component: RHFEditor,
  },
];

export const rolesAccordionsTicketsData = {
  Tickets: [
    {
      id: 3,
      componentProps: {
        name: 'viewTickets',
        label: 'View Tickets',
      },
      component: RHFCheckbox,
      md: 4,
    },
    {
      id: 4,
      componentProps: {
        name: 'sendReplyToTickets',
        label: 'Send Reply to Tickets',
      },
      component: RHFCheckbox,
      md: 4,
    },
    {
      id: 5,
      componentProps: {
        name: 'mergeSplitTicket',
        label: 'Merge / Split a ticket',
      },
      component: RHFCheckbox,
      md: 4,
    },
    {
      id: 6,
      componentProps: {
        name: 'deleteTicket',
        label: 'Delete a ticket',
      },
      component: RHFCheckbox,
      md: 4,
    },
    {
      id: 7,
      componentProps: {
        name: 'forwardConversation',
        label: 'Forward a conversation',
      },
      component: RHFCheckbox,
      md: 4,
    },
    {
      id: 8,
      componentProps: {
        name: 'editTicketProperties',
        label: 'Edit Ticket Properties',
      },
      component: RHFCheckbox,
      md: 4,
    },
    {
      id: 9,
      componentProps: {
        name: 'viewAddCallResponders',
        label: 'View / Add on-call Responders',
      },
      component: RHFCheckbox,
      md: 4,
    },
    {
      id: 10,
      componentProps: {
        name: 'editNotes',
        label: 'Edit Notes',
      },
      component: RHFCheckbox,
      md: 4,
      children: {},
    },
    {
      id: 11,
      componentProps: {
        name: 'createEditTasksInTickets',
        label: 'Create and Edit Tasks in Tickets',
      },
      component: RHFCheckbox,
      md: 4,
    },
    {
      id: 12,
      componentProps: {
        name: 'deleteConversation',
        label: 'Delete a conversation',
      },
      component: RHFCheckbox,
      md: 4,
    },
  ],
  Inventory: [
    {
      id: 13,
      componentProps: {
        name: 'viewAssets',
        label: 'View Assets',
      },
      component: RHFCheckbox,
      md: 4,
    },
    {
      id: 14,
      componentProps: {
        name: 'createEditAssets',
        label: 'Create and Edit Assets',
      },
      component: RHFCheckbox,
      md: 4,
    },
    {
      id: 15,
      componentProps: {
        name: 'editChanges',
        label: 'Edit Changes',
      },
      component: RHFCheckbox,
      md: 4,
    },
    {
      id: 16,
      componentProps: {
        name: 'manageCost',
        label: 'Manage Cost',
      },
      component: RHFCheckbox,
      md: 4,
    },
  ],
  Contracts: [
    {
      id: 17,
      componentProps: {
        name: 'viewContracts',
        label: 'View Contracts',
      },
      component: RHFCheckbox,
      md: 4,
    },
    {
      id: 18,
      componentProps: {
        name: 'manageContracts',
        label: 'Manage Contracts',
      },
      component: RHFCheckbox,
      md: 4,
    },
    {
      id: 19,
      componentProps: {
        name: 'deleteContracts',
        label: 'Delete Contracts',
      },
      component: RHFCheckbox,
      md: 4,
    },
  ],
  'Purchase Orders': [
    {
      id: 20,
      componentProps: {
        name: 'viewPurchaseOrder',
        label: 'View Purchase Order',
      },
      component: RHFCheckbox,
      md: 4,
    },
    {
      id: 21,
      componentProps: {
        name: 'managePurchaseOrder',
        label: 'Manage Purchase Order',
      },
      component: RHFCheckbox,
      md: 4,
    },
    {
      id: 22,
      componentProps: {
        name: 'deletePurchaseOrder',
        label: 'Delete Purchase Order',
      },
      component: RHFCheckbox,
      md: 4,
    },
  ],
  Workload: [
    {
      id: 23,
      componentProps: {
        name: 'manageGroupMembersWorkload',
        label: 'Manage group member’s workload',
      },
      component: RHFCheckbox,
      md: 6,
    },
    {
      id: 24,
      componentProps: {
        name: 'manageProjectMembersWorkload',
        label: 'Manage project member’s workload',
      },
      component: RHFCheckbox,
      md: 6,
    },
  ],
  Announcements: [
    {
      id: 25,
      componentProps: {
        name: 'createEditAnnouncements',
        label: 'Create or Edit Announcements',
      },
      component: RHFCheckbox,
      md: 12,
    },
  ],
};

export const editNotesOptions = [];
export const createEditTasksInTicketsOptions = [];
export const createEditAnnouncementsOptions = [
  {
    id: 30,
    componentProps: {
      name: 'manageWork',
      label: '',
      options: [
        { value: 'editEveryoneNotes', label: 'Edit Everyone’s Notes' },
        {
          value: 'editTheirOwnNotes',
          label: 'Edit Their Own Notes',
        },
      ],
    },
    component: RHFCheckbox,
    md: 4,
  },
];
