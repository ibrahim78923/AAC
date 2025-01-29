import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { AddCircleSmallIcon, InfoIconBlueBg } from '@/assets/icons';
import { styles } from './StepLineItems.style';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import useStepLineItems from './useStepLineItems';
import { lineItemsColumns } from './StepLineItems.data';
import { v4 as uuidv4 } from 'uuid';
import { isNullOrEmpty } from '@/utils';
import { useEffect } from 'react';
import SkeletonComponent from '@/components/CardSkeletons';
import { GlobalSearchSuperAdminModules, indexNumbers } from '@/constants';

const StepLineItems = (props: any) => {
  const { openCreateProduct, calculations, handleLoyalityCalulation } = props;

  const {
    setSearch,
    isChecked,
    checkedIs,
    setCheckedIs,
    methods,
    theme,
    handleAction,
    handleDeleteDeals,
    productsData,
    handleQuantityChange,
    ConsumerTotalPointsValue,
    ExchangeRate,
    singleTierDetails,
    handleCheckboxChange,
    checkedItems,
    setInputValue,
    inputValue,
    isErrorGiftCard,
    giftCardData,
    onSubmit,
    inputValueDiscount,
    handleInputChange,
    disabledButton,
    VoucherInputValue,
    setVoucherInputValue,
    isErrorVoucher,
    updateSubTotal,
    setDiscountVoucherValue,
    setUpdateSubTotal,
    discountVoucherValue,
    setInputValueDiscount,
    totalLoyaltyRewardsSum,
    // totalVoucherSum,
    totalSumDiscount,
    setVoucher,
    setGiftCard,
    Voucher,
    giftCard,
    loyaltyRewards,
    exchangeRateLoading,
    consumerDetailLoading,
    VoucherData,
  }: any = useStepLineItems(openCreateProduct, calculations);

  useEffect(() => {
    handleLoyalityCalulation(
      loyaltyRewards,
      Voucher,
      giftCard,
      totalSumDiscount,
      updateSubTotal,
    );
  }, [totalSumDiscount]);

  useEffect(() => {
    handleLoyalityCalulation(
      loyaltyRewards,
      Voucher,
      giftCard,
      totalSumDiscount,
      updateSubTotal,
    );
  }, [totalSumDiscount]);

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
            columns={lineItemsColumns(
              handleAction,
              handleDeleteDeals,
              handleQuantityChange,
            )}
            data={productsData?.data?.products}
          />
        </Grid>

        <Grid item lg={4} md={12} sm={12} xs={12}>
          <Box sx={styles?.voucherCont}>
            <Box sx={styles?.voucher}>
              <Box sx={styles?.voucherBody}>
                {calculations?.calculationsArray?.map((item: any) => (
                  <Box sx={styles?.vRow} key={item?.name}>
                    <Box sx={styles?.bodyCell}>{item?.name}</Box>
                    <Box sx={styles?.bodyCellH}>
                      {item?.name === GlobalSearchSuperAdminModules.TAX
                        ? item?.amount
                        : `£ ${item?.amount}`}
                    </Box>
                  </Box>
                ))}
                <Box sx={styles?.voucherFooter}>
                  <Box sx={styles?.fCell}>Total: </Box>
                  <Box sx={styles?.bodyCellH}>
                    {' '}
                    £ {calculations?.finalTotal}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

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

            {consumerDetailLoading ? (
              <SkeletonComponent numberOfSkeletons={2} />
            ) : (
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
                  {exchangeRateLoading ? (
                    <SkeletonComponent numberOfSkeletons={1} />
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', mt: 2 }}
                      >
                        <Typography sx={{ color: theme?.palette?.grey[800] }}>
                          Rewards:{' '}
                        </Typography>
                        <Typography
                          sx={{ color: theme?.palette?.custom?.main, mx: 0.5 }}
                        >
                          {ConsumerTotalPointsValue}pts = £
                          {ExchangeRate?.data?.calculatedExchangeRate}
                        </Typography>
                        <InfoIconBlueBg />
                      </Box>
                    </Box>
                  )}
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
                    {exchangeRateLoading ? (
                      <SkeletonComponent numberOfSkeletons={1} />
                    ) : singleTierDetails?.data?.length ===
                      indexNumbers?.ZERO ? (
                      <Typography
                        mt={1.5}
                        sx={{
                          color: theme?.palette?.grey[500],
                        }}
                      >
                        No Reward Available
                      </Typography>
                    ) : (
                      productsData?.data &&
                      singleTierDetails?.data?.map((item: any) => {
                        return (
                          <Box key={uuidv4()}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Checkbox
                                checked={!!checkedItems[item?._id]}
                                onChange={() => handleCheckboxChange(item)}
                              />
                              <Box sx={{ display: 'flex' }}>
                                <Typography
                                  sx={{
                                    fontSize: '14px',
                                    color: theme?.palette?.blue?.dull_blue,
                                  }}
                                >
                                  {item?.title}
                                </Typography>
                                {item?.requiredPoints && (
                                  <Typography
                                    sx={{
                                      fontSize: '14px',
                                      color: theme?.palette?.custom?.main,
                                      mx: '3px',
                                    }}
                                  >
                                    ({item?.requiredPoints} pts)
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </Box>
                        );
                      })
                    )}
                  </Box>
                </Box>
              </Box>
            )}
            <Box sx={{ mx: 2 }}>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: theme?.palette?.grey[800],
                }}
                variant="h5"
              >
                Vouchers and Gift cards
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  // checked={checkedIs.giftBox}
                  defaultChecked={checkedIs.giftBox}
                  onChange={(event: any) => {
                    setCheckedIs({
                      ...checkedIs,
                      giftBox: event?.target?.checked,
                    });
                    if (!isChecked) {
                      // Call the function to update the state and set the value to 0
                      setInputValueDiscount(0);
                      setInputValue('');
                      setGiftCard([]);
                      setUpdateSubTotal(
                        updateSubTotal + parseFloat(inputValueDiscount),
                      );
                    }
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: theme?.palette?.blue?.dull_blue,
                  }}
                >
                  Gift card
                </Typography>
              </Box>
              <Box sx={{ mx: 2 }}>
                {checkedIs?.giftBox && (
                  <Box component="form" onSubmit={onSubmit}>
                    <FormProvider methods={methods}>
                      <RHFTextField
                        size="small"
                        required
                        name="name"
                        label="Enter Gift Card Number"
                        placeholder="Enter here"
                        value={inputValue}
                        onChange={(e: any) => setInputValue(e.target.value)}
                      />
                    </FormProvider>
                  </Box>
                )}
                {isErrorGiftCard && (
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: theme?.palette?.error?.main,
                    }}
                  >
                    Gift Card Number not found
                  </Typography>
                )}
                {checkedIs?.giftBox &&
                  giftCardData &&
                  !isErrorGiftCard &&
                  !isNullOrEmpty(inputValue) && (
                    <>
                      <Typography sx={{ fontSize: '14px', marginY: '5px' }}>
                        <b>Current Amount: </b>
                        {inputValueDiscount ===
                        productsData?.data?.loyaltyGiftCards?.escrowAmount
                          ? productsData?.data?.loyaltyGiftCards?.currentamount
                          : giftCardData?.data?.currentamount}
                      </Typography>
                      <Box component="form" onSubmit={onSubmit}>
                        <TextField
                          size="small"
                          required
                          name="name"
                          // label="Enter Amount for Discount"
                          placeholder="Enter Amount for Discount"
                          value={inputValueDiscount}
                          onChange={handleInputChange}
                          sx={{ marginRight: '10px', width: '80%' }}
                        />
                        <Button
                          type="submit"
                          variant={'contained'}
                          className={'small'}
                          disabled={disabledButton}
                        >
                          Apply
                        </Button>
                      </Box>
                    </>
                  )}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  defaultChecked={checkedIs.voucher}
                  onChange={(event: any) => {
                    setCheckedIs({
                      ...checkedIs,
                      voucher: event?.target?.checked,
                    });
                    if (!isChecked) {
                      // Call the function to update the state and set the value to 0
                      setDiscountVoucherValue(0);
                      setVoucherInputValue('');
                      setVoucher([]);
                      setUpdateSubTotal(updateSubTotal + discountVoucherValue);
                    }
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: theme?.palette?.blue?.dull_blue,
                  }}
                >
                  Voucher
                </Typography>
              </Box>
              <Box sx={{ mx: 2 }}>
                {checkedIs?.voucher && (
                  <Box>
                    <FormProvider methods={methods}>
                      <RHFTextField
                        size="small"
                        required
                        name="name"
                        label="Enter Voucher Number"
                        placeholder="Enter here"
                        value={VoucherInputValue}
                        onChange={(e: any) =>
                          setVoucherInputValue(e.target.value)
                        }
                      />
                    </FormProvider>
                  </Box>
                )}
              </Box>
              {isErrorVoucher && (
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: theme?.palette?.error?.main,
                  }}
                >
                  Voucher not Available
                </Typography>
              )}
            </Box>
            <Divider sx={{ mx: 2 }} />
            <Box>
              <Box
                // key={item?.id}
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
                  Loyalty Discounts
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: theme?.palette?.blue?.dull_blue,
                  }}
                >
                  £ {totalLoyaltyRewardsSum?.toFixed(2)}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box
                // key={item?.id}
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
                  Gift Card
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: theme?.palette?.blue?.dull_blue,
                  }}
                >
                  £ {giftCard[0]?.value ?? 0}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box
                // key={item?.id}
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
                  Voucher{' '}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: theme?.palette?.grey[900],
                    }}
                  >
                    (
                    {!Voucher[0]?.value && !checkedIs.voucher
                      ? 0
                      : VoucherData?.data[0]?.percentageOff}
                    %)
                  </Typography>
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: theme?.palette?.blue?.dull_blue,
                  }}
                >
                  £ {Voucher[0]?.value?.toFixed(2) ?? 0}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box
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
                  Total Redeemed Discounts
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: theme?.palette?.blue?.dull_blue,
                  }}
                >
                  £{' '}
                  {totalSumDiscount === 0
                    ? inputValueDiscount +
                      (productsData?.data?.loyaltyVouchers?.percentageOff
                        ? updateSubTotal *
                          (productsData?.data?.loyaltyVouchers?.percentageOff /
                            100)
                        : 0)
                    : totalSumDiscount?.toFixed(2) ?? 0}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default StepLineItems;
