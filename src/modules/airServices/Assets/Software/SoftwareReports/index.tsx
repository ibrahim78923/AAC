import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
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

  if (isLoading || isFetching) return <SkeletonTable />;
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
    <>
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
          <FormProvider methods={methods}>
            <RHFDateRangePicker
              name={'createdDate'}
              placeholder={'Date'}
              size="small"
              disabled={loading}
              label={`\u00a0\u00a0`}
              hasButton
              onSubmitBtnClick={(setAnchorElDate: any) =>
                onDateFilterSubmit?.(setAnchorElDate)
              }
              labelProps={{ marginBottom: 0 }}
              cancelBtnEffect={() => setHasDate?.(false)}
              closePopOver={() => shouldDateSet?.()}
            />
          </FormProvider>
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
              marginTop: pxToRem(10),
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

      <PermissionsGuard
        permissions={[AIR_SERVICES_REPORTS_SOFTWARE_PERMISSIONS?.VIEW]}
      >
        <Box ref={downloadRef}>
          <SoftwareReportsCards
            softwareReportsCardsData={softwareReportsCardsData}
          />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} lg={5}>
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
                  Software Distribution
                </Typography>
                {!!Object?.keys(softwareReportsChartsData ?? {})?.length ? (
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
                py={3}
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
                    data?.data?.[`${getValues?.('status')?._id}Details`]?.slice(
                      -5,
                    ) ?? []
                  }
                  columns={softwareReportsTableColumns}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </PermissionsGuard>
    </>
  );
};
