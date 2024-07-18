import { DeleteCrossIcon, EditPenIcon } from '@/assets/icons';
import { Box } from '@mui/material';

export const columns: any = (
  setIsOpenDeleteDrawer: any,
  setIsEditDrawer: any,
) => {
  return [
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
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsEditDrawer({
                isToggled: true,
                id: info?.row?.original?._id,
                type: 'edit',
              });
            }}
          >
            <EditPenIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              setIsOpenDeleteDrawer({
                isToggled: true,
                id: info?.row?.original?._id,
              })
            }
          >
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
