import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const agentExtValidationSchema = Yup.object().shape({
  agentExtflowName: Yup.string()?.required('Required Field'),
  playMessage: Yup.string()?.required('Required Field'),
  doThisnotAvail: Yup.string()?.required('Required Field'),
  doThisNotAnswersing: Yup.string()?.required('Required Field'),
  afterRinging: Yup.string()?.required('Required Field'),
  doThisIsBusy: Yup.string()?.required('Required Field'),
  playMessage2: Yup.string()?.required('Required Field'),
  afterNRepeats: Yup.string()?.required('Required Field'),
  doThisInvalidInput: Yup.string()?.required('Required Field'),
  doThisPresses: Yup.string()?.required('Required Field'),
});

export const agentExtDefaultValues = {
  agentExtflowName: '',
  playMessage: '',
  doThisnotAvail: '',
  doThisNotAnswersing: '',
  afterRinging: '',
  doThisIsBusy: '',
  playMessage2: '',
  afterNRepeats: '',
  doThisInvalidInput: '',
  doThisPresses: '',
};

export const agentExtArray = [
  {
    componentProps: {
      name: 'agentExtflowName',
      label: 'Agent Extension Flow Name',
      placeholder: 'Air Applecart',
      fullWidth: true,
      select: false,
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'playMessage',
      label: 'Play Message',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'welcome', label: 'welcome message' },
      { value: 'voicemail', label: 'voicemail message' },
      { value: 'hangup', label: 'hang up message' },
      { value: 'callback', label: 'call back message' },
    ],
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      heading: 'If The Agent Is Not Available',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'doThisnotAvail',
      label: 'Do This',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'welcome', label: 'welcome message' },
      { value: 'voicemail', label: 'voicemail message' },
      { value: 'hangup', label: 'hang up message' },
      { value: 'callback', label: 'call back message' },
    ],
    component: RHFSelect,
    md: 6.1,
  },
  {
    componentProps: {
      heading: 'If Agent is available but not answering',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'doThisNotAnswersing',
      label: 'Do This',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'welcome', label: 'welcome message' },
      { value: 'voicemail', label: 'voicemail message' },
      { value: 'hangup', label: 'hang up message' },
      { value: 'callback', label: 'call back message' },
    ],
    component: RHFSelect,
    md: 6.1,
  },
  {
    componentProps: {
      name: 'afterRinging',
      label: 'After Ringing For N seconds',
      placeholder: 'Air Applecart',
      fullWidth: true,
      select: false,
      required: true,
    },
    component: RHFTextField,
    md: 6.1,
  },
  {
    componentProps: {
      heading: 'If Agent Is Busy?',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'doThisIsBusy',
      label: 'Do This',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'welcome', label: 'welcome message' },
      { value: 'voicemail', label: 'voicemail message' },
      { value: 'hangup', label: 'hang up message' },
      { value: 'callback', label: 'call back message' },
    ],
    component: RHFSelect,
    md: 6.1,
  },
  {
    componentProps: {
      heading: 'If Customer Gives An Invalid Input',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'playMessage2',
      label: 'Play Message',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'welcome', label: 'welcome message' },
      { value: 'voicemail', label: 'voicemail message' },
      { value: 'hangup', label: 'hang up message' },
      { value: 'callback', label: 'call back message' },
    ],
    component: RHFSelect,
    md: 6.1,
  },
  {
    componentProps: {
      name: 'afterNRepeats',
      label: 'After N Repeats',
      placeholder: '2',
      fullWidth: true,
      select: false,
      required: true,
    },
    component: RHFTextField,
    md: 6.1,
  },
  {
    componentProps: {
      name: 'doThisInvalidInput',
      label: 'Do This',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'welcome', label: 'welcome message' },
      { value: 'voicemail', label: 'voicemail message' },
      { value: 'hangup', label: 'hang up message' },
      { value: 'callback', label: 'call back message' },
    ],
    component: RHFSelect,
    md: 6.1,
  },
  {
    componentProps: {
      heading: 'If The Customer Presses*',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'doThisPresses',
      label: 'Do This',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'welcome', label: 'welcome message' },
      { value: 'voicemail', label: 'voicemail message' },
      { value: 'hangup', label: 'hang up message' },
      { value: 'callback', label: 'call back message' },
    ],
    component: RHFSelect,
    md: 6.1,
  },
];
