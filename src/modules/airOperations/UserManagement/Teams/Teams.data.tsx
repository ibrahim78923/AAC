import { Box, Typography } from '@mui/material';
import { TeamListI } from './Teams.interface';
import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';

export const teamDropdown = (setDeleteModal: any) => [
  {
    title: 'Delete',
    handleClick: (close: any) => {
      setDeleteModal(true);
      close(null);
    },
  },
];

export const teamListData: TeamListI[] = [
  {
    id: 1,
    teamName: `Test`,
    teamMembers: 4,
    actions: '',
  },
  {
    id: 2,
    teamName: `Test1`,
    teamMembers: 2,
    actions: '',
  },
  {
    id: 3,
    teamName: `Orcalo`,
    teamMembers: 1,
    actions: '',
  },
];
export const teamList: any = (
  selectedTeamList: any,
  setSelectedTeamList: any,
  teamListData: any,
  setIsTeamDrawerOpen: any,
  setIsDrawerOpen: any,
  setDeleteModal: any,
) => [
  {
    accessorFn: (row: any) => row?.teamName,
    id: 'teamName',
    isSortable: true,
    header: 'Team Name',
    cell: (info: any) => (
      <Typography variant="body4" color="blue.dull_blue">
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.teamMembers,
    id: 'teamMembers',
    isSortable: true,
    header: 'Team Members',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Action',
    cell: () => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() => setIsTeamDrawerOpen(true)}
        >
          <ViewEyeIcon />
        </Box>
        <Box sx={{ cursor: 'pointer' }} onClick={() => setIsDrawerOpen(true)}>
          <EditPenIcon />
        </Box>
        <Box sx={{ cursor: 'pointer' }} onClick={() => setDeleteModal(true)}>
          <DeleteCrossIcon />
        </Box>
      </Box>
    ),
  },
];
