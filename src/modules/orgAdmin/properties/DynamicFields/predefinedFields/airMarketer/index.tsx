import { AddPlusPrimaryIcon } from '@/assets/icons';
import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFDropZone,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { IconButton, InputAdornment } from '@mui/material';

export const predefinedCampaignFields = [
  {
    componentProps: {
      name: 'title',
      label: 'Title',
      placeholder: 'John Allen',
      required: true,
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'campaignOwner',
      label: 'Campaign Owner',
      fullWidth: true,
      select: true,
    },
    options: [{ value: '1', label: 'John Allen' }],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'campaignGoal',
      label: 'Campaign Goal',
      placeholder: 'Get 5k likes on instagram',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'campaignAudience',
      label: 'Campaign Audience',
      placeholder: 'Instagram influencers',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'campaignBudget',
      label: 'Campaign Budget',
      placeholder: '£20.105.00',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'campaignStatus',
      label: 'campaign Status',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'scheduled', label: 'Scheduled' },
      { value: 'inprogress', label: 'In Progress' },
      { value: 'active', label: 'Active' },
      { value: 'paused', label: 'Paused' },
      { value: 'completed', label: 'Completed' },
    ],

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: '',
      fullWidth: true,
      placeholder: 'This campaign is created to market our instagram page',
    },
    component: RHFEditor,
    md: 12,
  },
];

export const predefinedCampaignTaskFields = [
  {
    componentProps: {
      name: 'taskName',
      label: 'Task Name',
      placeholder: 'Enter Name',
      required: true,
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      placeholder: 'Select type',
      name: 'taskType',
      label: 'Task Type',
      fullWidth: true,
      required: true,
      options: ['email', 'call', 'others'],
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      placeholder: 'Select campaign',
      name: 'campaignId',
      label: 'Select Campaign',
      fullWidth: true,
      required: true,
      options: ['email', 'call', 'others'],
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      placeholder: 'Select assignee',
      name: 'assignedTo',
      label: 'Assigned To',
      required: true,
      options: ['email', 'call', 'others'],
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'dueDate',
      label: 'Due Date',
      fullWidth: true,
      required: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'note',
      label: 'Note',
      fullWidth: true,
      required: true,
    },
    component: RHFEditor,
    md: 12,
  },
];

export const predefinedSmsBroadcastFields = [
  {
    componentProps: {
      name: 'name',
      label: 'Broadcast Name',
      required: true,
      placeholder: 'Enter name',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'senderId',
      label: 'Sender',
      disabled: true,
      placeholder: 'Sender',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Campaign',
    componentProps: {
      placeholder: 'Select campaign',
      name: 'campaignId',
      label: 'Campaign',
      required: true,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    title: 'useTemplate',
    componentProps: {
      placeholder: 'Select template',
      name: 'templateId',
      label: 'Use Template (Optional)',
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'recipients',
      label: 'Recipients',
      placeholder: 'Select recipients',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'detail',
      label: 'SMS Details',
      placeholder: 'Enter sms details..',
      required: true,
    },
    component: RHFEditor,
    md: 12,
  },
];

export const predefinedSmsTemplateFields = [
  {
    componentProps: {
      name: 'name',
      label: 'Template Name',
      fullWidth: true,
      required: true,
      placeholder: 'Enter Name',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'category',
      label: 'Category',
      placeholder: 'Select Category',
      fullWidth: true,
      required: true,
      options: [
        'Account Update',
        'Ticket Update',
        'Alert Update',
        'Appointment Update',
        'Personal finance Update',
        'Shopping Update',
        'Payment Update',
        'Other',
      ],
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'language',
      label: 'Language',
      fullWidth: true,
      required: true,
      placeholder: 'Select Language',
      options: [
        'English',
        'Armenian',
        'Dinka',
        'Kirundi',
        'Azerbaijani',
        'Turkmen',
        'Uzbek',
        'Kurdish',
      ],
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'detail',
      label: 'Details',
      fullWidth: true,
      required: true,
      placeholder: 'Type',
      multiline: true,
      rows: 4,
    },
    component: RHFTextField,
    md: 12,
  },
];

export const predefinedWhatsappBroadcastFields = [
  {
    id: '01',
    componentProps: {
      label: 'Broadcast Name',
      name: 'name',
      fullWidth: true,
      placeholder: 'Enter Name',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: '02',
    componentProps: {
      label: 'Campaign',
      name: 'campaign',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'campaign1', label: 'Campaign 1' },
      { value: 'campaign2', label: 'Campaign 2' },
      { value: 'campaign3', label: 'Campaign 3' },
      { value: 'campaign4', label: 'Campaign 4' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    id: '03',
    componentProps: {
      label: 'Use Template (Optional)',
      name: 'template',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'template1', label: 'Template 1' },
      { value: 'template2', label: 'Template 2' },
      { value: 'template3', label: 'Template 3' },
      { value: 'template4', label: 'Template 4' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    id: '04',
    componentProps: {
      name: 'contacts',
      label: 'Add Contacts',
      fullWidth: true,
      required: true,
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end">
              <AddPlusPrimaryIcon />
            </IconButton>
          </InputAdornment>
        ),
      },
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: '05',
    component: RHFEditor,
    md: 12,
    componentProps: {
      name: 'details',
      label: 'Details',
      fullWidth: true,
      required: true,
    },
  },
  {
    id: '06',
    component: RHFDropZone,
    md: 12,
    title: 'Attachment',
    componentProps: {
      name: 'attachment',
      label: 'Attachment',
      fullWidth: true,
      multiline: true,
      rows: '4',
    },
  },
];

export const predefinedWhatsappTemplateFields = [
  {
    componentProps: {
      name: 'name',
      label: 'Template Name',
      placeholder: 'Enter Name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'category',
      label: 'Category',
      placeholder: 'Select Category',
      required: true,
      options: ['Authentication', 'Utility', 'Marketing'],
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'detail',
      label: 'Details',
      fullWidth: true,
      placeholder: 'Type',
      multiline: true,
      required: true,
      rows: 3,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'attachment',
      label: 'Attachment',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];

export const predefinedEmailFolderFields = [
  {
    id: 'name',
    componentProps: {
      name: 'name',
      label: 'Name',
      placeholder: 'Enter name',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
