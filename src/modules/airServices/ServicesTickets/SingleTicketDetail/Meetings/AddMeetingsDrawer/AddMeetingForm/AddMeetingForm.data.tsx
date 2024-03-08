import {
  RHFAutocomplete,
  RHFButtonGroup,
  RHFDatePicker,
  RHFEditor,
  RHFMultiSelect,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { ZoomLogoImage, TeamsLogoImage } from '@/assets/images';
import { timeZone } from '@/constants/time-zone';

export const addMeetingValidationSchema: any = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  startDate: Yup?.date()?.required('Required'),
  startTime: Yup?.date()?.required('Required'),
  endDate: Yup?.date()?.required('Required'),
  endTime: Yup?.date()?.required('Required'),
  meetingNotes: Yup?.string(),
  timeZone: Yup?.mixed()?.nullable(),
  outcome: Yup?.string(),
  attendees: Yup?.string(),
  addVideoConferencing: Yup?.string(),
});

export const addMeetingDefaultValues = {
  title: '',
  meetingNotes: '',
  timeZone: null,
  outcome: '',
  attendees: [],
  startDate: new Date(),
  startTime: new Date(),
  endDate: new Date(),
  endTime: new Date(),
  addVideoConferencing: '',
};

export const addMeetingDataArray = [
  {
    componentProps: {
      name: 'title',
      label: 'Title',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'startDate',
      label: 'From',
      fullWidth: true,
      required: true,
    },
    component: RHFDatePicker,
    md: 8,
  },
  {
    componentProps: {
      name: 'startTime',
      label: '',
      fullWidth: true,
      sx: { mt: { lg: 3 } },
    },
    component: RHFTimePicker,
    md: 4,
  },
  {
    componentProps: {
      name: 'endDate',
      label: 'To',
      fullWidth: true,
      required: true,
    },
    component: RHFDatePicker,
    md: 8,
  },
  {
    componentProps: {
      name: 'endTime',
      label: '',
      fullWidth: true,
      sx: { mt: { lg: 3 } },
    },
    component: RHFTimePicker,
    md: 4,
  },
  {
    componentProps: {
      name: 'allDay',
      label: 'All day',
    },
    component: RHFSwitch,
    md: 12,
  },
  {
    componentProps: {
      name: 'timeZone',
      label: 'Time Zone',
      fullWidth: true,
      options: timeZone,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'addVideoConferencing',
      label: 'Add Video Conferencing',
    },
    buttonGroup: true,
    options: [
      { value: 'connectZoom', label: 'Connect Zoom', img: ZoomLogoImage },
      { value: 'connectTeams', label: 'Connect Teams', img: TeamsLogoImage },
    ],
    component: RHFButtonGroup,
    md: 12,
  },
  {
    componentProps: {
      name: 'attendees',
      label: 'Attendees',
      fullWidth: true,
      select: true,
      options: [
        { value: 'BE', label: 'BE' },
        { value: 'FE', label: 'FE' },
      ],
    },
    component: RHFMultiSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'outcome',
      label: 'Outcome',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'Interested', label: 'Interested' },
      { value: 'Left message', label: 'Left message' },
      { value: 'No response', label: 'No response' },
      { value: 'No interested', label: 'No interested' },
      { value: 'Not able to reach', label: 'Not able to reach' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'meetingNotes',
      label: 'Meeting Notes',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
];
