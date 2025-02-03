import { Typography } from '@mui/material';
import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFDatePicker,
  RHFSwitch,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { timeZone } from '@/constants/time-zone';
import CustomLabel from '@/components/CustomLabel';
import { Recurring } from './Recurring';
import { Reminder } from './Reminder';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AllowAttendee } from './AllowAttendee';
import { SOCIAL_COMPONENTS } from '@/constants/routes';
import { disableTime, disableTimeCheckingStartTime } from '@/lib/date-time';

export const meetingTypeOption = [
  { value: 'IN_PERSON_MEETING', label: 'In person meeting' },
  { value: 'GOOGLE_MEET', label: 'Google meet' },
  { value: 'ZOOM', label: 'Zoom' },
  { value: 'MS_TEAMS', label: 'MS teams' },
];
export const bufferTimeOption = [
  { value: 5, label: '5 Minutes' },
  { value: 10, label: '10 Minutes' },
  { value: 15, label: '15 Minutes' },
  { value: 20, label: '20 Minutes' },
  { value: 25, label: '25 Minutes' },
  { value: 30, label: '30 Minutes' },
];
const meetingContents = {
  inPersonMeeting: 'In person meeting',
  group: 'Group',
};
export const meetingFormFields = (props: any) => {
  const {
    watch,
    meetingLocationApi,
    router,
    beforeChecked,
    afterChecked,
    handleBeforeChange,
    handleAfterChange,
    meetingId,
    meetingData,
    meetingType,
  } = props;
  const watchAllDay = watch('allDay');
  const watchRecurring = watch('recurring');
  const watchMeetingType = watch('meetingType');
  const watchFrom = watch('startDate');
  const watchTo = watch('endDate');
  const startHour = watch('startTime');
  const watchAllowAttendee = watch('allowAttendee');
  const OTHER_SETTINGS = 'Other Settings';

  return [
    {
      id: 1,
      componentProps: {
        label: 'Meeting Title',
        name: 'title',
        required: true,
        placeholder: 'Title',
        fullWidth: true,
        size: 'small',
      },
      component: RHFTextField,
    },
    {
      id: 2,
      componentProps: {
        label: 'All Day',
        name: 'allDay',
        disabled: !!meetingData || !!watchRecurring,
      },
      component: RHFSwitch,
    },
    {
      id: 3,
      componentProps: {
        label: 'Time Zone',
        name: 'timeZone',
        required: true,
        placeholder: 'Select Time Zone',
        options: timeZone,
        getOptionLabel: (option: any) => option?.label,
        fullWidth: true,
        size: 'small',
      },
      component: RHFAutocomplete,
    },
    {
      id: 4,
      lg: 6,
      sm: 6,
      componentProps: {
        label: 'Start Date',
        name: 'startDate',
        disablePast: true,
        required: true,
        fullWidth: true,
        size: 'small',
      },
      component: RHFDatePicker,
    },
    {
      id: 5,
      lg: 6,
      sm: 6,
      componentProps: {
        label: 'Start Time',
        name: 'startTime',
        disabled: !!watchAllDay || !!watchAllowAttendee,
        required: !!!watchAllDay && !!!watchAllowAttendee,
        fullWidth: true,
        size: 'small',
        shouldDisableTime: (time: any) => disableTime(time, watchFrom, watchTo),
      },
      component: RHFTimePicker,
    },
    {
      id: 6,
      lg: 6,
      sm: 6,
      componentProps: {
        label: 'End Date',
        name: 'endDate',
        minDate: watchFrom,
        disablePast: true,
        required: true,
        fullWidth: true,
        size: 'small',
      },
      component: RHFDatePicker,
    },
    {
      id: 7,
      lg: 6,
      sm: 6,
      componentProps: {
        label: 'End Time',
        name: 'endTime',
        disabled: !!watchAllDay || !!watchAllowAttendee,
        required: !!!watchAllDay && !!!watchAllowAttendee,
        fullWidth: true,
        size: 'small',
        shouldDisableTime: (timeValue: any) =>
          disableTimeCheckingStartTime(
            timeValue,
            watchFrom,
            watchTo,
            startHour,
          ),
      },
      component: RHFTimePicker,
    },
    {
      id: 8,
      componentProps: props,
      component: Recurring,
    },
    {
      id: 9,
      sm: 6,
      componentProps: {
        label: 'Meeting Type',
        name: 'meetingType',
        placeholder: 'Select Type',
        required: true,
        disabled: !!watchAllDay || !!meetingId,
        options: meetingTypeOption,
        getOptionLabel: (item: any) => item?.label,
        fullWidth: true,
        size: 'small',
      },
      component: RHFAutocomplete,
    },
    {
      id: 10,
      sm: 6,
      sx: {
        display:
          watchMeetingType?.label === meetingContents?.inPersonMeeting
            ? 'block'
            : 'none',
      },
      componentProps: {
        label: 'Location',
        name: 'location',
        placeholder: 'Select Location',
        required: true,
        apiQuery: meetingLocationApi,
        externalParams: { limit: 50 },
        getOptionLabel: (option: any) => `${option?.locationName}`,
        fullWidth: true,
        size: 'small',
        EndIcon: AddCircleIcon,
        endIconClick: () => {
          router?.push({
            pathname: SOCIAL_COMPONENTS?.MEETINGS_SETTINGS,
            query: { module: OTHER_SETTINGS },
          });
        },
      },
      component: RHFAutocompleteAsync,
    },
    ...(watchMeetingType?.label !== meetingContents?.inPersonMeeting
      ? [
          {
            id: 11,
            sx: {
              display:
                (meetingType === meetingContents?.group ||
                  meetingId ||
                  !!watchRecurring) &&
                'none',
            },
            componentProps: props,
            component: AllowAttendee,
          },
        ]
      : []),
    {
      id: 12,
      sx: {
        display: watchAllDay ? 'none' : 'block',
        mt: -1,
      },
      componentProps: {
        label: (
          <Typography component={'span'} variant="h6" mb={-2}>
            Buffer Time
          </Typography>
        ),
      },
      component: CustomLabel,
    },
    {
      id: 13,
      md: 1.5,
      sm: 3,
      sx: {
        display: watchAllDay ? 'none' : 'block',
      },
      componentProps: {
        label: 'Before',
        name: 'bufferBefore',
        icon: <CheckboxIcon />,
        checkedIcon: <CheckboxCheckedIcon />,
        checked: beforeChecked,
        onChange: handleBeforeChange,
      },
      component: RHFCheckbox,
    },
    {
      id: 14,
      md: 4.5,
      sm: 9,
      sx: {
        display: watchAllDay ? 'none' : 'block',
      },
      componentProps: {
        name: 'bufferBeforeTime',
        disabled: !beforeChecked,
        options: bufferTimeOption,
        placeholder: 'Select Buffer time',
        fullWidth: true,
        size: 'small',
        getOptionLabel: (option: any) => `${option?.label}`,
      },
      component: RHFAutocomplete,
    },
    {
      id: 15,
      md: 1.5,
      sm: 3,
      sx: {
        display: watchAllDay ? 'none' : 'block',
      },
      componentProps: {
        label: 'After',
        name: 'bufferAfter',
        icon: <CheckboxIcon />,
        checkedIcon: <CheckboxCheckedIcon />,
        checked: afterChecked,
        onChange: handleAfterChange,
      },
      component: RHFCheckbox,
    },
    {
      id: 16,
      md: 4.5,
      sm: 9,
      sx: {
        display: watchAllDay ? 'none' : 'block',
      },
      componentProps: {
        name: 'bufferAfterTime',
        disabled: !afterChecked,
        options: bufferTimeOption,
        placeholder: 'Select Buffer time',
        fullWidth: true,
        size: 'small',
        getOptionLabel: (option: any) => `${option?.label}`,
      },
      component: RHFAutocomplete,
    },
    {
      id: 17,
      componentProps: props,
      component: Reminder,
    },
  ];
};
