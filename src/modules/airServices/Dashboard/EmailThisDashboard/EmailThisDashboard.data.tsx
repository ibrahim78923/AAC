import {
  RHFAutocomplete,
  RHFDropZone,
  RHFRadioGroup,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { FILE_MAX_SIZE } from '@/config';
import {
  DOWNLOAD_FILE_TYPE,
  FULL_NAME_OF_WEEK,
  NUMBER_OF_DAYS,
} from '@/constants/strings';
import { Typography } from '@mui/material';
import * as Yup from 'yup';
import { DashboardOwnersFieldDropdown } from '../DashboardFormFields/DashboardOwnersFieldDropdown';

export const EMAIL_SEND_SCHEDULE = {
  DAILY: 'DAILY',
  MONTHLY: 'MONTHLY',
  WEEKLY: 'WEEKLY',
};

export const EMAIL_SEND_TYPE = {
  ONCE: 'NO',
  RECURRING: 'YES',
};

const { DAILY, MONTHLY, WEEKLY } = EMAIL_SEND_SCHEDULE;

//TODO: recurring email condition will be handled in future

export const isRecurringOptions = [
  {
    value: EMAIL_SEND_TYPE?.ONCE,
    label: 'No, this email will only be sent once',
  },
  {
    value: EMAIL_SEND_TYPE?.RECURRING,
    label: 'Yes, this is recurring email',
    disabled: true,
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
    _id: DAILY,
    label: DAILY,
  },
  {
    _id: WEEKLY,
    label: WEEKLY,
  },
  {
    _id: MONTHLY,
    label: MONTHLY,
  },
];

export const weeklyOptions = FULL_NAME_OF_WEEK;
export const monthlyOptions = NUMBER_OF_DAYS;

export const createEmailThisDashboardValidationSchema: any =
  Yup?.object()?.shape({
    isRecurring: Yup?.string()?.required('Type is required'),
    email: Yup?.array()?.min(1, 'Recipient is required'),
    emailSubject: Yup?.string()?.trim()?.required('Subject is required'),
    emailName: Yup?.string()?.trim()?.email('Enter valid emails'),
    message: Yup?.string()?.trim(),
    fileType: Yup?.mixed()?.nullable(),
    schedule: Yup?.mixed()
      ?.nullable()
      ?.when('isRecurring', {
        is: (value: any) => value === EMAIL_SEND_TYPE?.RECURRING,
        then: () => Yup?.mixed()?.nullable()?.required('Schedule is required'),
        otherwise: () => Yup?.mixed()?.nullable(),
      }),
    timeOfDays: Yup?.mixed()
      ?.nullable()
      ?.when('isRecurring', {
        is: (value: any) => value === EMAIL_SEND_TYPE?.RECURRING,
        then: () =>
          Yup?.mixed()?.nullable()?.required('Time of days is required'),
        otherwise: () => Yup?.mixed()?.nullable(),
      }),
    weekly: Yup?.mixed()
      ?.nullable()
      ?.when('schedule', {
        is: (value: any) => value?._id === WEEKLY,
        then: () => Yup?.mixed()?.nullable()?.required('Week day is required'),
        otherwise: () => Yup?.mixed()?.nullable(),
      }),
    monthly: Yup?.mixed()
      ?.nullable()
      ?.when('schedule', {
        is: (value: any) => value?._id === MONTHLY,
        then: () => Yup?.mixed()?.nullable()?.required('Month day is required'),
        otherwise: () => Yup?.mixed()?.nullable(),
      }),
    attachments: Yup?.mixed()
      ?.nullable()
      ?.when('isRecurring', {
        is: (value: any) => value === EMAIL_SEND_TYPE?.ONCE,
        then: () =>
          Yup?.mixed()?.nullable()?.required('Attachment is required'),
        otherwise: () => Yup?.mixed()?.nullable(),
      }),
  });

export const createEmailThisDashboardDefaultValues: any = {
  isRecurring: EMAIL_SEND_TYPE?.ONCE,
  email: [],
  emailSubject: '',
  message: '',
  fileType: null,
  emailName: '',
  schedule: null,
  timeOfDays: null,
  attachments: null,
};

export const sendDashboardViaEmailFormFieldsDynamic = (
  isRecurringWatch: any,
  watchScheduleOption: any,
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
    ...(isRecurringWatch === EMAIL_SEND_TYPE?.ONCE
      ? [
          {
            id: 3,
            componentProps: {
              name: 'email',
              label: 'Internal recipients',
              placeholder: 'Enter recipients and press enter',
              required: true,
              multiple: true,
            },
            component: DashboardOwnersFieldDropdown,
          },
        ]
      : [
          {
            id: 3.4,
            componentProps: {
              name: 'emailName',
              label: 'Email Name',
              fullWidth: true,
              required: true,
              placeholder: 'Write an email',
            },
            component: RHFTextField,
            md: 12,
          },
        ]),
    {
      id: 4,
      componentProps: {
        name: 'emailSubject',
        label: 'Email subject',
        fullWidth: true,
        required: true,
        placeholder: 'Write email subject',
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
              placeholder: 'Select the time',
            },
            component: RHFTimePicker,
            md: 12,
          },
          ...(watchScheduleOption?._id === MONTHLY
            ? [
                {
                  id: 7.6,
                  componentProps: {
                    name: 'montly',
                    label: 'Monthly',
                    fullWidth: true,
                    required: true,
                    placeholder: 'Select the option',
                    options: monthlyOptions,
                    isOptionEqualToValue: (option: any, newValue: any) =>
                      option === newValue,
                  },
                  component: RHFAutocomplete,
                  md: 12,
                },
              ]
            : []),
          ...(watchScheduleOption?._id === WEEKLY
            ? [
                {
                  id: 7.62,
                  componentProps: {
                    name: 'weekly',
                    label: 'Weekly',
                    fullWidth: true,
                    required: true,
                    placeholder: 'Select the option',
                    options: weeklyOptions,
                    isOptionEqualToValue: (option: any, newValue: any) =>
                      option === newValue,
                  },
                  component: RHFAutocomplete,
                  md: 12,
                },
              ]
            : []),
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
              label: 'Attach dashboard',
              fullWidth: true,
              required: true,
              fileName: 'Attach the dashboard',
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
