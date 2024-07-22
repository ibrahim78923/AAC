import {
  RHFAutocomplete,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { DOWNLOAD_FILE_TYPE, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const constantData = {
  condition: 'emailCondition',
  schedule: 'schedule',
  recurring: 'recurring',
  monthly: 'monthly',
  weekly: 'weekly',
};

export const EMAIL_SEND_SCHEDULE = {
  DAILY: 'DAILY',
  MONTHLY: 'MONTHLY',
  WEEKLY: 'WEEKLY',
};

export const EMAIL_SEND_TYPE = {
  ONCE: 'once',
  RECURRING: 'recurring',
};

export const emailSendTypeOptions = [
  {
    value: EMAIL_SEND_TYPE?.ONCE,
    label: 'No, this email will only be sent once',
  },
  {
    value: EMAIL_SEND_TYPE?.RECURRING,
    label: 'Yes, this is recurring email',
  },
];

export const fileTypeOptions = [
  {
    _id: DOWNLOAD_FILE_TYPE?.PDF,
    label: DOWNLOAD_FILE_TYPE?.PDF,
  },
  {
    _id: DOWNLOAD_FILE_TYPE?.PNG,
    label: DOWNLOAD_FILE_TYPE?.PNG,
  },
];

export const emailScheduleOptions = [
  {
    _id: EMAIL_SEND_SCHEDULE?.DAILY,
    label: EMAIL_SEND_SCHEDULE?.DAILY,
  },
  {
    _id: EMAIL_SEND_SCHEDULE?.WEEKLY,
    label: EMAIL_SEND_SCHEDULE?.WEEKLY,
  },
  {
    _id: EMAIL_SEND_SCHEDULE?.MONTHLY,
    label: EMAIL_SEND_SCHEDULE?.MONTHLY,
  },
];

export const createEmailThisDashboardValidationSchema: any =
  Yup?.object()?.shape({
    emailSendType: Yup?.string()?.required('Required'),
    internalRecipients: Yup?.array()
      ?.of(Yup?.string())
      ?.test('is-emails-valid', 'Enter valid email formats', function (value) {
        if (!value || value?.length === SELECTED_ARRAY_LENGTH?.ZERO) {
          return false;
        }
        return value?.every(
          (email) => Yup?.string()?.email()?.isValidSync(email),
        );
      }),
    emailSubject: Yup?.string()?.trim()?.required('Subject is required'),
    message: Yup?.string()?.trim(),
    fileType: Yup?.mixed()?.nullable(),
    schedule: Yup?.mixed()
      ?.nullable()
      ?.when('emailSendType', {
        is: (value: any) => value === EMAIL_SEND_TYPE?.RECURRING,
        then: () => Yup?.mixed()?.nullable()?.required('Required'),
        otherwise: () => Yup?.mixed()?.nullable(),
      }),
    timeOfDays: Yup?.mixed()
      ?.nullable()
      ?.when('emailSendType', {
        is: (value: any) => value === EMAIL_SEND_TYPE?.RECURRING,
        then: () => Yup?.mixed()?.nullable()?.required('Required'),
        otherwise: () => Yup?.mixed()?.nullable(),
      }),
  });

export const createEmailThisDashboardDefaultValues: any = {
  emailSendType: '',
  internalRecipients: [],
  emailSubject: '',
  message: '',
  fileType: null,
  emailNickname: '',
  schedule: null,
  timeOfDays: null,
};

export const sendDashboardViaEmailFormFieldsDynamic = (
  emailSendTypeWatch: any,
) => {
  return [
    {
      id: 1,
      componentProps: {
        color: 'slateBlue.main',
        variant: 'h5',
      },
      md: 12,
      heading: 'Is this a recurring email ?',
      component: Typography,
    },
    {
      id: 2,
      componentProps: {
        name: 'emailSendType',
        fullWidth: true,
        row: false,
        options: emailSendTypeOptions,
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
        freeSolo: true,
        options: [],
        multiple: true,
        isOptionEqualToValue: () => {},
      },
      component: RHFAutocomplete,
      md: 12,
    },
    {
      id: 4,
      componentProps: {
        name: 'emailSubject',
        label: 'Email subject',
        fullWidth: true,
        required: true,
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
        rows: 4,
        placeholder: 'Type the message here',
      },
      component: RHFTextField,
      md: 12,
    },
    ...(emailSendTypeWatch === EMAIL_SEND_TYPE?.RECURRING
      ? [
          {
            id: 42,
            componentProps: {
              name: 'schedule',
              label: 'Schedule',
              fullWidth: true,
              required: true,
              placeholder: 'Select the option',
              options: emailScheduleOptions,
              getOptionLabel: (option: any) => option?.label,
            },
            component: RHFAutocomplete,
            md: 12,
          },
          {
            id: 43,
            componentProps: {
              name: 'timeOfDays',
              label: 'Time of days',
              fullWidth: true,
              required: true,
              placeholder: 'Select the option',
            },
            component: RHFTextField,
            md: 12,
          },
        ]
      : []),
    {
      id: 6,
      componentProps: {
        name: 'filetype',
        label: 'File type',
        placeholder: 'Select',
        fullWidth: true,
        options: fileTypeOptions,
        getOptionLabel: (option: any) => option?.label,
      },
      component: RHFAutocomplete,
      md: 12,
    },
  ];
};
