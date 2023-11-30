import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import { Box } from '@mui/material';

export const productData: any = [
  {
    _id: 1,
    productName: 'Apple MacBook Air 13',
    price: '1099.00',
    warrantyValidity: { month: '2', year: '6' },
    quantity: '1',
  },
];
export const productColumns = (
  setUpsertProductModal: any,
  setDeleteModalOpen: any,
  setEditData: any,
): any => [
  {
    accessorFn: (row: any) => row?.productName,
    _id: 'productName',
    isSortable: true,
    header: 'Product Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.price,
    _id: 'price',
    header: 'Price',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.warrantyValidity,
    _id: 'warrantyValidity',
    isSortable: true,
    header: 'Warranty/Validity',
    cell: (info: any) =>
      `${info?.getValue()?.month} Months  ${info?.getValue()?.year} Yrs`,
  },
  {
    accessorFn: (row: any) => row?.quantity,
    _id: 'quantity',
    isSortable: true,
    header: 'Quantity',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.action,
    _id: 'action',
    isSortable: true,
    header: 'Action',
    cell: (info: any) => (
      <>
        <Box display={'flex'} alignItems={'center'}>
          <ModeEditOutlineSharpIcon
            sx={{ color: 'warning.main', cursor: 'pointer' }}
            onClick={() => {
              setEditData(info?.row?.original);
              setUpsertProductModal(true);
            }}
          />
          <DeleteIcon
            onClick={() => {
              setDeleteModalOpen(true);
            }}
            sx={{ color: 'red', cursor: 'pointer' }}
          />
        </Box>
        {info?.getValue()}
      </>
    ),
  },
];
