import { TruncateText } from '@/components/TruncateText';
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
    cell: (info: any) => (
      <TruncateText
        text={info?.getValue()}
        size={25}
        customTooltipProps={{ placement: 'top-start' }}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.description,
    id: 'description',
    isSortable: true,
    header: 'Description',
    cell: (info: any) => (
      <TruncateText
        text={info?.getValue()}
        size={30}
        customTooltipProps={{ placement: 'bottom-start' }}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    header: 'Action',
    cell: (info: any) => (
      <Box display={'flex'} alignItems={'center'} mt={1}>
        <IconButton
          sx={{
            color: 'primary.main',
            '&.Mui-disabled': {
              color: 'grey.0',
            },
          }}
          onClick={() =>
            setOpenDialog({ open: true, data: info?.row?.original })
          }
          disabled={info?.row?.original?.perDefine === false}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          sx={{
            color: 'error.lighter',
            '&.Mui-disabled': {
              color: 'grey.0',
            },
          }}
          onClick={() =>
            setDeleteModalOpen({
              open: true,
              id: info?.getValue(),
            })
          }
          disabled={info?.row?.original?.perDefine === false}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  },
];
