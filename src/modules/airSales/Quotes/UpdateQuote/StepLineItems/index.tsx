import React, { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { AddCircleSmallIcon } from '@/assets/icons';
import { styles } from './StepLineItems.style';
import { EditYellowBgIcon, ViewEyeIcon, TrashIcon } from '@/assets/icons';
import {
  useDeleteProductsMutation,
  useGetQuoteByIdQuery,
  useGetTaxCalculationsQuery,
} from '@/services/airSales/quotes';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

const StepLineItems = ({ openCreateProduct }: any) => {
  const router = useRouter();
  let quoteId: any;
  if (router?.query?.data) {
    quoteId = router?.query?.data;
  }
  //  const { data: dataGetQuoteById } = useGetQuoteByIdQuery({ id: quoteId });

  // const param = {
  //   applyOn: 'quotes',
  // };
  // const { data: taxCalculation } = useGetTaxCalculationsQuery(param);
  // const [search, setSearch] = useState('');

  // // const { data } = router?.query;

  // const taxCalculationPerc = taxCalculation?.data?.taxCalculations;
  // const gettingDiscount = dataGetQuoteById?.data?.products[0]?.unitDiscount;

  // const { data: productsData } = useGetQuoteByIdQuery({
  //   id: quoteId,
  //   ...(search && { productSearchKeyword: search }),
  // });
  // const sum = productsData?.data?.products?.reduce(
  //   (accumulator: any, currentValue: any) =>
  //     accumulator + currentValue?.unitPrice * currentValue?.quantity,
  //   0,
  // );

  // const totalDisc = productsData?.data?.products?.reduce(
  //   (accumulator: any, currentValue: any) =>
  //     accumulator + (currentValue?.unitPrice * currentValue?.quantity) / 100,
  //   0,
  // );

  // const unitDiscount = productsData?.data?.products?.reduce(
  //   (accumulator: any, currentValue: any) =>
  //     accumulator + currentValue?.unitDiscount * currentValue?.quantity,
  //   0,
  // );
  // let totalPercentage = 0;
  // if (taxCalculationPerc && Array.isArray(taxCalculationPerc)) {
  //   for (const tax of taxCalculationPerc) {
  //     totalPercentage += tax.percentage;
  //   }
  // }
  // const percentageOfSubtotal = sum * (totalPercentage / 100);
  // const FinalTotal = percentageOfSubtotal - gettingDiscount;

  const { data: dataGetQuoteById } = useGetQuoteByIdQuery({ id: quoteId });
  const param = {
    applyOn: 'quotes',
  };
  const { data: taxCalculation } = useGetTaxCalculationsQuery(param);
  const [search, setSearch] = useState('');

  const taxCalculationPerc = taxCalculation?.data?.taxCalculations;
  const gettingDiscount = dataGetQuoteById?.data?.products[0]?.unitDiscount;

  const { data: productsData } = useGetQuoteByIdQuery({
    id: quoteId,
    ...(search && { productSearchKeyword: search }),
  });
  const sum = productsData?.data?.products?.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator + (currentValue?.unitPrice * currentValue?.quantity || 0),
    0,
  );

  const unitDiscount = productsData?.data?.products?.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator + (currentValue?.unitDiscount * currentValue?.quantity || 0),
    0,
  );
  let totalPercentage = 0;
  if (taxCalculationPerc && Array.isArray(taxCalculationPerc)) {
    for (const tax of taxCalculationPerc) {
      totalPercentage += tax.percentage;
    }
  }
  const percentageOfSubtotal = sum * (totalPercentage / 100);

  const discount = isNaN(gettingDiscount) ? 0 : gettingDiscount;

  const subtotal = isNaN(sum) ? 0 : sum;

  const totalDisc = subtotal * (unitDiscount / 100);

  let FinalTotal;
  if (!isNaN(percentageOfSubtotal) && !isNaN(discount)) {
    FinalTotal = (percentageOfSubtotal - discount).toFixed(2);
  } else {
    FinalTotal = 'N/A';
  }

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
    router.push(
      `?data=${quoteId}${
        action === 'create' ? '' : `&productId=${id}`
      }&type=${action}`,
    );
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
      accessorFn: (row: any) => row?.unitPrice * row?.quantity ?? 'N/A',
      id: 'totalPrice',
      isSortable: true,
      header: 'Total Price',
      cell: (info: any) => <>£ {info?.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row?.createdAt ?? 'N/A',
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: ({ _id }: { _id: string }) => _id,
      id: '_id',
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
            <Search
              placeholder="Search Here"
              setSearchBy={(value: string) => setSearch(value)}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleSmallIcon />}
              onClick={() => {
                handleAction('', 'create');
              }}
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
            <Box sx={styles?.vHeadCell}>£{sum}</Box>
          </Box>

          <Box sx={styles?.voucherBody}>
            <Box sx={styles?.vRow}>
              <Box sx={styles?.bodyCell}>
                {taxCalculationPerc?.map((item: any) => {
                  return item?.name;
                })}
              </Box>
              <Box sx={styles?.bodyCellH}>{totalPercentage}</Box>
            </Box>
            <Box sx={styles?.vRow}>
              <Box sx={styles?.bodyCell}>Unit Discount</Box>
              <Box sx={styles?.bodyCellH}>£ {unitDiscount}</Box>
            </Box>
            <Box sx={styles?.vRow}>
              <Box sx={styles?.bodyCell}>Total Discount</Box>
              <Box sx={styles?.bodyCellH}>£ {totalDisc?.toFixed(2)}</Box>
            </Box>
          </Box>

          <Box sx={styles?.voucherFooter}>
            <Box sx={styles?.fCell}>Total: </Box>
            <Box sx={styles?.bodyCellH}> £{FinalTotal}</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default StepLineItems;
