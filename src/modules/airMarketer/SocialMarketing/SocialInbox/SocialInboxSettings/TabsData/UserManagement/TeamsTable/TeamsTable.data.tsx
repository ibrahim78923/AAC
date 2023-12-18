import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import { Box } from '@mui/material';

import * as Yup from 'yup';

export const columnsTeams: any = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => info?.getValue(),
    header: 'Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.teamMember,
    id: 'teamMember',
    isSortable: true,
    header: 'Team Member',
    cell: (info: any) => info?.getValue(),
  },

  {
    accessorFn: (row: any) => row?.action,
    id: 'action',
    isSortable: true,
    header: 'Action',
    cell: () => (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Box sx={{ cursor: 'pointer' }}>
          <ViewEyeIcon />
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <EditPenIcon />
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <DeleteCrossIcon />
        </Box>
      </Box>
    ),
  },
];

export const validationSchema = Yup?.object()?.shape({
  teamName: Yup?.string()?.required('Field is Required'),
  teamMember: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValues = {
  teamName: '',
  teamMember: '',
};

export const teamsDataArray = [
  {
    componentProps: {
      name: 'teamName',
      label: 'Team Name',
      placeholder: 'Team Name',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'teamMembers',
      label: 'Team Members',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'United Kingdom', label: 'A' },
      { value: 'United Kingdom', label: 'B' },
      { value: 'United Kingdom', label: 'C' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
