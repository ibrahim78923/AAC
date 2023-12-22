import { RHFTextField } from '@/components/ReactHookForm';
import { Box, Checkbox, Typography, useTheme } from '@mui/material';

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

export const columns = (handleRemoveParticipant: any) => {
  const theme = useTheme();
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
      cell: (info: any) => (
        <Typography variant="body3">{info?.getValue()}</Typography>
      ),
    },
    {
      id: 'Remove Participant',
      isSortable: false,
      header: (
        <Box sx={{ textAlign: 'right', width: '100%' }}>Remove Participant</Box>
      ),
      cell: (info: any) => (
        <Box
          sx={{ textAlign: 'right' }}
          onClick={() => handleRemoveParticipant(info?.cell?.row?.original?.id)}
        >
          <Typography
            variant="body3"
            sx={{ color: theme.palette.error.main, cursor: 'pointer' }}
          >
            Remove
          </Typography>
        </Box>
      ),
    },
  ];
};
