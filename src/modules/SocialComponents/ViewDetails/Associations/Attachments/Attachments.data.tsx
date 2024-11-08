import { Box } from '@mui/material';

import { DeleteCrossIcon, ViewEyeIcon } from '@/assets/icons';
import { DATE_TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
export const columns: any = ({
  setOpenDrawer,
  setRowData,
  handleOpenAlert,
}: {
  setOpenDrawer: React.Dispatch<React.SetStateAction<string>>;
  setRowData: any;
  handleOpenAlert: any;
}) => {
  return [
    {
      accessorFn: (row: any) => row?.orignalName,
      id: 'orignalName',
      cell: (info: any) => info?.getValue(),
      header: 'Title',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) =>
        dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.UI),
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
              setOpenDrawer('View');
              setRowData(info?.row?.original);
            }}
          >
            <ViewEyeIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              handleOpenAlert(info?.row?.original?._id);
            }}
          >
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
