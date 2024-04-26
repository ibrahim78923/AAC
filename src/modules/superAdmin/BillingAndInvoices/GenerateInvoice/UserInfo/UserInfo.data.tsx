import { Box, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
export const columns = (EditInvoice: any) => {
  const planPrice = EditInvoice?.plans?.planPrice;

  const totalAdditionalUserPrice =
    EditInvoice?.details?.sumAdditionalUsersPrices;

  const totalAdditionalStoragePrice =
    EditInvoice?.details?.sumAdditionalStoragePrices;

  const planDiscount = EditInvoice?.details?.planDiscount;

  const subtotalBeforeDiscount =
    planPrice + totalAdditionalUserPrice + totalAdditionalStoragePrice;

  const subtotalAfterDiscount =
    subtotalBeforeDiscount - (planDiscount / 100) * subtotalBeforeDiscount;

  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'srNumber',
      cell: () => '1',
      header: 'Sr#',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.product,
      id: 'product',
      cell: (info: any) => (
        <>
          {info?.row?.original?.plans?.products?.map((data: any) => (
            <Typography variant="subtitle2" key={uuidv4()}>
              {data?.name}{' '}
            </Typography>
          ))}
          <Box>{info?.row?.original?.details?.plantypes}</Box>
        </>
      ),
      header: 'Product/Suite',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.details?.plans?.planPrice,
      id: 'planPrice',
      isSortable: true,
      header: 'Plan Price',
      cell: () => <>£ {planPrice}</>,
    },
    {
      accessorFn: (row: any) => row?.details?.additionalUsers,
      id: 'additionalUsers',
      isSortable: true,
      header: 'Additional Users',
      cell: (info: any) => (
        <>
          {info?.getValue()} *(£
          {info?.row?.original?.plans?.additionalPerUserPrice}) = £{' '}
          {totalAdditionalUserPrice}
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.details?.additionalStorage,
      id: 'additionalStorage',
      isSortable: true,
      header: 'Additional Storage',
      cell: (info: any) => (
        <>
          {info?.getValue()} *(£
          {info?.row?.original?.plans?.additionalStoragePrice}) = £
          {totalAdditionalStoragePrice}
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.details?.planDiscount,
      id: 'discount',
      isSortable: true,
      header: 'Discount(%)',
      cell: (info: any) => <>{info?.getValue()} %</>,
    },
    {
      accessorFn: (row: any) => row?.subTotal,
      id: 'subTotal',
      isSortable: true,
      header: 'Subtotal',
      cell: () => (
        <Box sx={{ fontWeight: '800' }}>£ {subtotalAfterDiscount}</Box>
      ),
    },
  ];
};
