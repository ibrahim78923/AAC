import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFDatePicker,
  RHFDropZone,
  RHFEditor,
  RHFMultiCheckbox,
  RHFRadioGroup,
  RHFSearchableSelect,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import { DATE_FORMAT } from '@/constants';

export const predefinedDealFields = [
  {
    componentProps: {
      name: 'name',
      label: 'Deal Name',
      required: true,
      placeholder: 'Enter Name',
    },
    component: RHFTextField,
  },
  {
    componentProps: {
      name: 'dealPipelineId',
      label: 'Deal Pipeline',
      placeholder: 'Select Pipeline',
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'dealStageId',
      label: 'Deal Stage',
      required: true,
      select: true,
    },
    options: [{ value: 'follow-up', label: 'Follow Up' }],
    component: RHFSelect,
  },
  {
    title: 'Amount',
    componentProps: {
      name: 'amount',
      label: 'Amount',
      placeholder: 'Enter Amount',
      type: 'number',
      InputProps: { inputProps: { min: 0 } },
    },
    component: RHFTextField,
  },
  {
    componentProps: {
      name: 'closeDate',
      label: 'Close Date',
      placeholder: 'MM/DD/YYYY',
      minDate: new Date(),
      fullWidth: true,
      require: false,
    },
    md: 12,
    component: RHFDatePicker,
  },
  {
    title: 'Deal Owner',
    componentProps: {
      name: 'ownerId',
      label: 'Deal Owner',
      placeholder: 'Select Owner',
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'priority',
      label: 'Priority',
      placeholder: 'Select Priority',
      options: ['Low', 'Medium', 'High'],
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'products',
      GridView: 6,
      isCheckBox: true,
      label: 'Add Line Item',
      options: [{ value: 'name', label: 'Name' }],
      fullWidth: true,
    },
    component: RHFMultiCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'billingFrequency',
      label: 'Billing Frequency',
      placeholder: 'Select Frequency',
      select: true,
      options: ['monthly', 'quarterly'],
    },
    component: RHFAutocomplete,
  },
];

export const predefinedGoalFields = [
  {
    componentProps: {
      name: 'goalName',
      label: 'Goal Name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'trackingMethod',
      label: 'Tracking Method',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      {
        value: 'Higher value is better, Lower is worse',
        label: 'Higher value is better, Lower is worse',
      },
      {
        value: 'Lower value is better, Higher is worse',
        label: 'Lower value is better, Higher is worse',
      },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'userTeam',
      fullWidth: true,
      defaultValue: 'USER',
      row: true,
      options: [
        { value: 'USER', label: 'Users' },
        { value: 'TEAM', label: `Teams` },
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },
  {
    componentProps: {
      name: 'collaborators',
      label: 'collaborators',
      required: true,
      fullWidth: true,
      placeholder: 'Select user',
      multiple: true,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'duration',
      label: 'Duration',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'monthly', label: 'Monthly' },
      { value: 'quarterly', label: 'Quarterly' },
      { value: 'Yearly', label: 'Yearly' },
      { value: 'custom', label: 'Custom' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'from',
      label: 'From',
      fullWidth: true,
    },
    component: 'RHFDatePicker',
    md: 6,
  },
  {
    componentProps: {
      name: 'to',
      label: 'To',
      fullWidth: true,
    },
    component: 'RHFDatePicker',
    md: 6,
  },
];

export const predefinedQuoteFields = [
  {
    md: 12,
    component: RHFSearchableSelect,
    componentProps: {
      name: 'dealId',
      label: 'Select Deal',
      required: true,
      options: [{ value: 'won', label: 'Won Deal' }],
    },
  },
  {
    id: 'template',
    componentProps: {
      label: 'Select Quote Template',
      name: 'template',
      fullWidth: true,
      required: true,
      placeholder: 'Select quote template',
      options: ['Basic', 'Original'],
    },

    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 'name',
    component: RHFTextField,
    componentProps: {
      name: 'name',
      label: 'Quote Name',
      fullWidth: true,
      placeholder: 'New quote',
      required: true,
    },
  },
  {
    componentProps: {
      name: 'expiryDate',
      label: 'Quote Expiration Date',
      placeholder: DATE_FORMAT?.UI,
      minDate: new Date(),
      fullWidth: true,
      required: true,
    },
    md: 12,
    component: RHFDatePicker,
  },
  {
    id: 'notes',
    component: RHFTextField,
    componentProps: {
      name: 'notes',
      label: 'Notes',
      fullWidth: true,
      multiline: true,
      rows: 3,
      placeholder: 'Enter notes you like to show buyer.',
    },
  },
  {
    id: 'termsAndConditions',
    component: RHFTextField,
    componentProps: {
      name: 'termsAndConditions',
      label: 'Terms and Condition for purchase',
      fullWidth: true,
      multiline: true,
      rows: 3,
      placeholder: 'Enter details',
    },
  },
];

export const predefinedDealPipelineFields = [
  {
    component: RHFTextField,
    componentProps: {
      name: 'pipelineName',
      label: 'Pipeline Name',
      fullWidth: true,
      placeholder: 'Pipeline name',
    },
  },
  {
    componentProps: {
      name: 'defaultPipeline',
      label: 'Mark as Default Pipeline',
    },
    component: RHFCheckbox,
    md: 12,
  },
];

export const predefinedSalesProductFields = [
  {
    componentProps: {
      name: 'name',
      label: 'Product Name',
      fullWidth: true,
      placeholder: 'Enter here',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'sku',
      label: 'SKU',
      fullWidth: true,
      select: false,
      placeholder: 'Enter here',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'purchasePrice',
      label: 'Purchase Price  (£) ',
      fullWidth: true,
      placeholder: 'Enter here',
      required: true,
      type: 'number',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      placeholder: 'Select category',
      name: 'category',
      label: 'Category',
      required: true,
    },
    component: RHFAutocomplete,
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
      name: 'unitPrice',
      label: 'Unit Price (£)',
      fullWidth: true,
      placeholder: 'Enter here',
      required: true,
      type: 'number',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 13,
    componentProps: {
      name: 'isActive',
      label: 'Active Product',
    },
    component: RHFSwitch,
    md: 12,
  },
  {
    componentProps: {
      name: 'image',
      label: 'Upload',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];
