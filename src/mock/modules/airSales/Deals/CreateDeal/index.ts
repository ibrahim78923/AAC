import { RHFDatePicker, RHFTextField } from '@/components/ReactHookForm';

export const createDealData = [
  {
    title: 'Deal Name',
    componentProps: {
      name: 'DealName',
      label: 'Enter Name',
    },
    component: RHFTextField,
  },
  {
    title: 'Deal Pipeline',
    componentProps: {
      name: 'DealPipline',
      label: 'Select',
      select: true,
    },
    options: [
      { value: 'Registering Pipeline', label: 'Registering Pipeline' },
      { value: 'Sales Pipeline', label: 'Sales Pipeline' },
      { value: 'Recruitment Pipeline', label: 'Recruitment Pipeline' },
      { value: 'Test Pipeline', label: 'Test Pipeline' },
    ],
    component: RHFTextField,
  },
  {
    title: 'Deal Stage',
    componentProps: {
      name: 'DealStage',
      label: 'Select',
      select: true,
    },
    options: [
      { value: 'New', label: 'New' },
      { value: 'Follow Up', label: 'Follow Up' },
      { value: 'Under Review', label: 'Under Review' },
      { value: 'Demo', label: 'Demo' },
      { value: 'Negotiation', label: 'Negotiation' },
      { value: 'Won', label: 'Won' },
      { value: 'Lost', label: 'Lost' },
    ],
    component: RHFTextField,
  },
  {
    title: 'Amount',
    componentProps: {
      name: 'amount',
      label: 'Enter Amount',
      type: 'number',
    },
    component: RHFTextField,
  },
  {
    title: 'Close Date',
    componentProps: {
      name: 'CloseDate',
      label: 'Select',
    },
    component: RHFDatePicker,
  },
  {
    title: 'Deal Owner',
    componentProps: {
      name: 'DealOwner',
      label: 'Select',
      select: true,
    },
    options: [
      { value: 'Dianne Russell', label: 'Dianne Russell' },
      { value: 'Phoenix Baker', label: 'Phoenix Baker' },
      { value: 'Lesile Alexander', label: 'Lesile Alexander' },
      { value: 'Marvin McKinney', label: 'Marvin McKinney' },
    ],
    component: RHFTextField,
  },
  {
    title: 'Priority',
    componentProps: {
      name: 'priority',
      label: 'Select',
      select: true,
    },
    options: [
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
      { value: 'High', label: 'High' },
    ],
    component: RHFTextField,
  },
  {
    title: 'Add Line Item',
    componentProps: {
      name: 'lineItem',
      label: 'Select',
      select: true,
    },
    options: [
      { value: 'Sample Product: £20', label: 'Sample Product: £20' },
      { value: 'Orcalo Product: £5/month', label: 'Orcalo Product: £5/month' },
    ],
    component: RHFTextField,
  },
  {
    title: 'Billing Frequency',
    componentProps: {
      name: 'billingFrequency',
      label: 'Select',
      select: true,
    },
    options: [
      { value: 'Monthly', label: 'Low' },
      { value: 'Quarterly', label: 'Medium' },
    ],
    component: RHFTextField,
  },
];
