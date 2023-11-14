import { Box, Checkbox } from '@mui/material';
import Image from 'next/image';

export const columns: any = [
  {
    accessorFn: (row: any) => row?.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Image src={info?.table?.row?.original?.img} alt="no imae" />{' '}
        {info?.getValue()}
      </Box>
    ),

    header: 'Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.sharedLinks,
    id: 'sharedLinks',
    isSortable: true,
    header: 'Shared Links',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.reads,
    id: 'reads',
    isSortable: true,
    header: 'Reads',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.createdBy,
    id: 'createdBy',
    isSortable: true,
    header: 'Created By',
    cell: (info: any) => info?.getValue(),
  },
];

export const toolTipData = [
  'To track who has viewed this link, make sure Require an email address to view document is enabled. Disabling this option will prevent HubSpot from tracking who is viewing your Document',
];
