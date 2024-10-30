import { EditYellowBGPenIcon } from '@/assets/icons';
import { TruncateText } from '@/components/TruncateText';
import { DeleteForever } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

export const productColumns = (
  setUpsertProductModal: any,
  setDeleteModalOpen: any,
  setEditData: any,
  setDeleteId: any,
): any => [
  {
    accessorFn: (row: any) => row?.vendorproductcatalogsDetails?.name,
    id: 'productName',
    isSortable: true,
    header: 'Product Name',
    cell: (info: any) => (
      <TruncateText
        text={info?.getValue()}
        customTooltipProps={{ placement: 'top-start' }}
      />
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
      `${!!info?.row?.original?.yrs ? info?.row?.original?.yrs : '0'} Yrs  ${
        !!info?.row?.original?.months ? info?.row?.original?.months : '0'
      } Months`,
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
      <Box display={'flex'} alignItems="center">
        <IconButton
          onClick={() => {
            setEditData(info?.row?.original);
            setUpsertProductModal(true);
          }}
        >
          <EditYellowBGPenIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setDeleteModalOpen(true);
            setDeleteId(info?.row?.original?._id);
          }}
        >
          <DeleteForever color={'error'} />
        </IconButton>
      </Box>
    ),
  },
];
