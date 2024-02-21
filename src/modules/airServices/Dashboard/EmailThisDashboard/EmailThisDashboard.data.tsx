import {
  RHFAutocomplete,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const createEmailThisDashboardValidationSchema: any =
  Yup?.object()?.shape({
    title: Yup?.string()?.required('Required'),
    description: Yup?.string()?.trim(),
    scheduleMeeting: Yup?.string(),
    startDate: Yup?.date(),
    endDate: Yup?.date(),
    managedBy: Yup?.string()?.required('Required'),
    visibility: Yup?.string(),
    notifyMember: Yup?.string(),
    emailRecipients: Yup?.string(),
    addMember: Yup?.string(),
  });

export const createEmailThisDashboardDefaultValues: any = {
  title: '',
  description: '',
  scheduleMeeting: '',
  startDate: new Date(),
  endDate: new Date(),
  managedBy: '',
  visibility: '',
  notifyMember: '',
  emailRecipients: '',
  addMember: '',
};

const filetype = ['Select', 'All agent', 'Everyone'];
export const createEmailThisDashboardDataArray = [
  {
    id: 1,
    componentProps: {
      value: 'Is this a recurring email ?',
    },
    gridLength: 12,
    component: Typography,
  },

  {
    id: 2,
    componentProps: {
      name: 'recurringEmail',
      fullWidth: true,
      row: false,
      options: [
        {
          value: ' No, this email will only be sent once',
          label: ' No, this email will only be sent once',
        },
        {
          value: 'Yes, this is recurring email',
          label: ' Yes, this is recurring email',
        },
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'recipient email',
      label: 'Internal recipients',
      fullWidth: true,
      required: true,
      placeholder: 'Add internal recipient email',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: 'email subject',
      label: 'Email subject',
      fullWidth: true,
      placeholder: 'Email Subject',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'message',
      label: 'Message',
      fullWidth: true,
      multiline: true,
      rows: 3,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 6,
    componentProps: {
      name: 'filetype',
      label: 'Team Members',
      placeholder: 'Select',
      fullWidth: true,
      options: filetype,
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
