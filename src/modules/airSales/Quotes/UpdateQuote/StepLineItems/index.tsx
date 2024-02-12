import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { AddCircleSmallIcon } from '@/assets/icons';
import { styles } from './StepLineItems.style';
import { EditYellowBgIcon, ViewEyeIcon, TrashIcon } from '@/assets/icons';
import { useGetQuoteByIdQuery } from '@/services/airSales/quotes';

const StepLineItems = ({ openCreateProduct }: any) => {
  const { data: productsData } = useGetQuoteByIdQuery({
    id: '655fda852a3c7ed4c1387da4',
  });

  const lineItemsColumns: any = [
    {
      accessorFn: (row: any) => row?.name,
      id: 'productName',
      cell: (info: any) => info?.getValue(),
      header: 'Product Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.unitPrice ?? 'N/A',
      id: 'unitPrice',
      isSortable: true,
      header: 'Unit Price',
      cell: (info: any) => <>£ {info?.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row?.quantity ?? 'N/A',
      id: 'quantity',
      isSortable: true,
      header: 'Quantity',
      cell: (info: any) => <Box sx={styles?.cellChip}>{info?.getValue()}</Box>,
    },
    {
      accessorFn: (row: any) => row?.unitDiscount ?? 'N/A',
      id: 'unitDiscount',
      isSortable: true,
      header: 'Unit Discount',
      cell: (info: any) => (
        <Stack direction={'row'} gap="6px">
          <Box sx={styles?.cellChip}>{info?.getValue()}</Box>
          <Box sx={styles?.cellChip}>
            {info?.row?.original.discount}{' '}
            {info?.getValue() === '%' ? '%' : null}
          </Box>
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.totalPrice ?? 'N/A',
      id: 'totalPrice',
      isSortable: true,
      header: 'Total Price',
      cell: (info: any) => <>£ {info?.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row?.createdDate ?? 'N/A',
      id: 'createdDate',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.actions,
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <Stack direction="row" gap="8px">
          <Box sx={styles?.actionBtn} onClick={openCreateProduct}>
            <ViewEyeIcon />
          </Box>
          <Box sx={styles?.actionBtn} onClick={openCreateProduct}>
            <EditYellowBgIcon />
          </Box>
          <Box sx={styles?.actionBtn}>
            <TrashIcon />
          </Box>
        </Stack>
      ),
    },
  ];
  return (
    <>
      <Box sx={styles?.TableWrapper}>
        <Box sx={styles?.pageHeader}>
          <Typography variant="h4" sx={styles?.pageHeaderTitle}>
            Products
          </Typography>
          <Stack direction="row" spacing={'12px'}>
            <Search placeholder="Search Here" />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleSmallIcon />}
              onClick={openCreateProduct}
            >
              Add Products
            </Button>
          </Stack>
        </Box>
        <TanstackTable
          columns={lineItemsColumns}
          data={productsData?.data?.products}
        />
      </Box>

      <Box sx={styles?.voucherCont}>
        <Box sx={styles?.voucher}>
          <Box sx={styles?.voucherHeader}>
            <Box sx={styles?.vHeadCell}>Subtotal:</Box>
            <Box sx={styles?.vHeadCell}>£75</Box>
          </Box>

          <Box sx={styles?.voucherBody}>
            <Box sx={styles?.vRow}>
              <Box sx={styles?.bodyCell}>V.A.T %</Box>
              <Box sx={styles?.bodyCellH}>£ 20</Box>
            </Box>
            <Box sx={styles?.vRow}>
              <Box sx={styles?.bodyCell}>Unit Discount</Box>
              <Box sx={styles?.bodyCellH}>£ 30</Box>
            </Box>
            <Box sx={styles?.vRow}>
              <Box sx={styles?.bodyCell}>Total Discount</Box>
              <Box sx={styles?.bodyCellH}>£ 5</Box>
            </Box>
          </Box>

          <Box sx={styles?.voucherFooter}>
            <Box sx={styles?.fCell}>Total</Box>
            <Box sx={styles?.fCell}>£50</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default StepLineItems;
