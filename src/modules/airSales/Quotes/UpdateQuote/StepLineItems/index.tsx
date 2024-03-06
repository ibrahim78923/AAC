import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { AddCircleSmallIcon } from '@/assets/icons';
import { styles } from './StepLineItems.style';
import { EditYellowBgIcon, ViewEyeIcon, TrashIcon } from '@/assets/icons';
import {
  useDeleteProductsMutation,
  useGetQuoteByIdQuery,
} from '@/services/airSales/quotes';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';

const StepLineItems = ({ openCreateProduct }: any) => {
  const router = useRouter();
  const { data } = router?.query;
  const { data: productsData } = useGetQuoteByIdQuery({
    id: data,
  });

  const [deleteProducts] = useDeleteProductsMutation();
  const handleDeleteDeals = async (productId: string) => {
    try {
      const DelProdBody = {
        dealId: productsData?.data?.dealId,
        product: {
          productId,
        },
      };
      await deleteProducts({ body: DelProdBody })?.unwrap();
      enqueueSnackbar('Deals deleted successfully', {
        variant: 'success',
      });
      // setSelectedRows([]);
      // handleDeleteModal();
    } catch (error) {
      enqueueSnackbar('Error while deleting deals', {
        variant: 'error',
      });
    }
  };
  const handleAction = (id: string, action: string) => {
    router.push(`?data=${data}&productId=${id}&type=${action}`);
    openCreateProduct();
  };
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
      accessorFn: (row: any) => row?.productId,
      id: 'productId',
      header: 'Actions',
      cell: ({ getValue }: any) => (
        <Stack direction="row" gap="8px">
          <Box
            sx={styles?.actionBtn}
            onClick={() => {
              handleAction(getValue(), 'view');
            }}
          >
            <ViewEyeIcon />
          </Box>
          <Box
            sx={styles?.actionBtn}
            onClick={() => {
              handleAction(getValue(), 'edit');
            }}
          >
            <EditYellowBgIcon />
          </Box>
          <Box
            sx={styles?.actionBtn}
            onClick={() => handleDeleteDeals(getValue())}
          >
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

      <Box></Box>

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
