import { Box, Typography } from '@mui/material';
import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';

export const teamList: any = (setIsPortalOpen: any) => [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Team Name',
    cell: (info: any) => (
      <Typography variant="body4" color="blue.dull_blue">
        {info?.getValue() ?? '--'}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.teamMembers,
    id: 'teamMembers',
    isSortable: true,
    header: 'Team Members',
    cell: (info: any) => info?.getValue() ?? '--',
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Action',
    cell: (info: any) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            setIsPortalOpen({
              isOpen: true,
              isView: true,
              data: info?.row?.original,
            })
          }
        >
          <ViewEyeIcon />
        </Box>
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setIsPortalOpen({
              isOpen: true,
              isUpsert: true,
              data: info?.row?.original,
            });
          }}
        >
          <EditPenIcon />
        </Box>
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            setIsPortalOpen({
              isOpen: true,
              isDelete: true,
              data: info?.row?.original,
            })
          }
        >
          <DeleteCrossIcon />
        </Box>
      </Box>
    ),
  },
];
