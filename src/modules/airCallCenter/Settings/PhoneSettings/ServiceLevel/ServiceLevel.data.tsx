import { EditYellowBGPenIcon } from '@/assets/icons';
import { Box } from '@mui/material';
import { DeleteServiceLevel } from './DeleteServiceLevel';

export const serviceLevelData = [
  {
    name: 'Queue 1',
    targetIn: '45%',
    threshold: 20,
    _id: '1asif@ceative.co.uk',
  },
  {
    name: 'Queue 2',
    targetIn: '20%',
    threshold: 30,
    _id: '2asif@ceative.co.uk',
  },
  {
    name: 'New call Queue',
    targetIn: '70%',
    threshold: 25,
    _id: '3asif@ceative.co.uk',
  },
];

export const serviceLevelColumns = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Queue Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.targetIn,
    id: 'targetIn',
    isSortable: true,
    header: 'Target In',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.threshold,
    id: 'threshold',
    isSortable: true,
    header: 'Threshold',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    isSortable: true,
    header: 'Action',
    cell: (info: any) => (
      <Box>
        <EditYellowBGPenIcon />
        <DeleteServiceLevel id={info?.getValue()} />
      </Box>
    ),
  },
];
