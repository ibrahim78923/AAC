import CommonDrawer from '@/components/CommonDrawer';

import useBuyNewNumber from './useBuyNewNumber';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import { newNumberArray, numberDetails } from './BuyNewNumber.data';
import { style } from './BuyNewNumber.style';
import { AIR_CALL_CENTER_SETTING_CHANNELS_PHONE_NUMBER_PERMISSION } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const BuyNewNumberDrawer = (props: any) => {
  const {
    isNumberDetail,
    handleNextDetail,
    setIsNumberDetail,
    isEditNumber,
    serIsEditNumber,
    handleSubmit,
    onSubmit,
    isBuyNewNumber,
    setIsBuyNewNumber,
    methods,
    theme,
    value,

    handleChange,
  } = useBuyNewNumber(props);
  const buyNewNumberArray = newNumberArray(isEditNumber, serIsEditNumber);
  return (
    <CommonDrawer
      isDrawerOpen={isBuyNewNumber}
      onClose={() => setIsBuyNewNumber(false)}
      title="Buy New Number"
      okText="Buy"
      isOk={isNumberDetail ? true : false}
      submitHandler={handleSubmit(onSubmit)}
      headerIcon={
        isNumberDetail ? (
          <ArrowBackIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => setIsNumberDetail(false)}
          />
        ) : (
          <></>
        )
      }
      footer
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Local" value={'Local'} />
          <Tab label="Tool-Free" value={'Tool-Free'} />
        </Tabs>
      </Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {buyNewNumberArray?.map((item: any) => (
            <>
              {item?.isNumberDatils?.includes(isNumberDetail) && (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  {item?.componentProps?.name === 'formType' && (
                    <Typography variant="body2" component="span">
                      Toll-Free
                    </Typography>
                  )}
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              )}
            </>
          ))}
        </Grid>
        {!isNumberDetail && (
          <PermissionsGuard
            permissions={[
              AIR_CALL_CENTER_SETTING_CHANNELS_PHONE_NUMBER_PERMISSION?.CHANNELS_PHONE_NUMBERS_BUY_A_NEW_NUMBER_SELECT_NUMBER,
            ]}
          >
            <Box>
              {numberDetails?.map((item: any) => (
                <Box
                  sx={style?.detailBoxWrapper(theme?.palette)}
                  key={item?.id}
                >
                  <Box display="flex" gap={2} alignItems="center">
                    <Box>
                      <Typography
                        variant="body3"
                        color={theme?.palette?.blue?.dull_blue}
                        fontWeight={500}
                      >
                        {item?.no}
                      </Typography>
                      <Typography
                        variant="body3"
                        color={theme?.palette?.custom?.light}
                        fontWeight={500}
                        component="p"
                      >
                        {item?.state}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body3"
                      color={theme?.palette?.blue?.dull_blue}
                      fontWeight={500}
                    >
                      {item?.ammount}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    className="small nextBtn"
                    onClick={handleNextDetail}
                  >
                    Next
                  </Button>
                </Box>
              ))}
            </Box>
          </PermissionsGuard>
        )}
      </FormProvider>
    </CommonDrawer>
  );
};

export default BuyNewNumberDrawer;
