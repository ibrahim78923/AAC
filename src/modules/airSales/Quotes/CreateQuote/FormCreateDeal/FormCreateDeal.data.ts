import {
  RHFDatePicker,
  RHFTextField,
  RHFSelect,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  dealName: Yup.string().required('Field is Required'),
  dealPipeline: Yup.string().required('Field is Required'),
  dealStage: Yup.string().required('Field is Required'),
});

export const initValues = {
  dealName: '',
  dealPipeline: '',
  dealStage: '',
  amount: '',
  closeDate: new Date(),
  dealOwner: '',
  priority: '',
  lineItem: '',
};

export const createDealData = [
  {
    component: RHFTextField,
    componentProps: {
      name: 'dealName',
      label: 'Deal Name',
    },
  },
  {
    component: RHFSelect,
    componentProps: {
      name: 'dealPipeline',
      label: 'Deal Pipeline',
      select: true,
    },
    options: [
      { value: 'Registering Pipeline', label: 'Registering Pipeline' },
      { value: 'Sales Pipeline', label: 'Sales Pipeline' },
      { value: 'Recruitment Pipeline', label: 'Recruitment Pipeline' },
      { value: 'Test Pipeline', label: 'Test Pipeline' },
    ],
  },
  {
    component: RHFSelect,
    componentProps: {
      name: 'dealStage',
      label: 'Deal Stage',
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
  },
  {
    component: RHFTextField,
    componentProps: {
      name: 'amount',
      label: 'Amount',
      type: 'number',
    },
  },
  {
    component: RHFDatePicker,
    componentProps: {
      name: 'closeDate',
      label: 'Close Date',
      fullWidth: true,
    },
  },
  {
    component: RHFSelect,
    componentProps: {
      name: 'dealOwner',
      label: 'Deal Owner',
      select: true,
    },
    options: [
      { value: 'Dianne Russell', label: 'Dianne Russell' },
      { value: 'Phoenix Baker', label: 'Phoenix Baker' },
      { value: 'Lesile Alexander', label: 'Lesile Alexander' },
      { value: 'Marvin McKinney', label: 'Marvin McKinney' },
    ],
  },
  {
    component: RHFSelect,
    componentProps: {
      name: 'priority',
      label: 'Priority',
      select: true,
    },
    options: [
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
      { value: 'High', label: 'High' },
    ],
  },
  {
    component: RHFSelect,
    componentProps: {
      name: 'lineItem',
      label: 'Add Line Item',
      select: true,
    },
    options: [
      { value: 'Sample Product: £20', label: 'Sample Product: £20' },
      { value: 'Orcalo Product: £5/month', label: 'Orcalo Product: £5/month' },
    ],
  },
];
