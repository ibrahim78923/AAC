import { PageTitledHeader } from '@/components/PageTitledHeader';
import { SoftwareReportsCards } from './SoftwareReportsCards';
import { Box, Grid, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { DownloadLargeIcon } from '@/assets/icons';
import {
  FormProvider,
  RHFAutocomplete,
  RHFDateRangePicker,
} from '@/components/ReactHookForm';
import { CustomChart } from '@/components/Chart';
import { useSoftwareReports } from './useSoftwareReports';
import { AIR_SERVICES_REPORTS_SOFTWARE_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { LoadingButton } from '@mui/lab';
import { pxToRem } from '@/utils/getFontValue';
import { softwareStatusReportsOptions } from './SoftwareReports.data';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import NoData from '@/components/NoData';
import { AIR_SERVICES } from '@/constants/routes';

export const SoftwareReports = () => {
  const {
    router,
    handleDownload,
    loading,
    softwareReportsCardsData,
    methods,
    softwareReportsTableColumns,
    softwareReportsChartsData,
    downloadRef,
    isLoading,
    isFetching,
    isError,
    refetch,
    setHasDate,
    shouldDateSet,
    data,
    onDateFilterSubmit,
    getValues,
  } = useSoftwareReports();

  if (isError)
    return (
      <>
        <PageTitledHeader
          title={'Software Reports'}
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
    <FormProvider methods={methods}>
      <PageTitledHeader
        title={'Software Reports'}
        canMovedBack
        moveBack={() =>
          router?.push({
            pathname: AIR_SERVICES?.REPORTS,
          })
        }
      >
        <PermissionsGuard
          permissions={[AIR_SERVICES_REPORTS_SOFTWARE_PERMISSIONS?.FILTER]}
        >
          <Box>
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
          </Box>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[AIR_SERVICES_REPORTS_SOFTWARE_PERMISSIONS?.DOWNLOAD]}
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
            disabled={loading || isLoading || isFetching}
            loading={loading}
          >
            <DownloadLargeIcon />
          </LoadingButton>
        </PermissionsGuard>
      </PageTitledHeader>
      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : (
        <PermissionsGuard
          permissions={[AIR_SERVICES_REPORTS_SOFTWARE_PERMISSIONS?.VIEW]}
        >
          <Box ref={downloadRef}>
            <SoftwareReportsCards
              softwareReportsCardsData={softwareReportsCardsData}
            />
            <Grid container spacing={1.5}>
              <Grid item xs={12} lg={5}>
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
                    Software Distribution
                  </Typography>
                  {Object?.values(softwareReportsChartsData ?? {})?.some(
                    (value) => value !== 0,
                  ) ? (
                    <CustomChart
                      type={'pie'}
                      series={Object?.values(softwareReportsChartsData ?? {})}
                      options={{
                        labels: Object?.keys(softwareReportsChartsData ?? {}),
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
              <Grid item xs={12} lg={7}>
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
                          placeholder={'Select option'}
                          size="small"
                          disableClearable
                          options={softwareStatusReportsOptions}
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
                      data?.data?.[`${getValues?.('status')?._id}Details`]
                        ?.slice?.(-5)
                        ?.reverse() ?? []
                    }
                    columns={softwareReportsTableColumns}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </PermissionsGuard>
      )}
    </FormProvider>
  );
};
