import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { STATUS_CONTANTS } from '@/constants/strings';

export const detailsColumns: any = (
  setOpenModalDelete: any,
  recordStatus: string,
) => {
  return [
    {
      accessorFn: (row: any) =>
        `${row?.firstName ?? 'Unknown User'} ${row?.lastName ?? ''}`,
      id: 'name',
      isSortable: false,
      header: 'Name',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phoneNumber',
      isSortable: false,
      header: 'Whatsapp Number',
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
        <>
          {recordStatus === STATUS_CONTANTS?.DRAFT ? (
            <Box
              onClick={() =>
                setOpenModalDelete({
                  isToggle: true,
                  recipientId: info.row?.original?._id,
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
          ) : (
            <Box sx={{ cursor: 'not-allowed' }}>
              <DeleteIcon />
            </Box>
          )}
        </>
      ),
    },
  ];
};
