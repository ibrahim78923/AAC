import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFDatePicker,
  RHFSwitch,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { Recurring } from './Recurring';
import { AllowAttendee } from './AllowAttendee';
import { Reminder } from './Reminder';
import { timeZone } from '@/constants/time-zone';

const meetingTypeOption = [
  'In person meeting',
  'Google meet',
  'Zoom',
  'MS teams',
];
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
  const watchRecurring = watch('recurring');
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
        label: 'From',
        name: 'fromDate',
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
        label: 'Time',
        name: 'fromTime',
        disabled: watchAllDay,
        required: true,
        fullWidth: true,
        size: 'small',
      },
      component: RHFTimePicker,
    },
    {
      id: 6,
      lg: 6,
      sm: 6,
      componentProps: {
        label: 'To',
        name: 'toDate',
        disablePast: true,
        required: !watchRecurring,
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
        label: 'Time',
        name: 'toTime',
        disabled: watchAllDay,
        required: !watchRecurring,
        fullWidth: true,
        size: 'small',
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
        disabled: watchAllDay,
        options: meetingTypeOption,
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
          watchMeetingType === meetingContents?.inPersonMeeting
            ? 'block'
            : 'none',
      },
      componentProps: {
        label: 'Location',
        name: 'location',
        placeholder: 'Select Location',
        required: true,
        options: locationOption,
        fullWidth: true,
        size: 'small',
      },
      component: RHFAutocomplete,
    },
    {
      id: 11,
      componentProps: props,
      component: AllowAttendee,
    },
    {
      id: 12,
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
      },
      component: RHFCheckbox,
    },
    {
      id: 13,
      md: 4.5,
      sm: 9,
      sx: {
        display: watchAllDay ? 'none' : 'block',
      },
      componentProps: {
        name: 'bufferBeforeTime',
        disabled: !watchBefore,
        options: bufferTimeOption,
        placeholder: 'Select Buffer time',
        fullWidth: true,
        size: 'small',
      },
      component: RHFAutocomplete,
    },
    {
      id: 14,
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
      },
      component: RHFCheckbox,
    },
    {
      id: 15,
      md: 4.5,
      sm: 9,
      sx: {
        display: watchAllDay ? 'none' : 'block',
      },
      componentProps: {
        name: 'bufferAfterTime',
        disabled: !watchAfter,
        options: bufferTimeOption,
        placeholder: 'Select Buffer time',
        fullWidth: true,
        size: 'small',
      },
      component: RHFAutocomplete,
    },
    {
      id: 16,
      componentProps: props,
      component: Reminder,
    },
  ];
};
