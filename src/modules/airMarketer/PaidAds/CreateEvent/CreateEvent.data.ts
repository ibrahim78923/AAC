import { Typography } from '@mui/material';

import {
  RHFCheckbox,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const eventValidationSchema = Yup.object().shape({
  addNetwork: Yup.string().required('Field is Required'),
  addAccount: Yup.string().required('Field is Required'),
  eventTrigger: Yup.boolean().required('Field is Required'),
  triggerRadio: Yup.string().test(
    'conditionalValidation',
    'Field is Required',
    function (value) {
      const eventTrigger = this?.parent?.eventTrigger;
      if (eventTrigger === true) {
        return value !== undefined && value !== '';
      }
      return true;
    },
  ),
  dealAmount: Yup.number()
    .test('conditionalValidation', 'Field is Required', function (value) {
      const eventTrigger = this?.parent?.eventTrigger;
      if (eventTrigger === true) {
        return value !== undefined && value !== 0;
      }
      return true;
    })
    .typeError('Must be a number')
    .positive('Must be a positive number')
    .integer('Must be an integer'),

  customContact: Yup.string().test(
    'conditionalValidation',
    'Field is Required',
    function (value) {
      const eventTrigger = this?.parent?.eventTrigger;
      if (eventTrigger === true) {
        return value !== undefined && value !== '';
      }
      return true;
    },
  ),
  propertyValue: Yup.string().test(
    'conditionalValidation',
    'Field is Required',
    function (value) {
      const eventTrigger = this?.parent?.eventTrigger;
      if (eventTrigger === true) {
        return value !== undefined && value !== '';
      }
      return true;
    },
  ),
  eventName: Yup.string().test(
    'conditionalValidation',
    'Field is Required',
    function (value) {
      const eventTrigger = this?.parent?.eventTrigger;
      if (eventTrigger === true) {
        return value !== undefined && value !== '';
      }
      return true;
    },
  ),
});

export const eventDefaultValues = {
  addNetwork: '',
  addAccount: '',
  eventTrigger: false,
  triggerRadio: '',
  dealAmount: 0,
  customContact: '',
  propertyValue: '',
  eventName: '',
};

export const eventDataArray = [
  {
    componentProps: {
      name: 'addNetwork',
      label: 'Ad Network',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'google', label: 'Google Ads' },
      { value: 'linkedin', label: 'LinkedIn' },
    ],
    lifeCycleStage: [true, false],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'addAccount',
      label: 'Ad Account',
      fullWidth: true,
      select: true,
    },
    options: [{ value: 'google', label: 'GreekFam Solutions(739-031-0245)' }],
    lifeCycleStage: [true, false],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'eventTrigger',
      heading: 'Event Trigger',
      varient: 'h6',
      label: 'Lifecycle stage change',
      fullWidth: true,
      select: true,
    },
    lifeCycleStage: [true, false],
    component: RHFCheckbox,
    md: 12,
  },
  {
    componentProps: {
      varient: 'body2',
      heading: `Select a lifecycle stage. You may also change which stage you'd like it to map to in the ad network.`,
    },
    gridLength: 12,
    lifeCycleStage: [true],
    component: Typography,
  },
  {
    componentProps: {
      name: 'triggerRadio',
      fullWidth: true,
      defaultValue: 'all',
      row: false,
      options: [
        { value: 'subscriber', label: 'Subscriber' },
        { value: 'laed', label: 'Lead' },
        { value: 'marketingQualifiedLead', label: 'Marketing Qualified Lead' },
        { value: 'salesQualifiedLead', label: 'Sales Qualified Lead' },
        { value: 'opportunity', label: 'Opportunity' },
        { value: 'customer', label: 'Customer' },
        { value: 'evangelist', label: 'Evangelist' },
        { value: 'other', label: 'Other' },
      ],
    },
    lifeCycleStage: [true],
    component: RHFRadioGroup,
    md: 12,
  },
  {
    componentProps: {
      label: 'Value',
      varient: 'body2',
    },
    gridLength: 12,
    lifeCycleStage: [true],
    component: Typography,
  },
  {
    componentProps: {
      varient: 'h6',
      heading: `Value`,
    },
    gridLength: 12,
    lifeCycleStage: [true],
    component: Typography,
  },
  {
    componentProps: {
      varient: 'body2',
      heading: `Select a value for this lifecycle stage to send to the ad network. This helps them know what this stage is worth to you to better optimize delivering your ads to high value potential customers.`,
    },
    gridLength: 12,
    lifeCycleStage: [true],
    component: Typography,
  },
  {
    componentProps: {
      varient: 'h6',
      heading: `Use Deal Amount`,
    },
    gridLength: 12,
    lifeCycleStage: [true],
    component: Typography,
  },
  {
    componentProps: {
      name: 'dealAmount',
      placeholder: '£1',
      label: 'Set a value to be used if there is no Deal amount',
      fullWidth: true,
    },
    lifeCycleStage: [true],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'customContact',
      varient: '',
      heading: 'Custom contact property',
      fullWidth: true,
      select: true,
    },
    options: [{ value: 'deal', label: 'Deal' }],
    lifeCycleStage: [true],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'propertyValue',
      label: 'Property value that indicates consent',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'true', label: 'True' },
      { value: 'false', label: 'False' },
    ],
    lifeCycleStage: [true],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'eventName',
      placeholder: 'HubSpotMarketingQualifiedLead',
      label: 'Event Name',
      fullWidth: true,
    },
    lifeCycleStage: [true],
    component: RHFTextField,
    md: 12,
  },
];
