import {
  Box,
  Button,
  // Checkbox,
  // Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import {
  AddCircleSmallIcon,
  // InfoIconBlueBg
} from '@/assets/icons';
import { styles } from './StepLineItems.style';
// import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import useStepLineItems from './useStepLineItems';
import {
  // discountsData,
  lineItemsColumns,
  // rewardsData,
} from './StepLineItems.data';

const StepLineItems = (props: any) => {
  const { openCreateProduct, calculations } = props;

  const {
    setSearch,
    // isChecked,
    // setIsChecked,
    // isCheckedReward,
    // setIsCheckedReward,
    // methods,
    // theme,
    handleAction,
    handleDeleteDeals,
    productsData,
    handleQuantityChange,
  } = useStepLineItems(openCreateProduct);

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

        {/* // useable after some time */}
        {/* <Grid item xs={12} md={12} sm={12} lg={8}>
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
        </Grid> */}
      </Grid>
    </>
  );
};

export default StepLineItems;
