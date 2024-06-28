import { Box } from '@mui/material';

import { DeleteCrossIcon, ViewEyeIcon } from '@/assets/icons';

export const columns: any = ({
  setOpenDrawer,
  setIsOpenAlert,
  setContactRecord,
}: {
  setOpenDrawer: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setContactRecord: any;
}) => {
  return [
    {
      accessorFn: (row: any) => row?.ticketIdNumber,
      id: 'ticket_no',
      cell: (info: any) => info?.getValue(),
      header: 'Ticket No',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.Name,
      id: 'Name',
      isSortable: true,
      header: ' Name',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpenDrawer('View'), setContactRecord(info?.row?.original);
            }}
          >
            <ViewEyeIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsOpenAlert(true), setContactRecord(info?.row?.original);
            }}
          >
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
