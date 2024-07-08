import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const smsDetailsColumns: any = (setOpenModalDelete: any) => {
  return [
    {
      accessorFn: (row: any) => `${row?.firstName} ${row?.lastName}`,
      id: 'name',
      isSortable: false,
      header: 'Name',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phoneNumber',
      isSortable: false,
      header: 'Phone Number',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.messageStatus,
      id: 'status',
      isSortable: false,
      header: 'Status',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.Actions,
      id: 'action',
      isSortable: false,
      header: 'Actions',
      cell: (info: any) => (
        <Box
          onClick={() =>
            setOpenModalDelete({
              isToggle: true,
              recipientId: info?.row?.original?._id,
            })
          }
          sx={{
            background: (theme: any) => theme?.Palette?.grey[400],
            width: 'fit-content',
            borderRadius: '100%',
            p: 1,
            cursor: 'pointer',
          }}
        >
          <DeleteIcon />
        </Box>
      ),
    },
  ];
};
