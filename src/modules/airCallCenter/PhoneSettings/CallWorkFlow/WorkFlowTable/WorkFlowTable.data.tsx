import { DeleteCrossIcon, EditYellowBGPenIcon } from '@/assets/icons';
import { Box, Stack } from '@mui/material';

export const data: any = [
  {
    name: ` @olivia`,
    type: 'Draftstrtr',
  },
  {
    name: ` @olivia`,
    type: 'Draftstrtr',
  },
  {
    name: ` @olivia`,
    type: 'Draftstrtr',
  },
];
export const columns: any = [
  {
    accessorFn: (row: any) => row.name,
    id: 'name',
    cell: (info: any) => info.getValue(),
    header: 'Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.type,
    id: 'type',
    isSortable: true,
    header: 'Type',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.actions,
    id: 'actions',
    isSortable: true,
    header: 'Actions',
    cell: (
      <Stack direction="row" gap={1} alignItems="center">
        <Box sx={{ cursor: 'pointer' }}>
          <EditYellowBGPenIcon />
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <DeleteCrossIcon />
        </Box>
      </Stack>
    ),
  },
];
