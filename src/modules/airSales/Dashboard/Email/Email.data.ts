import { Typography } from '@mui/material';

import {
  RHFTextField,
  RHFRadioGroup,
  RHFAutocomplete,
  RHFDropZone,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

import { DOWNLOAD_FILE_TYPE, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { FILE_MAX_SIZE } from '@/config';
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
  isRecurring: EMAIL_SEND_TYPE?.ONCE,
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
      id: 3,
      componentProps: {
        name: 'email',
        label: 'Internal recipients',
        placeholder: 'Enter recipients and press enter',
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
  ];
};

// export const validationSchema = Yup?.object()?.shape({
//   recurringEmail: Yup?.string()?.trim()?.required('Field is Required'),
//   internalRecipients: Yup?.string()?.trim()?.required('Field is Required'),
//   emailSubject: Yup?.string()?.trim()?.required('Field is Required'),
//   message: Yup?.string()?.trim()?.required('Field is Required'),
//   reportsInExport: Yup?.string()?.trim()?.required('Field is Required'),
//   downloadableFile: Yup?.string()?.trim()?.required('Field is Required'),
// });

// export const defaultValues = {
//   recurringEmail: '',
//   internalRecipients: '',
//   emailSubject: '',
//   message: '',
//   reportsInExport: '',
//   downloadableFile: '',
// };

// export const dataArray = [
//   {
//     componentProps: {
//       color: '#7a7a7b',
//       varient: 'h4',
//       heading: 'Is this a recurring email ?',
//     },
//     gridLength: 12,

//     component: Typography,
//   },

//   {
//     componentProps: {
//       name: 'recurringEmail',
//       fullWidth: true,
//       row: false,
//       options: [
//         {
//           label: 'No, this email will only be sent once',
//           value: 'No, this email will only be sent once',
//         },
//         {
//           label: 'Yes, this is recurring email',
//           value: 'Yes, this is recurring email',
//         },
//       ],
//     },
//     component: RHFRadioGroup,
//     md: 12,
//   },
//   {
//     componentProps: {
//       name: 'internalRecipients',
//       label: 'Internal Recipients',
//       placeholder: 'Enter recipients and press enter',
//       required: true,
//       freeSolo: true,
//       options: [],
//       multiple: true,
//       isOptionEqualToValue: () => { },
//     },
//     component: RHFAutocomplete,
//   },
//   {
//     componentProps: {
//       name: 'emailSubject',
//       label: 'Email subject',
//       fullWidth: true,
//       required: true,
//       placeholder: 'Enter subject',
//     },
//     component: RHFTextField,
//     md: 12,
//   },
//   {
//     md: 12,
//     component: RHFTextField,
//     componentProps: {
//       name: 'message',
//       fullWidth: true,
//       placeholder: 'Enter Message',
//       label: 'Message',
//       multiline: true,
//       rows: 3,
//     },
//   },
//   {
//     componentProps: {
//       name: 'downloadableFile',
//       label: 'Attach downloadable file',
//       fullWidth: true,
//       required: true,
//       placeholder: 'Select file type',
//       options: ['Pdf', 'Excel', 'XLS'],
//     },
//     component: RHFAutocomplete,
//     md: 12,
//   },
//   {
//     componentProps: {
//       color: '#7a7a7b',
//       varient: 'h4',
//       heading: 'Reports in export',
//     },
//     gridLength: 12,

//     component: Typography,
//   },
//   {
//     componentProps: {
//       name: 'reportsInExport',
//       label: '',
//       fullWidth: true,
//       row: false,
//       options: [
//         { value: 'Include all reports', label: 'Include all reports' },
//         {
//           value: 'Include selected reports',
//           label: 'Include selected reports',
//         },
//       ],
//     },
//     component: RHFRadioGroup,
//     md: 12,
//   },
// ];

// export const dataArraySelectedReports = [
//   {
//     componentProps: {
//       name: 'closedAndCreatedDeals',
//       label: 'Deals created vs Closed Deals',
//       sx: { mb: 4 },
//     },
//     component: RHFCheckbox,
//     md: 12,
//   },
//   {
//     componentProps: {
//       name: 'mettingDetails',
//       label: 'Meeting Details',
//       sx: { mb: 4 },
//     },
//     component: RHFCheckbox,
//     md: 12,
//   },
//   {
//     componentProps: {
//       name: 'teamActivities',
//       label: 'Team activities by activity date',
//       sx: { mb: 4 },
//     },
//     component: RHFCheckbox,
//     md: 12,
//   },
//   {
//     componentProps: {
//       name: 'totalDeals',
//       label:
//         'Total Deals, Open Deals, Team Goals, Cloded Won, Published Quotes',
//       fullWidth: true,
//     },
//     component: RHFCheckbox,
//     md: 12,
//   },
//   {
//     componentProps: {
//       name: 'dealReports',
//       label: 'Deal reports',
//       fullWidth: true,
//     },
//     component: RHFCheckbox,
//     md: 12,
//   },
// ];
