import {
  Box,
  Button,
  Checkbox,
  Divider,
  // Checkbox,
  // Divider,
  Grid,
  Skeleton,
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

const StepLineItems = (props: any) => {
  const { openCreateProduct, calculations } = props;

  const {
    setSearch,
    isChecked,
    setIsChecked,
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
    loadingSingleTierDetails,
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
    discountsData,
    updateSubTotal,
    setDiscountVoucherValue,
    setUpdateSubTotal,
    discountVoucherValue,
    setInputValueDiscount,
  } = useStepLineItems(openCreateProduct, calculations);

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
                    <Box sx={styles?.bodyCellH}>{item?.amount}</Box>
                  </Box>
                ))}
                <Box sx={styles?.voucherFooter}>
                  <Box sx={styles?.fCell}>Total: </Box>
                  <Box sx={styles?.bodyCellH}> £{calculations?.finalTotal}</Box>
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
                Loyalty Discounts {updateSubTotal}
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
                      {ConsumerTotalPointsValue}pts = £
                      {ExchangeRate?.data?.calculatedExchangeRate}
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
                  {/* {rewardsData?.map((item: any) => (
                    <Box key={item?.label}>
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
                    </Box>
                  ))} */}
                  {loadingSingleTierDetails ? (
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  ) : (
                    singleTierDetails?.data?.map((item: any) => (
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
                    ))
                  )}
                </Box>
              </Box>
            </Box>
            {/* <Box sx={{ mx: 2 }}>
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
            </Box> */}
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
                  checked={checkedIs.giftBox}
                  onChange={(event: any) => {
                    setCheckedIs({
                      ...checkedIs,
                      giftBox: event?.target?.checked,
                    });
                    if (!isChecked) {
                      // Call the function to update the state and set the value to 0
                      setInputValueDiscount(0);
                      setInputValue('');
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
                  <Box>
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
                        <b>Current Amount:- </b>
                        {giftCardData?.data?.currentamount - inputValueDiscount}
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
                  onChange={(event: any) => {
                    setCheckedIs({
                      ...checkedIs,
                      voucher: event?.target?.checked,
                    });
                    if (!isChecked) {
                      // Call the function to update the state and set the value to 0
                      setDiscountVoucherValue(0);
                      setVoucherInputValue('');
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
                    £ {item?.value}
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
