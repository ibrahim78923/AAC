import {
  RHFAutocomplete,
  RHFDropZone,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { FILE_MAX_SIZE } from '@/config';
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
  ONCE: 'NO',
  RECURRING: 'YES',
};

export const isRecurringOptions = [
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
    isRecurring: Yup?.string()?.required('Type is required'),
    email: Yup?.array()
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
      ?.when('isRecurring', {
        is: (value: any) => value === EMAIL_SEND_TYPE?.RECURRING,
        then: () => Yup?.mixed()?.nullable()?.required('Required'),
        otherwise: () => Yup?.mixed()?.nullable(),
      }),
    timeOfDays: Yup?.mixed()
      ?.nullable()
      ?.when('isRecurring', {
        is: (value: any) => value === EMAIL_SEND_TYPE?.RECURRING,
        then: () =>
          Yup?.mixed()?.nullable()?.required('Time of days is Required'),
        otherwise: () => Yup?.mixed()?.nullable(),
      }),
    attachments: Yup?.mixed()
      ?.nullable()
      ?.when('isRecurring', {
        is: (value: any) => value === EMAIL_SEND_TYPE?.ONCE,
        then: () =>
          Yup?.mixed()?.nullable()?.required('Attachments is Required'),
        otherwise: () => Yup?.mixed()?.nullable(),
      }),
  });

export const createEmailThisDashboardDefaultValues: any = {
  isRecurring: '',
  email: null,
  emailSubject: '',
  message: '',
  fileType: null,
  emailNickname: '',
  schedule: null,
  timeOfDays: null,
  attachments: null,
};

export const sendDashboardViaEmailFormFieldsDynamic = (
  isRecurringWatch: any,
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
        name: 'isRecurring',
        row: false,
        options: isRecurringOptions,
      },
      component: RHFRadioGroup,
      md: 12,
    },
    {
      id: 3,
      componentProps: {
        name: 'email',
        label: 'internalRecipients',
        placeholder: 'Enter Recipients and press enter',
        required: true,
        freeSolo: true,
        options: [],
        multiple: true,
        isOptionEqualToValue: () => {},
      },
      component: RHFAutocomplete,
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
    ...(isRecurringWatch === EMAIL_SEND_TYPE?.RECURRING
      ? [
          {
            id: 6,
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
            id: 7,
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
          {
            id: 8,
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
        ]
      : []),

    ...(isRecurringWatch === EMAIL_SEND_TYPE?.ONCE
      ? [
          {
            id: 9,
            componentProps: {
              name: 'attachments',
              label: 'Attach Report',
              fullWidth: true,
              required: true,
              fileName: 'Attach the report',
              fileType: `PDF and PNG only (max ${
                FILE_MAX_SIZE?.ATTACH_FILE_MAX_SIZE / (1024 * 1024)
              } MB)`,
              accept: {
                'application/pdf': ['.pdf'],
                'image/png': ['.png', '.PNG'],
              },
            },
            component: RHFDropZone,
          },
        ]
      : []),
  ];
};
