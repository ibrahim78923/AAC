import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box, Grid, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import {
  FormProvider,
  RHFAutocomplete,
  RHFDateRangePicker,
} from '@/components/ReactHookForm';
import { CustomChart } from '@/components/Chart';
import { usePurchaseOrderReports } from './usePurchaseOrdersReports';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { pxToRem } from '@/utils/getFontValue';
import {
  purchaseOrderReportsTableColumns,
  purchaseOrderTableFilterOptions,
} from './PurchaseOrdersReports.data';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import NoData from '@/components/NoData';
import { AIR_SERVICES_REPORTS_PURCHASE_ORDER_PERMISSIONS } from '@/constants/permission-keys';
import { AIR_SERVICES } from '@/constants/routes';
import { ItemChipCard } from '@/components/Cards/ItemChipCard/ItemChipCard';
import { ApiPollingButton } from '@/components/Buttons/ApiPollingButton';
import { DownloadButton } from '@/components/Buttons/DownloadButton';
import { AUTO_REFRESH_API_TIME_INTERVAL } from '@/config';

export const PurchaseOrdersReports = () => {
  const {
    router,
    handleDownload,
    loading,
    methods,
    onDateFilterSubmit,
    downloadRef,
    isLoading,
    isFetching,
    isError,
    refetch,
    setHasDate,
    shouldDateSet,
    purchaseOrderReportsChartsData,
    purchaseOrderReportsCardsData,
    purchaseOrderData,
    getValues,
    apiCallInProgress,
    fulfilledTimeStamp,
  } = usePurchaseOrderReports();

  if (isError)
    return (
      <>
        <PageTitledHeader
          title={'Purchase Order Reports'}
          canMovedBack
          moveBack={() =>
            router?.push({
              pathname: AIR_SERVICES?.REPORTS,
            })
          }
        />
        <ApiErrorState canRefresh refresh={refetch} />;
      </>
    );

  return (
    <>
      <PageTitledHeader
        title={'Purchase Order Reports'}
        canMovedBack
        moveBack={() =>
          router?.push({
            pathname: AIR_SERVICES?.REPORTS,
          })
        }
      >
        <ApiPollingButton
          showLoader={apiCallInProgress}
          onClick={refetch}
          isSmall={false}
          customStyles={{
            cursor: 'pointer',
            height: pxToRem(40),
            marginTop: pxToRem(-10),
          }}
          intervalTime={AUTO_REFRESH_API_TIME_INTERVAL?.REPORTS}
          isFetching={isFetching}
          fulfilledTimeStamp={fulfilledTimeStamp}
        />
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_REPORTS_PURCHASE_ORDER_PERMISSIONS?.FILTER,
          ]}
        >
          <FormProvider methods={methods}>
            <RHFDateRangePicker
              name={'createdDate'}
              placeholder={'Date'}
              size="small"
              disabled={loading || isLoading || isFetching}
              hasButton
              onSubmitBtnClick={(setAnchorElDate: any) =>
                onDateFilterSubmit?.(setAnchorElDate)
              }
              onSubmitBtnDisable={
                !getValues?.('createdDate')?.startDate && true
              }
              cancelBtnEffect={() => setHasDate?.(false)}
              closePopOver={() => shouldDateSet?.()}
            />
          </FormProvider>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_REPORTS_PURCHASE_ORDER_PERMISSIONS?.DOWNLOAD,
          ]}
        >
          <DownloadButton
            handleDownload={handleDownload}
            disabled={loading || isLoading || isFetching}
            loading={loading}
          />
        </PermissionsGuard>
      </PageTitledHeader>

      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : (
        <PermissionsGuard
          permissions={[AIR_SERVICES_REPORTS_PURCHASE_ORDER_PERMISSIONS?.VIEW]}
        >
          <Box ref={downloadRef}>
            <Grid container spacing={1.5} mb={2}>
              {Object?.entries(purchaseOrderReportsCardsData)?.map(
                ([key, value]: any) => (
                  <Grid item xs={12} md={6} lg={3} key={key}>
                    <ItemChipCard itemName={key} chipLabel={value} />
                  </Grid>
                ),
              )}
            </Grid>
            <Grid container spacing={1.5}>
              <Grid item xs={12} lg={4}>
                <Box
                  height={'100%'}
                  boxShadow={1}
                  border={'1px solid'}
                  borderColor={'custom.off_white_one'}
                  borderRadius={2}
                  px={2}
                  py={1.5}
                >
                  <Typography mb={2} variant={'h5'} color={'slateBlue.main'}>
                    Purchase Orders Distribution
                  </Typography>
                  {Object?.values(purchaseOrderReportsChartsData ?? {})?.some(
                    (value) => value !== 0,
                  ) ? (
                    <CustomChart
                      type={'pie'}
                      series={Object?.values(
                        purchaseOrderReportsChartsData ?? {},
                      )}
                      options={{
                        labels: Object?.keys(
                          purchaseOrderReportsChartsData ?? {},
                        ),
                        dataLabels: {
                          enabled: true,
                        },
                      }}
                    />
                  ) : (
                    <NoData height="100%" />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} lg={8}>
                <Box
                  boxShadow={1}
                  border={'1px solid'}
                  borderColor={'custom.off_white_one'}
                  borderRadius={2}
                  px={2}
                  py={2}
                  height={'100%'}
                >
                  <FormProvider methods={methods}>
                    <Grid container mb={1}>
                      <Grid item xs={12} md={4}>
                        <RHFAutocomplete
                          name={'status'}
                          placeholder={'Select Option'}
                          size="small"
                          disableClearable
                          options={purchaseOrderTableFilterOptions}
                          disabled={loading}
                          getOptionLabel={(option: AutocompleteOptionsI) =>
                            option?.label
                          }
                        />
                      </Grid>
                    </Grid>
                  </FormProvider>
                  <TanstackTable
                    data={
                      purchaseOrderData?.[
                        `${getValues?.('status')?.value}Details`
                      ]?.slice(-5) ?? []
                    }
                    columns={purchaseOrderReportsTableColumns}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </PermissionsGuard>
      )}
    </>
  );
};
