import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import { Box, Grid, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { DownloadLargeIcon } from '@/assets/icons';
import {
  FormProvider,
  RHFAutocomplete,
  RHFDateRangePicker,
} from '@/components/ReactHookForm';
import { CustomChart } from '@/components/Chart';
import { useInventoryReports } from './useInventoryReports';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { LoadingButton } from '@mui/lab';
import { pxToRem } from '@/utils/getFontValue';
import {
  inventoryColumns,
  inventoryTableFilterOptions,
} from './InventoryReports.data';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import NoData from '@/components/NoData';
import ReportsCards from './ReportsCards';
import { AIR_SERVICES_REPORTS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';

export const InventoryReports = () => {
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
    inventoryReportsChartsData,
    inventoryReportsCardsData,
    inventoryData,
  } = useInventoryReports();

  return (
    <>
      <PageTitledHeader
        title={'Inventory Reports'}
        canMovedBack
        moveBack={() =>
          router?.push({
            pathname: AIR_SERVICES?.REPORTS,
          })
        }
      >
        <PermissionsGuard
          permissions={[AIR_SERVICES_REPORTS_INVENTORY_PERMISSIONS?.FILTER]}
        >
          <FormProvider methods={methods}>
            <RHFDateRangePicker
              name={'createdDate'}
              placeholder={'Date'}
              size="small"
              disabled={loading}
              hasButton
              onSubmitBtnClick={(setAnchorElDate: any) =>
                onDateFilterSubmit?.(setAnchorElDate)
              }
              cancelBtnEffect={() => setHasDate?.(false)}
              closePopOver={() => shouldDateSet?.()}
            />
          </FormProvider>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[AIR_SERVICES_REPORTS_INVENTORY_PERMISSIONS?.DOWNLOAD]}
        >
          <LoadingButton
            sx={{
              cursor: 'pointer',
              p: 0,
              minWidth: pxToRem(40),
              height: pxToRem(40),
              marginTop: pxToRem(-10),
            }}
            variant="outlined"
            color="inherit"
            size="small"
            onClick={handleDownload}
            disabled={loading}
            loading={loading}
          >
            <DownloadLargeIcon />
          </LoadingButton>
        </PermissionsGuard>
      </PageTitledHeader>
      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : isError ? (
        <ApiErrorState canRefresh refresh={() => refetch?.()} />
      ) : (
        <PermissionsGuard
          permissions={[AIR_SERVICES_REPORTS_INVENTORY_PERMISSIONS?.VIEW]}
        >
          <Box ref={downloadRef}>
            <ReportsCards cardsData={inventoryReportsCardsData} />
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <Box
                  height={'100%'}
                  boxShadow={1}
                  border={'1px solid'}
                  borderColor={'custom.off_white_one'}
                  borderRadius={2}
                  px={2}
                  py={3}
                >
                  <Typography mb={2} variant={'h5'} color={'slateBlue.main'}>
                    Assets Distribution
                  </Typography>
                  {!!Object?.keys(inventoryReportsChartsData ?? {})?.length ? (
                    <CustomChart
                      type={'pie'}
                      series={Object?.values(inventoryReportsChartsData ?? {})}
                      options={{
                        labels: Object?.keys(inventoryReportsChartsData ?? {}),
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
                  py={3}
                  height={'100%'}
                >
                  <FormProvider methods={methods}>
                    <Grid container mb={1}>
                      <Grid item xs={12} md={4}>
                        <RHFAutocomplete
                          name={'status'}
                          placeholder={'Select Option'}
                          size="small"
                          options={inventoryTableFilterOptions}
                          disabled={loading}
                          getOptionLabel={(option: AutocompleteOptionsI) =>
                            option?.label
                          }
                        />
                      </Grid>
                    </Grid>
                  </FormProvider>
                  <TanstackTable
                    data={inventoryData}
                    columns={inventoryColumns}
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
