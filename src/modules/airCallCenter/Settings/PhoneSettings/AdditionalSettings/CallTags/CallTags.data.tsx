import { Box } from '@mui/material';
import { EditYellowBGPenIcon } from '@/assets/icons';
import { DeleteCallTag } from './DeleteCallTag';

export const callTagsTableData = [
  {
    id: 1,
    callTag: `Interested`,
  },
  {
    id: 12,
    callTag: `Not interested`,
  },
  {
    id: 112,
    callTag: `No response`,
  },
  {
    id: 12,
    callTag: `Follow Up`,
  },
  {
    id: 112,
    callTag: `Invalid Number`,
  },
];
export const callTagsColumns = [
  {
    accessorFn: (row: any) => row?.callTag,
    id: 'callTag',
    isSortable: true,
    header: 'Call Tag Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    isSortable: true,
    header: 'Actions',
    cell: (info: any) => (
      <Box>
        <EditYellowBGPenIcon />
        <DeleteCallTag id={info?.getValue()} />
      </Box>
    ),
  },
];
