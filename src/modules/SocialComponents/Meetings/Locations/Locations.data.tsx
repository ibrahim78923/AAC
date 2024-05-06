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
    locationName: `Conference Room1`,
    locationDescription: `Conference Room1`,
    locationDestination: 'Lorum ipsum',
    locationDate: '12/01/2023',
    actions: '',
  },
  {
    id: 2,
    locationName: `Conference Room1`,
    locationDescription: `Conference Room1`,
    locationDestination: 'Lorum ipsum',
    locationDate: '12/01/2023',
    actions: '',
  },
  {
    id: 3,
    locationName: `Conference Room1`,
    locationDescription: `Conference Room1`,
    locationDestination: 'Lorum ipsum',
    locationDate: '12/01/2023',
    actions: '',
  },
];
export const locationsList: any = (
  setIsAddDrawerOpen: any,
  setDeleteModal: any,
  setIsUpdate: any,
) => [
  {
    accessorFn: (row: any) => row?.locationName,
    id: 'locationName',
    isSortable: true,
    header: 'Location Name',
    cell: (info: any) => (
      <Typography variant="body4" color="blue.dull_blue">
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.locationDescription,
    id: 'locationDescription',
    isSortable: true,
    header: 'Destination`',
    cell: (info: any) => (
      <Typography variant="body4" color="blue.dull_blue">
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.locationDestination,
    id: 'locationDestination',
    isSortable: true,
    header: 'Description',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.locationDate,
    id: 'locationDate',
    isSortable: true,
    header: 'Created Date',
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
          onClick={() => {
            setIsUpdate(true);
            setIsAddDrawerOpen(true);
          }}
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
