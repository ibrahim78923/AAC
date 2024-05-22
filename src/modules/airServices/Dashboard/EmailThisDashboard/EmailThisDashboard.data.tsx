import {
  RHFAutocomplete,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const createEmailThisDashboardValidationSchema: any =
  Yup?.object()?.shape({
    emailCondition: Yup?.string()?.required('Required'),
    internalRecipients: Yup?.string()?.trim(),
    emailSubject: Yup?.string(),
    message: Yup?.string(),
    fileType: Yup?.string(),
    schedule: Yup?.string(),
    time: Yup?.string(),
    scheduleDate: Yup?.string(),
    scheduleDay: Yup?.string(),
  });

export const createEmailThisDashboardDefaultValues: any = {
  emailCondition: '',
  internalRecipients: '',
  emailSubject: '',
  message: '',
  fileType: '',
  schedule: '',
  time: new Date(),
  scheduleDate: '',
  scheduleDay: '',
};

const filetype = ['PDF', 'PNG', 'JPEG'];
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
      name: 'emailCondition',
      fullWidth: true,
      row: false,
      options: [
        {
          value: 'once',
          label: ' No, this email will only be sent once',
        },
        {
          value: 'recurring',
          label: 'Yes, this is recurring email',
        },
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'internalRecipients',
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
      name: 'emailSubject',
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
      label: 'File Type',
      placeholder: 'Select',
      fullWidth: true,
      options: filetype,
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
