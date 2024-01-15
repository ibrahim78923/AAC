import { AntSwitch } from '@/components/AntSwitch';
import { Avatar, Box, Typography } from '@mui/material';

export const betaFeaturedata = [
  {
    id: 1,
    heading: 'Prepaid module',
    discription:
      'Use our new prepaid feature where a prepaid amount is linked to the contact, not a card',
    status: true,
  },
  {
    id: 2,
    heading: 'Loyalty Tiers',
    discription:
      'Use our new prepaid feature where a prepaid amount is linked to the contact, not a card',
    status: false,
  },
];

export const betaFeatureColumn = [
  {
    accessorFn: (row: any) => row?.heading,
    id: 'heading ',
    header: 'Name',
    cell: (info: any) => (
      <Box display={'flex'} flexWrap={'wrap'}>
        <Avatar
          sx={{ bgcolor: 'blue.light', fontSize: '14px', fontWeight: 500 }}
        >
          {info?.row?.original?.heading?.slice(0, 2)?.toUpperCase()}
        </Avatar>
        <Box mx={2}>
          <Typography variant="body2" fontWeight={500} color={'common.black'}>
            {info?.row?.original?.heading}
          </Typography>
          <Typography variant="body3" color={'grey.900'}>
            {info?.row?.original?.discription}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => <AntSwitch values={info?.getValue()} />,
  },
];
