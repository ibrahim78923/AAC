import { EditYellowBGPenIcon } from '@/assets/icons';
import { DeleteForever } from '@mui/icons-material';
import { Box } from '@mui/material';

export const getVendorsColumns = (
  setIsDeleteModalOpen: any,
  setIsUpsertModalOpen: any,
) => [
  {
    accessorFn: (row: any) => row?.vendor?.name,
    id: 'vendorName',
    isSortable: true,
    header: 'Vendor Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.price,
    id: 'price',
    isSortable: true,
    header: 'Price',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.months,
    id: 'warrantyValidity',
    isSortable: true,
    header: 'Warranty/Validity',
    cell: (info: any) =>
      `${info?.row?.original?.yrs}Yrs  ${info?.getValue()}Months`,
  },
  {
    accessorFn: (row: any) => row?.quantity,
    id: 'quantity',
    isSortable: true,
    header: 'Quantity',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    header: 'Action',
    cell: (info: any) => (
      <Box display={'flex'}>
        <Box
          onClick={() => {
            setIsUpsertModalOpen({ open: true, data: info?.row?.original });
          }}
          sx={{ cursor: 'pointer' }}
        >
          <EditYellowBGPenIcon />
        </Box>
        <DeleteForever
          color={'error'}
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setIsDeleteModalOpen({ open: true, id: info?.getValue() });
          }}
        />
      </Box>
    ),
  },
];
