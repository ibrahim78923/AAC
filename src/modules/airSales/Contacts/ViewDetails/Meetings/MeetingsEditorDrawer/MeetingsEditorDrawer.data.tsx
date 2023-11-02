import {
  RHFDatePicker,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const dealsCallsValidationSchema = Yup.object().shape({
  title: Yup.string().trim().required('Field is Required'),
  description: Yup.string().trim().required('Field is Required'),
  attachfile: Yup.string().trim().required('Field is Required'),
});

export const ContactCallsDefaultValues = {
  title: '',
  description: '',
  attachfile: '',
};

export const ContactCallsDataArray = [
  {
    componentProps: {
      name: 'title',
      label: 'Title',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'startdate',
      label: 'Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'starttime',
      label: 'Start Time',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'enddate',
      label: '  End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'endtime',
      label: 'End Time',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
];

export const drawerTitle: any = {
  Add: 'Add Meeting',
  Edit: 'Edit Meeting',
  View: 'View Meeting',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
