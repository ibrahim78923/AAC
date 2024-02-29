import { EditYellowBGPenIcon } from '@/assets/icons';
import { DeleteForever } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export const productColumns = (
  setUpsertProductModal: any,
  setDeleteModalOpen: any,
  setEditData: any,
): any => [
  {
    accessorFn: (row: any) => row?.vendorproductcatalogsDetails?.name,
    id: 'productName',
    isSortable: true,
    header: 'Product Name',
    cell: (info: any) => (
      <Typography fontWeight={600}> {info?.getValue()}</Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.price,
    id: 'price',
    header: 'Price',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.warrantyValidity,
    id: 'warrantyValidity',
    isSortable: true,
    header: 'Warranty/Validity',
    cell: (info: any) =>
      `${info?.row?.original?.months} Months  ${info?.row?.original?.yrs} Yrs`,
  },
  {
    accessorFn: (row: any) => row?.quantity,
    id: 'quantity',
    isSortable: true,
    header: 'Quantity',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.action,
    id: 'action',
    isSortable: true,
    header: 'Action',
    cell: (info: any) => (
      <Box display={'flex'}>
        <Box
          onClick={() => {
            setEditData(info?.row?.original);
            setUpsertProductModal(true);
          }}
          sx={{ cursor: 'pointer' }}
        >
          <EditYellowBGPenIcon />
        </Box>
        <DeleteForever
          color={'error'}
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setDeleteModalOpen(true);
          }}
        />
      </Box>
    ),
  },
];
