import { DATE_TIME_FORMAT } from '@/constants';
import { generateImage } from '@/utils/avatarUtils';
import { Avatar, Box } from '@mui/material';
import dayjs from 'dayjs';
import RowSelection from '@/components/RowSelection';
import RowSelectionAll from '@/components/RowSelectionAll';

export const restoreTableColumns: any = (
  selectedRow: any,
  setSelectedRow: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      isSortable: false,
      header: (info: any) => {
        const rows = info?.table?.options?.data;
        return (
          <RowSelectionAll
            rows={rows}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            disabled={rows?.length === 0}
          />
        );
      },
      cell: (info: any) => {
        const rowData = info?.cell?.row?.original;
        const id = rowData?._id;
        return (
          <RowSelection
            id={id}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
          />
        );
      },
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: true,
      header: 'Form Name',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.deletedByUser,
      id: 'deletedByUser',
      isSortable: true,
      header: 'Deleted By',
      cell: (info: any) => {
        const firstName = info.getValue()?.firstName ?? '';
        const lastName = info.getValue()?.lastName ?? '';
        const imgUrl = info.getValue()?.profilePicture?.url;
        const email = info.getValue()?.email ?? '';

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                textTransform: 'uppercase',
                mr: '6px',
                fontSize: '14px',
              }}
              src={generateImage(imgUrl)}
            >
              {`${firstName?.charAt(0)}${lastName?.charAt(0)}`}
            </Avatar>
            <Box>
              <Box sx={{ color: 'blue.dull_blue' }}>
                {firstName} {lastName}
              </Box>
              <Box sx={{ fontSize: '12px' }}>{email}</Box>
            </Box>
          </Box>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.deletedAt,
      id: 'deletedAt',
      isSortable: true,
      header: 'Time Deleted',
      cell: (info: any) => dayjs(info?.getValue()).format(DATE_TIME_FORMAT?.UI),
    },
  ];
};
