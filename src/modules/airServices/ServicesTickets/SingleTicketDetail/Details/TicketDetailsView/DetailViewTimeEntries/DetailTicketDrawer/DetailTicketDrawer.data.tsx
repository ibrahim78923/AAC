import { SearchSharedIcon } from '@/assets/icons';
import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { InputAdornment } from '@mui/material';
import * as Yup from 'yup';
export const validationSchema = Yup.object().shape({
  task: Yup.string().required('Field is Required'),
  agent: Yup.string().required('Field is Required'),
  hours: Yup.date(),
  status: Yup.string(),
  on: Yup.date(),
  note: Yup.string(),
});

export const defaultValues = {
  task: '',
  agent: '',
  hours: new Date(),
  status: '',
  on: new Date(),
  note: '',
};
export const detailDrawerArray = [
  {
    componentProps: {
      name: 'task',
      label: 'Task',
      fullWidth: true,
      select: false,

      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <SearchSharedIcon />
          </InputAdornment>
        ),
      },
    },

    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'agent',
      label: 'Agent',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      {
        value: 'Jhon dyson',
        label: 'Jhon dyson',
      },
      {
        value: 'AndrewSchulz',
        label: 'Andrew Schulz',
      },
      {
        value: 'Ryan Miller',
        label: 'Ryan Miller',
      },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'hours',
      label: 'Hours',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'hr:mm',
        label: 'hr:mm',
      },
      {
        value: 'Pending',
        label: 'Pending',
      },
      {
        value: 'Resolved',
        label: 'Resolved',
      },
      {
        value: 'Closed',
        label: 'Closed',
      },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'Open',
        label: 'Open',
      },
      {
        value: 'Pending',
        label: 'Pending',
      },
      {
        value: 'Resolved',
        label: 'Resolved',
      },
      {
        value: 'Closed',
        label: 'Closed',
      },
    ],
    component: RHFSelect,
    md: 12,
  },

  {
    componentProps: {
      name: 'on',
      label: 'On',
      fullWidth: true,
      select: true,
      required: true,
    },

    component: RHFDatePicker,
    md: 12,
  },

  {
    componentProps: {
      name: 'note',
      label: 'Note',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
  ,
];
