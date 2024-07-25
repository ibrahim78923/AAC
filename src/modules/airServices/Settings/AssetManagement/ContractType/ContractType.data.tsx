import { truncateText } from '@/utils/avatarUtils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from '@mui/material';

export const getContractTypeColumns = (
  setOpenDialog: any,
  setDeleteModalOpen: any,
): any => [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    header: 'Name',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.description,
    id: 'description',
    isSortable: true,
    header: 'Description',
    cell: (info: any) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    header: 'Action',
    cell: (info: any) => (
      <Box display={'flex'} alignItems={'center'} mt={1}>
        <IconButton
          sx={{ color: 'primary.main' }}
          onClick={() =>
            setOpenDialog({ open: true, data: info?.row?.original })
          }
          disabled={info?.row?.original?.isPredefined}
        >
          <EditIcon sx={{ color: 'primary.main' }} />
        </IconButton>
        <IconButton
          sx={{ color: 'error.lighter' }}
          onClick={() =>
            setDeleteModalOpen({
              open: true,
              id: info?.getValue(),
            })
          }
          disabled={info?.row?.original?.isPredefined}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  },
];
