import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const goalDetailsValidationSchema = Yup.object().shape({
  goalName: Yup.string(),
  selectGoalCategory: Yup.string(),
  selectGoalType: Yup.string(),
});

export const goalDetailsDefaultValues = {
  goalName: null,
  selectGoalCategory: '',
  selectGoalType: '',
};

export const goalDetailsArray = [
  {
    componentProps: {
      name: 'goalName ',
      label: 'Goal Name ',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'selectGoalCategory',
      label: 'Select Goal Category ',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'sales', label: 'Sales' },
      { value: 'services', label: 'Services' },
      { value: 'marketing', label: 'Marketing' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'selectGoalType',
      label: 'Select Goal Type ',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'closedTickets', label: 'Closed tickets' },
      {
        value: 'ticketsAverageResponseTime',
        label: 'Tickets Average response time',
      },
      {
        value: 'AverageTicketResolutionTime',
        label: 'Average ticket resolution time',
      },
    ],
    component: RHFSelect,
    md: 12,
  },
];

export const goalDetailsTemplateArray = [
  {
    componentProps: {
      name: 'goalName ',
      label: 'Goal Name ',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'object',
      label: 'Object',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'call', label: 'Call' },
      { value: 'company', label: 'Company' },
      { value: 'contact', label: 'Contact' },
      { value: 'conversation', label: 'Conversation' },
      { value: 'deal', label: 'Deal' },
      { value: 'meeting', label: 'Meeting' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'property ',
      label: 'Property',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'activityCreatedBy', label: 'Activity created by' },
      { value: 'callDration', label: 'Call duration' },
      { value: 'createdByUserID', label: 'Created by user ID' },
      { value: 'recordID', label: 'Record ID' },
      { value: 'updatedByUserID', label: 'Updated by user ID' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'aggregationType',
      label: 'Aggregation Type',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'sum', label: 'SUM' },
      { value: 'average', label: 'AVERAGE' },
      { value: 'min', label: 'MIN' },
      { value: 'max', label: 'MAX' },
      { value: 'count', label: 'COUNT' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'unitMeasurement',
      label: 'Unit of Measurement',
      fullWidth: true,
      select: true,
      required: true,
      disabled: true,
    },
    options: [
      { value: 'closedTickets', label: 'Closed tickets' },
      {
        value: 'ticketsAverageResponseTime',
        label: 'Tickets Average response time',
      },
      {
        value: 'AverageTicketResolutionTime',
        label: 'Average ticket resolution time',
      },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'propertyDate',
      label: 'Property Date',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'propertyDate', label: 'Property Date' },
      { value: 'lastModifiedDate', label: 'Last Modified Date' },
      { value: 'activityDate', label: 'Activity Date' },
    ],
    component: RHFSelect,
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
      { value: 'highLower', label: 'Higher value is better, Lower is worse' },
      { value: 'lowerHigher', label: 'Lower value is better, Higher is worse' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
