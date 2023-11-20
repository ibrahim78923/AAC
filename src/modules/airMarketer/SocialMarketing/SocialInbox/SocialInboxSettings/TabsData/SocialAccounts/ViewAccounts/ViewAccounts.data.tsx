import Image from 'next/image';
import { Box, Chip, Switch, Typography } from '@mui/material';
import { NotesAvatarImage } from '@/assets/images';

const status: Record<string, [string, string]> = {
  Connected: ['#ECFFF1', '#47B263'],
  Disconnected: ['#FDD', '#FF4A4A'],
};

export const columns: any = () => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'contact_id',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Image src={NotesAvatarImage} width={40} height={40} alt="avatar" />
          <Box>
            <Typography variant="body3" sx={{ color: '#111827' }}>
              {info?.row?.original?.name}
            </Typography>
            <br />
            <Typography variant="body3">
              {info?.row?.original?.email}
            </Typography>
          </Box>
        </Box>
      ),
      header: 'Name',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'type',
      isSortable: true,
      header: 'Type',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.owner,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <Chip
          label={info?.row?.original?.owner}
          sx={{
            bgcolor: status[info?.row?.original?.owner][0],
            color: status[info?.row?.original?.owner][1],
          }}
        />
      ),
    },

    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: () => (
        <Box>
          <Switch defaultChecked />
        </Box>
      ),
    },
  ];
};
