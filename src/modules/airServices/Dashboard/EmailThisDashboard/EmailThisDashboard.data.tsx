import {
  RHFAutocomplete,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const constantData = {
  condition: 'emailCondition',
  schedule: 'schedule',
  recurring: 'recurring',
  monthly: 'monthly',
  weekly: 'weekly',
};

export const conditionOptions = [
  {
    value: 'once',
    label: ' No, this email will only be sent once',
  },
  {
    value: 'recurring',
    label: 'Yes, this is recurring email',
  },
];

export const createEmailThisDashboardValidationSchema: any =
  Yup?.object()?.shape({
    emailCondition: Yup?.string()?.required('Required'),
    internalRecipients: Yup?.string()?.trim()?.required('Required'),
    emailSubject: Yup?.string(),
    message: Yup?.string(),
    fileType: Yup?.string(),
    schedule: Yup?.string(),
    time: Yup?.string()?.when(constantData?.condition, {
      is: (emailCondition: string) =>
        emailCondition === constantData?.recurring,
      then: (schema: any) => schema?.required('Required'),
      otherwise: (schema: any) => schema?.notRequired(),
    }),
    scheduleDate: Yup?.string()?.when(
      constantData?.condition || constantData?.schedule,
      {
        is: (emailCondition: string, schedule: string) =>
          emailCondition === constantData?.recurring &&
          schedule === constantData?.monthly,
        then: (schema: any) => schema?.required('Required'),
        otherwise: (schema: any) => schema?.notRequired(),
      },
    ),
    scheduleDay: Yup?.string()?.when(
      constantData?.condition || constantData?.schedule,
      {
        is: (emailCondition: string, schedule: string) =>
          emailCondition === constantData?.recurring &&
          schedule === constantData?.weekly,
        then: (schema: any) => schema?.required('Required'),
        otherwise: (schema: any) => schema?.notRequired(),
      },
    ),
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
      options: conditionOptions,
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
