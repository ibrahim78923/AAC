import {
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

export const addMeetingValidationSchema = Yup.object().shape({
  title: Yup.string().required('Field is Required'),
  startDate: Yup.date().required('Field is Required'),
  startTime: Yup.date().required('Field is Required'),
  endDate: Yup.date().required('Field is Required'),
  endTime: Yup.date().required('Field is Required'),
  meetingNotes: Yup.string(),
  timeZone: Yup.string(),
  outcome: Yup.string(),
  attendees: Yup.string(),
  addVideoConferencing: Yup.string(),
});

export const addMeetingDefaultValues = {
  title: '', //01
  meetingNotes: '', //3
  timeZone: '', //5
  outcome: '', //6
  attendees: [], //7
  startDate: new Date(), //11
  startTime: new Date(), //12
  endDate: new Date(), //13
  endTime: new Date(), //14
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
      select: true,
    },
    options: [],
    component: RHFSelect,
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
