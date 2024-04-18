import { Box, Typography } from '@mui/material';
import { DeleteCrossIcon, EditPenIcon } from '@/assets/icons';
import TeamsDetails from './TeamsDetails';

export const teamList: any = (
  selectedTeamList: any,
  setSelectedTeamList: any,
  teamListData: any,
  setIsTeamDrawerOpen: any,
  setIsEditDrawerOpen: any,
  setDeleteModal: any,
  setTeamData: any,
) => [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Team Name',
    cell: (info: any) => (
      <Typography variant="body4" color="blue.dull_blue">
        {info?.getValue() ?? '--'}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.teamMembers,
    id: 'teamMembers',
    isSortable: true,
    header: 'Team Members',
    cell: (info: any) => info?.getValue() ?? '--',
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Action',
    cell: (info: any) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TeamsDetails
          teamId={info?.row?.original?._id}
          title={'Test'}
          okText={'Save'}
        />
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setIsEditDrawerOpen(true);
            setTeamData(info?.row?.original);
          }}
        >
          <EditPenIcon />
        </Box>
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            setDeleteModal({ val: true, rowId: info?.row?.original?._id })
          }
        >
          <DeleteCrossIcon />
        </Box>
      </Box>
    ),
  },
];
