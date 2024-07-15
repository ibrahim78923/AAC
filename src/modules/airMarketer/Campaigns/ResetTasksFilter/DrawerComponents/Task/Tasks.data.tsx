import { DeleteCrossIcon, EditPenIcon } from '@/assets/icons';
import { Box } from '@mui/material';

export const columns: any = [
  {
    accessorFn: (row: any) => row?.taskName,
    id: 'taskName',
    cell: (info: any) => info?.getValue() ?? 'N/A',
    header: 'Task Name',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.campaignDetails[0]?.title,
    id: 'campaignName',
    isSortable: true,
    header: 'Campaign Name',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Actions',
    cell: () => (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Box
          sx={{ cursor: 'pointer' }}
          // onClick={() => {
          //   setIsDraweropen('Edit');
          // }}
        >
          <EditPenIcon />
        </Box>
        <Box
          sx={{ cursor: 'pointer' }}
          // onClick={() => setDeleteModalOpen(true)}
        >
          <DeleteCrossIcon />
        </Box>
      </Box>
    ),
  },
];
