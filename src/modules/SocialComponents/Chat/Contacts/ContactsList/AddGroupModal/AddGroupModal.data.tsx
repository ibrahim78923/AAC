import { RHFTextField } from '@/components/ReactHookForm';
import { Box, Checkbox } from '@mui/material';

import * as Yup from 'yup';
export const addGroupValidationSchema = Yup?.object()?.shape({
  groupTitle: Yup?.string()?.trim()?.required('Field is Required'),
});

export const addGroupDefaultValues = {
  groupTitle: '',
};

export const addGroupFiltersDataArray = [
  {
    componentProps: {
      name: 'groupTitle',
      label: 'Group Title',
    },
    component: RHFTextField,
    md: 12,
  },
];

export const participantsData = [
  {
    id: '01',
    participant: 'jhon',
  },
];

export const columns = () => {
  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'id',
      cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
      header: 'Group Admin',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.participant,
      id: 'participant',
      isSortable: false,
      header: 'participant',
      cell: (info: any) => info?.getValue(),
    },
    {
      id: 'Remove Participant',
      isSortable: false,
      header: 'Remove Participant',
      cell: () => <Box>Remove</Box>,
    },
  ];
};
