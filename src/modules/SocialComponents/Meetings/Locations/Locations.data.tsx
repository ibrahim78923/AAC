import { Box, Typography } from '@mui/material';
import { DeleteCrossIcon, EditPenIcon } from '@/assets/icons';

export const locationDeletehandler = (setDeleteModal: any) => [
  {
    title: 'Delete',
    handleClick: (close: any) => {
      setDeleteModal(true);
      close(null);
    },
  },
];

export const locationsListData = [
  {
    id: 1,
    teamName: `Conference Room1`,
    teamDestination: `Conference Room1`,
    teamMembers: 'Lorum ipsum',
    actions: '',
  },
  {
    id: 2,
    teamName: `Conference Room1`,
    teamDestination: `Conference Room1`,
    teamMembers: 'Lorum ipsum',
    actions: '',
  },
  {
    id: 3,
    teamName: `Conference Room1`,
    teamDestination: `Conference Room1`,
    teamMembers: 'Lorum ipsum',
    actions: '',
  },
];
export const locationsList: any = (
  setIsAddDrawerOpen: any,
  setDeleteModal: any,
) => [
  {
    accessorFn: (row: any) => row?.teamName,
    id: 'teamName',
    isSortable: true,
    header: 'Location Name',
    cell: (info: any) => (
      <Typography variant="body4" color="blue.dull_blue">
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.teamDestination,
    id: 'teamName',
    isSortable: true,
    header: 'Destination`',
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
    header: 'Description',
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
          onClick={() => setIsAddDrawerOpen(true)}
        >
          <EditPenIcon />
        </Box>
        <Box sx={{ cursor: 'pointer' }} onClick={() => setDeleteModal(true)}>
          <DeleteCrossIcon />
        </Box>
      </Box>
    ),
  },
];
