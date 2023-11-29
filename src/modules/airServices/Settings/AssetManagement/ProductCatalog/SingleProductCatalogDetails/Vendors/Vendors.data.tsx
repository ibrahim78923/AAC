import { EditYellowBGPenIcon } from '@/assets/icons';
import { DeleteForever } from '@mui/icons-material';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

export const vendorsData = [
  {
    _id: 1,
    vendorName: "Andrea's laptop",
    price: 'Andrea',
    warrantyValidity: '2023-11-06T10:34:00.891Z',
    quantity: '4',
  },
];

export const getVendorsColumns = (
  setIsDeleteModalOpen: any,
  setIsUpsertModalOpen: any,
) => [
  {
    accessorFn: (row: any) => row?.vendorName,
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
    accessorFn: (row: any) => row?.warrantyValidity,
    id: 'warrantyValidity',
    isSortable: true,
    header: 'Warranty/Validity',
    cell: (info: any) =>
      dayjs(info?.getValue()).format('dddd, MMMM DD, YYYY - HH:mm'),
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
            setIsUpsertModalOpen({ open: true, id: info?.getValue() });
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
