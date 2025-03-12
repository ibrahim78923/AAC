import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { STATUS_CONTANTS } from '@/constants/strings';
import { capitalizeFirstLetter } from '@/utils/api';

export const smsDetailsColumns: any = (
  setOpenModalDelete: any,
  recordStatus: any,
) => {
  return [
    {
      accessorFn: (row: any) => row,
      id: 'name',
      isSortable: false,
      header: 'Name',
      cell: (info: any) => {
        const firstName = info?.row?.original?.firstName;
        const lastName = info?.row?.original?.lastName;
        return firstName || lastName
          ? `${firstName ?? ''} ${lastName ?? ''}`.trim()
          : 'Unknown User';
      },
    },
    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phoneNumber',
      isSortable: false,
      header: 'Phone Number',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: false,
      header: 'Status',
      cell: (info: any) =>
        info?.getValue() ? capitalizeFirstLetter(info?.getValue()) : 'N/A',
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
