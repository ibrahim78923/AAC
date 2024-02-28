import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const callQueueValidationSchema = Yup.object().shape({
  queueName: Yup.string()?.required('Required Field'),
  playMessage: Yup.string()?.required('Required Field'),
  caller: Yup.string()?.required('Required Field'),
  routeCallsby: Yup.string()?.required('Required Field'),
  ringingSecpa: Yup.string()?.required('Required Field'),
  doThisWhenNotanswer: Yup.string()?.required('Required Field'),
  doThisWhenbusy: Yup.string()?.required('Required Field'),
  doThisWhenOffline: Yup.string()?.required('Required Field'),
});

export const callQueueDefaultValues = {
  queueName: '',
  playMessage: '',
  caller: '',
  routeCallsby: '',
  ringingSecpa: '',
  doThisWhenNotanswer: '',
  doThisWhenbusy: '',
  doThisWhenOffline: '',
};

export const callQueueArray = [
  {
    componentProps: {
      name: 'queueName',
      label: 'Call Queue Name',
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
      name: 'caller',
      label: 'Caller Will Be Attended By',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'all', label: 'All Agents' },
      { value: 'sales', label: 'Sales' },
      { value: 'john', label: 'John Jams' },
    ],
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'routeCallsby',
      label: 'Route Calls By',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'all', label: 'All Agents' },
      { value: 'sales', label: 'Sales' },
      { value: 'john', label: 'John Jams' },
    ],
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'ringingSecpa',
      label: 'Ringing Seconds Per Agent',
      placeholder: '30s',
      fullWidth: true,
      select: false,
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      heading: 'If Agent(s) is/are online but not answering Not Available',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'doThisWhenNotanswer',
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
      heading: 'If agent are online but busy',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'doThisWhenbusy',
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
      heading: 'If agent is Offline',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'doThisWhenOffline',
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
      type: 'button',
    },
    gridLength: 12,
    component: Typography,
  },
];
