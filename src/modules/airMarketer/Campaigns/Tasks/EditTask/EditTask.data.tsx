import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography, useTheme } from '@mui/material';

import * as Yup from 'yup';
import { useLazyGetAllCampaignsListQuery } from '@/services/common-APIs';

export const validationSchema = Yup?.object().shape({
  taskName: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  taskName: '',
  taskType: '',
  selectCompaign: '',
  assignedTo: '',
  dueDate: null,
  dueTime: null,
};

export const dataArray = () => {
  const theme = useTheme();
  const campaignsList = useLazyGetAllCampaignsListQuery();
  return [
    {
      componentProps: {
        name: 'taskName',
        label: 'Task Name',
        placeholder: 'Enter Name',
        required: true,
        fullWidth: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        placeholder: 'Select type',
        name: 'taskType',
        label: 'Task Type',
        fullWidth: true,
        options: ['Email', 'Other'],
      },

      component: RHFAutocomplete,
      md: 12,
    },
    {
      componentProps: {
        placeholder: 'Select campaign',
        name: 'selectCompaign',
        label: 'Select Campaign',
        apiQuery: campaignsList,
        fullWidth: true,
        getOptionLabel: (option: any) => option?.title,
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        placeholder: 'Select assignee',
        name: 'assignedTo',
        label: 'Assigned To',
        fullWidth: true,
        options: ['fabrizioRomano', 'fabrizioRomano'],
      },

      component: RHFAutocomplete,
      md: 12,
    },
    {
      componentProps: {
        name: 'dueDate',
        label: 'Due Date',
        fullWidth: true,
      },
      component: RHFDatePicker,
      md: 12,
    },
    {
      componentProps: {
        name: 'dueTime',
        label: 'Due Time',
        fullWidth: true,
      },

      component: RHFDatePicker,

      md: 12,
    },
    {
      componentProps: {
        color: theme?.palette?.grey[500],
        variant: 'body2',
        heading: 'You can customize your default settings. Go to Settings',
      },
      gridLength: 12,
      component: Typography,
    },
    {
      componentProps: {
        name: 'editor',
        label: 'Note',
        fullWidth: true,
      },
      component: RHFEditor,
      md: 12,
    },
  ];
};
