import { Typography } from '@mui/material';
import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFDatePicker,
  RHFSwitch,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { Recurring } from './Reccuring';
import { AllowAttendee } from './AllowAttendee';
import { Reminder } from './Reminder';

const meetingTypeOption = [
  'In person meeting',
  'Google meet',
  'Zoom',
  'MS teams',
];
const allDayMeetingOption = ['In person meeting'];
const locationOption = [
  'Meeting hall 1',
  'Meeting hall 2',
  'Meeting hall 3',
  'Meeting hall 4',
];
const bufferTimeOption = [
  '5 Minutes',
  '10 Minutes',
  '15 Minutes',
  '20 Minutes',
  '25 Minutes',
  '30 Minutes',
];
const meetingContents = {
  inPersonMeeting: 'In person meeting',
};
export const meetingFormFields = (props: any) => {
  const { watch } = props;
  const watchAllDay = watch('allDay');
  const watchMeetingType = watch('meetingType');
  const watchBefore = watch('bufferBefore');
  const watchAfter = watch('bufferAfter');
  return [
    {
      id: 1,
      componentProps: {
        label: 'Meeting Title',
        name: 'title',
        required: true,
        placeholder: 'Title',
      },
      component: RHFTextField,
    },
    {
      id: 2,
      componentProps: {
        label: 'All Day',
        name: 'allDay',
      },
      component: RHFSwitch,
    },
    {
      id: 3,
      lg: 6,
      sm: 6,
      componentProps: {
        label: 'From',
        name: 'fromDate',
        disablePast: true,
      },
      component: RHFDatePicker,
    },
    {
      id: 4,
      lg: 6,
      sm: 6,
      componentProps: {
        label: 'Time',
        name: 'fromTime',
        disabled: watchAllDay,
      },
      component: RHFTimePicker,
    },
    {
      id: 5,
      lg: 6,
      sm: 6,
      componentProps: {
        label: 'To',
        name: 'toDate',
        disablePast: true,
      },
      component: RHFDatePicker,
    },
    {
      id: 6,
      lg: 6,
      sm: 6,
      componentProps: {
        label: 'Time',
        name: 'toTime',
        disabled: watchAllDay,
      },
      component: RHFTimePicker,
    },
    {
      id: 7,
      componentProps: props,
      component: Recurring,
    },
    {
      id: 8,
      sm: 6,
      componentProps: {
        label: 'Meeting Type',
        name: 'meetingType',
        placeholder: 'Select Type',
        required: true,
        options: watchAllDay ? allDayMeetingOption : meetingTypeOption,
      },
      component: RHFAutocomplete,
    },
    {
      id: 9,
      sm: 6,
      componentProps: {
        label: 'Location',
        name: 'location',
        placeholder: 'Select Location',
        required: true,
        options: locationOption,
        style: {
          display:
            watchMeetingType === meetingContents?.inPersonMeeting
              ? 'block'
              : 'none',
        },
      },
      component: RHFAutocomplete,
    },
    {
      id: 10,
      componentProps: props,
      component: AllowAttendee,
    },
    {
      id: 11,
      md: 1.5,
      sm: 3,
      componentProps: {
        label: <Typography variant="body1">Before</Typography>,
        name: 'bufferBefore',
        icon: <CheckboxIcon />,
        checkedIcon: <CheckboxCheckedIcon />,
      },
      component: RHFCheckbox,
    },
    {
      id: 12,
      md: 4.5,
      sm: 9,
      componentProps: {
        name: 'bufferBeforeTime',
        disabled: !watchBefore,
        options: bufferTimeOption,
        placeholder: 'Select Buffer time',
      },
      component: RHFAutocomplete,
    },
    {
      id: 13,
      md: 1.5,
      sm: 3,
      componentProps: {
        label: <Typography variant="body1">After</Typography>,
        name: 'bufferAfter',
        icon: <CheckboxIcon />,
        checkedIcon: <CheckboxCheckedIcon />,
      },
      component: RHFCheckbox,
    },
    {
      id: 14,
      md: 4.5,
      sm: 9,
      componentProps: {
        name: 'bufferAfterTime',
        disabled: !watchAfter,
        options: bufferTimeOption,
        placeholder: 'Select Buffer time',
      },
      component: RHFAutocomplete,
    },
    {
      id: 15,
      componentProps: props,
      component: Reminder,
    },
  ];
};
