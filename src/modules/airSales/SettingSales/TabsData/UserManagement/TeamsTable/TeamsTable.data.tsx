import { Box, Theme, useTheme } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import { EditPenIcon } from '@/assets/icons';
import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
import { UserAvatarImage } from '@/assets/images';

const theme = useTheme<Theme>();

export const columnsTeams = (setIsTeamDrawer: any, setIsOpenDelete: any) => {
  return [
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <VisibilityIcon
            onClick={() => setIsTeamDrawer(true)}
            sx={{
              color: `${theme?.palette?.blue?.main}`,
              fontSize: '22px',
              cursor: 'pointer',
            }}
          />
          <EditPenIcon />
          <CancelIcon
            onClick={() => setIsOpenDelete(true)}
            sx={{
              color: `${theme?.palette?.error?.main}`,
              fontSize: '22px',
              cursor: 'pointer',
            }}
          />
        </Box>
      ),
    },
  ];
};

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
      fullWidth: true,
      select: false,
      placeholder: 'Enter Team Name',
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

export const memberDetails = [
  {
    img: UserAvatarImage,
    name: 'Olivia Rhye',
    email: 'abc@gmail.com',
    designation: 'Graphic Designer',
  },
  {
    img: UserAvatarImage,
    name: 'Olivia Rhye',
    email: 'abc@gmail.com',
    designation: 'Graphic Designer',
  },
];
