import { Visibility } from '@mui/icons-material';

export const tiersList = [
  {
    _id: 1,
    tiers: 'Base tier',
    noOfMembers: 10,
  },
  {
    _id: 2,
    tiers: 'Gold',
    noOfMembers: 4,
  },
];

export const tiersColumns = [
  {
    accessorFn: (info: any) => info?.tiers,
    id: 'tiers',
    header: 'Tiers',
    cell: (info: any) => info?.getValue(),
    isSortable: true,
  },
  {
    accessorFn: (info: any) => info?.noOfMembers,
    id: 'noOfMembers',
    header: 'No of members',
    cell: (info: any) => info?.getValue(),
    isSortable: true,
  },
  {
    accessorFn: (info: any) => info?._id,
    id: '_id',
    header: 'Action',
    cell: () => <Visibility sx={{ cursor: 'pointer' }} />,
  },
];
