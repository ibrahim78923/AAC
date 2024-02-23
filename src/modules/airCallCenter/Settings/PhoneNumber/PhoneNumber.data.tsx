import { Avatar, Box, Typography } from '@mui/material';
import { AvatarImage } from '@/assets/images';
export const phoneNumberData: any = [
  {
    number: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'} variant="body3">
            Jerome Bell
          </Typography>
          <Typography component={'span'} variant="body3">
            (267) 380 - 2788
          </Typography>
          <Typography component={'span'} variant="body3">
            Pennslyvania, US
          </Typography>
        </Box>
      </Box>
    ),
    businessHours: 'Company Owner',
    callActions: 'Orcalo Holdings',
  },
];

export const phoneNumberColumns: any = [
  {
    accessorFn: (row: any) => row?.number,
    id: 'number',
    cell: (info: any) => info?.getValue(),
    header: 'Number',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.businessHours,
    id: 'businessHours',
    isSortable: true,
    header: 'Business Hours',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.callActions,
    id: 'callActions',
    isSortable: true,
    header: 'Call Actions',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.action,
    id: 'action',
    isSortable: true,
    header: 'Action',
    cell: (info: any) => info?.getValue(),
  },
];
