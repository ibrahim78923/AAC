import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const dealsCallsValidationSchema = Yup.object().shape({
  title: Yup.string().trim().required('Field is Required'),
  startdate: Yup.string(),
  starttime: Yup.string(),
  enddate: Yup.string(),
  endtime: Yup.string(),
  owner: Yup.string(),
});

export const dealsCallsDefaultValues = {
  title: '',
  startdate: '',
  starttime: '',
  enddate: '',
  endtime: '',
  owner: '',
};

export const dealsCallsDataArray = [
  {
    componentProps: {
      name: 'title',
      label: 'Title',
      fullWidth: true,
      required: true,
      placeholder: 'Enter the title of meeting',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'callFromDate',
      label: 'Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'callFromTime',
      label: 'Start Time',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'callToDate',
      label: '  End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'callToTime',
      label: 'End Time',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'owner',
      label: 'Owner',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'Guy Hawkins', label: 'Guy Hawkins' },
      { value: 'Jacob Jones', label: 'Jacob Jones' },
      { value: 'Courtney Henry', label: 'Courtney Henry' },
    ],

    component: RHFSelect,

    md: 12,
  },
];
export const options = [
  { value: 'Interested', label: 'Interested' },
  { value: 'Left message', label: 'Left message' },
  { value: 'No response', label: 'No response' },
  { value: 'Not interested', label: 'Not interested' },
  { value: 'Not able to reach', label: 'Not able to reach' },
];

export const drawerTitle: any = {
  Add: 'Add Calls',
  Edit: 'Edit Calls',
  View: 'View Calls',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
