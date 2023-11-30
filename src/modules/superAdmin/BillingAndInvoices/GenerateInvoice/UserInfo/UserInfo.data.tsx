import { Box, Input, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
export const columns = (setDiscountValue: any, discountValue: any) => {
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
      cell: (info: any) => <>£ {info?.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row?.details?.additionalUsers,
      id: 'additionalUsers',
      isSortable: true,
      header: 'Additional Users',
      cell: (info: any) => (
        <>
          {info?.getValue()} (*£15) = £{info?.getValue() * 15}
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
          {info?.getValue()} (*£15) = £{info?.getValue() * 15}
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.invoiceDiscount,
      id: 'discount',
      isSortable: true,
      header: 'Discount(%)',
      cell: (info: any) => (
        <Box sx={{ fontWeight: '800' }}>
          <Input
            // value={info?.getValue()}
            value={info?.getValue() && discountValue}
            placeholder="20"
            type="number"
            onChange={(newValue) => setDiscountValue(newValue?.target?.value)}
            sx={{
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '5px 10px',
              '&.MuiInput-root::before': { borderBottom: '0' },
            }}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.subTotal,
      id: 'subTotal',
      isSortable: true,
      header: 'Subtotal',
      cell: (info: any) => (
        <Box sx={{ fontWeight: '800' }}>£ {info?.getValue()}</Box>
      ),
    },
  ];
};
