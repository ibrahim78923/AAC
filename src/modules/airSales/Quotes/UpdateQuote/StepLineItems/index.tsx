import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { AddCircleSmallIcon, InfoIconBlueBg } from '@/assets/icons';
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
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { useUpdateAssociateProductMutation } from '@/services/airSales/deals/view-details/association';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { capitalizeFirstLetters } from '@/utils';

const StepLineItems = ({ openCreateProduct }: any) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedReward, setIsCheckedReward] = useState(false);

  const theme = useTheme();
  const router = useRouter();
  const methods: any = useForm({});

  let quoteId: any;
  if (router?.query?.data) {
    quoteId = router?.query?.data;
  }

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

  const [updateAssociateProduct] = useUpdateAssociateProductMutation();

  const handleQuantityChange = async ({
    productId,
    quantity,
    unitDiscount,
  }: {
    productId: number;
    quantity?: number;
    unitDiscount?: any;
  }) => {
    try {
      await updateAssociateProduct({
        id: productsData?.data?.dealId,
        body: {
          productId: productId,
          quantity: quantity,
          unitDiscount: unitDiscount,
        },
      })?.unwrap();
      enqueueSnackbar('Product Quantity Updated Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const lineItemsColumns: any = () => {
    return [
      {
        accessorFn: (row: any) => row?.name,
        id: 'productName',
        header: 'Product Name',
        isSortable: true,
        cell: (info: any) => capitalizeFirstLetters(info?.getValue()),
      },
      {
        accessorFn: (row: any) => row?.unitPrice ?? 'N/A',
        id: 'unitPrice',
        isSortable: true,
        header: 'Unit Price',
        cell: (info: any) => <>£ {info?.getValue()}</>,
      },
      {
        accessorFn: (row: any) => row?.products ?? 'N/A',
        id: 'quantity',
        isSortable: true,
        header: 'Quantity',
        cell: (info: any) => info?.row?.original?.quantity,
      },
      {
        accessorFn: (row: any) => row?.quantity ?? 'N/A',
        id: 'additionalQuantity',
        isSortable: true,
        header: 'Additional Quantity',
        cell: (info: any) => {
          return (
            <Box>
              <ButtonGroup>
                <Button
                  className="small"
                  color="inherit"
                  variant="outlined"
                  onClick={() => {
                    handleQuantityChange({
                      productId: info?.row?.original?._id,
                      quantity: info?.getValue() - 1,
                    });
                  }}
                >
                  <RemoveCircleOutline />
                </Button>
                <Button
                  className="small"
                  color="inherit"
                  variant="outlined"
                  disabled
                >
                  {info?.row?.original?.quantity}
                </Button>
                <Button
                  className="small"
                  color="inherit"
                  variant="outlined"
                  onClick={() => {
                    handleQuantityChange({
                      productId: info?.row?.original?._id,
                      quantity: info?.getValue() + 1,
                    });
                  }}
                >
                  <AddCircleOutline />
                </Button>
              </ButtonGroup>
            </Box>
          );
        },
      },
      {
        accessorFn: (row: any) => row?.unitDiscount ?? 'N/A',
        id: 'unitDiscount',
        isSortable: true,
        header: 'Unit Discount',
        cell: (info: any) => {
          return (
            <Box>
              <ButtonGroup>
                <Button
                  className="small"
                  color="inherit"
                  variant="outlined"
                  onClick={() => {
                    handleQuantityChange({
                      productId: info?.row?.original?._id,
                      unitDiscount: info?.getValue() - 1,
                    });
                  }}
                >
                  <RemoveCircleOutline />
                </Button>
                <Button
                  className="small"
                  color="inherit"
                  variant="outlined"
                  disabled
                >
                  {info?.row?.original?.unitDiscount}
                </Button>
                <Button
                  className="small"
                  color="inherit"
                  variant="outlined"
                  onClick={() => {
                    handleQuantityChange({
                      productId: info?.row?.original?._id,
                      unitDiscount: info?.getValue() + 1,
                    });
                  }}
                >
                  <AddCircleOutline />
                </Button>
              </ButtonGroup>
            </Box>
          );
        },
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
  };

  const discountsData = [
    { id: '1', label: 'Loyalty Discounts', value: '£ 20' },
    { id: '2', label: 'Voucher or gift card', value: '£ 10' },
    { id: '3', label: 'Total Redeemed Discounts', value: '£ 25' },
  ];
  const rewardsData = [
    { label: 'Cap', pts: '100pts' },
    { label: 'Diary', pts: '200pts' },
    { label: 'Pen', pts: '50pts' },
  ];
  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={8} md={12} sm={12} xs={12}>
          <Stack
            direction={{ md: 'row' }}
            justifyContent={'space-between'}
            gap={1}
            sx={{ my: 2 }}
          >
            <Typography variant="h4" sx={styles?.pageHeaderTitle}>
              Products
            </Typography>
            <Stack
              direction="row"
              sx={{ flexWrap: 'wrap' }}
              spacing={{ xs: 0, sm: '12px' }}
              gap={{ xs: 1, sm: 0 }}
            >
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
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                Add Products
              </Button>
            </Stack>
          </Stack>

          <TanstackTable
            columns={lineItemsColumns()}
            data={productsData?.data?.products}
          />
        </Grid>

        <Grid item lg={4} md={12} sm={12} xs={12}>
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
                <Box sx={styles?.vRow}>
                  <Box sx={styles?.bodyCell}>Total Redeemed Discount</Box>
                  <Box sx={styles?.bodyCellH}>£ 20</Box>
                </Box>
              </Box>

              <Box sx={styles?.voucherFooter}>
                <Box sx={styles?.fCell}>Total: </Box>
                <Box sx={styles?.bodyCellH}> £{FinalTotal}</Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* //new design added */}
        <Grid item xs={12} md={12} sm={12} lg={8}>
          <Box
            sx={{
              background: '#fff',
              border: `1px solid ${theme?.palette?.grey[700]}`,
              borderRadius: '8px',
            }}
          >
            <Box sx={{ background: theme?.palette?.grey[700], py: 2 }}>
              <Typography
                sx={{
                  textAlign: 'center',
                  color: theme?.palette?.slateBlue?.main,
                }}
                variant="h6"
              >
                Loyalty Discounts
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: 2, my: 2 }}>
              <Box>
                <Box
                  sx={{
                    color: theme?.palette?.grey[800],
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
                >
                  Loyalty Discounts Available for Williams
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    onChange={(event: any) =>
                      setIsChecked(event?.target?.checked)
                    }
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: theme?.palette?.grey[800] }}>
                      Rewards:{' '}
                    </Typography>
                    <Typography
                      sx={{ color: theme?.palette?.custom?.main, mx: 0.5 }}
                    >
                      2000pts = £2
                    </Typography>
                    <InfoIconBlueBg />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ mx: 5 }}>
                <Box
                  sx={{
                    color: theme?.palette?.grey[800],
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
                >
                  Available Rewards
                </Box>
                <Box>
                  {rewardsData?.map((item: any) => (
                    <>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox />
                        <Box sx={{ display: 'flex' }}>
                          <Typography
                            sx={{
                              fontSize: '14px',
                              color: theme?.palette?.blue?.dull_blue,
                            }}
                          >
                            {item?.label}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '14px',
                              color: theme?.palette?.custom?.main,
                              mx: '3px',
                            }}
                          >
                            {item?.pts}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  ))}
                </Box>
              </Box>
            </Box>
            <Box sx={{ mx: 2 }}>
              {isChecked && (
                <Box>
                  <FormProvider methods={methods}>
                    <RHFTextField
                      size="small"
                      required
                      name="name"
                      label="Enter Points you want to redeem"
                      placeholder="Enter here"
                    />
                  </FormProvider>
                </Box>
              )}
            </Box>
            <Box sx={{ mx: 2 }}>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: theme?.palette?.grey[800],
                }}
                variant="h5"
              >
                Vouchers and gift cards
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox />
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: theme?.palette?.blue?.dull_blue,
                  }}
                >
                  Rewards
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  onChange={(event: any) =>
                    setIsCheckedReward(event?.target?.checked)
                  }
                />
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: theme?.palette?.blue?.dull_blue,
                  }}
                >
                  gift card
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mx: 2 }}>
              {isCheckedReward && (
                <Box>
                  <FormProvider methods={methods}>
                    <RHFTextField
                      size="small"
                      required
                      name="name"
                      label="Enter Points you want to redeem"
                      placeholder="Enter here"
                    />
                  </FormProvider>
                </Box>
              )}
            </Box>
            <Divider sx={{ mx: 2 }} />
            <Box>
              {discountsData?.map((item: any) => (
                <Box
                  key={item?.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mx: 2,
                    my: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: theme?.palette?.blue?.dull_blue,
                    }}
                  >
                    {item?.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: theme?.palette?.blue?.dull_blue,
                    }}
                  >
                    {item?.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default StepLineItems;
