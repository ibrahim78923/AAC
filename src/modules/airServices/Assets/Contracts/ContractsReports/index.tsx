import { DownloadLargeIcon } from '@/assets/icons';
import { CustomChart } from '@/components/Chart';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import {
  FormProvider,
  RHFAutocomplete,
  RHFDateRangePicker,
} from '@/components/ReactHookForm';
import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_SERVICES } from '@/constants';
import { Box, Grid, Typography } from '@mui/material';

import { ContractReportsCard } from './ContractReportsCard';
import { useContractReports } from './useContractReports';
import {
  contractReportsTabelCoulmns,
  contractsTypeOptions,
} from './ContractReportsCard.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_REPORTS_CONTRACT_PERMISSIONS } from '@/constants/permission-keys';
import { LoadingButton } from '@mui/lab';
import { pxToRem } from '@/utils/getFontValue';
import NoData from '@/components/NoData';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';

export const ContractsReports = () => {
  const {
    router,
    methods,
    onDateFilterSubmit,
    handleDownload,
    loading,
    contractReportsCardData,
    setHasDate,
    shouldDateSet,
    contractReportsChartData,
    downloadRef,
    isLoading,
    isFetching,
    isError,
    refetch,
    data,
    getValues,
  } = useContractReports();

  if (isError)
    return (
      <>
        <PageTitledHeader
          title={'Contract Reports'}
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
      <FormProvider methods={methods}>
        <PageTitledHeader
          title={'Contract Reports'}
          canMovedBack
          moveBack={() => router?.push({ pathname: AIR_SERVICES?.REPORTS })}
        >
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            gap={2}
            flexWrap={'wrap'}
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            <PermissionsGuard
              permissions={[AIR_SERVICES_REPORTS_CONTRACT_PERMISSIONS?.FILTER]}
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
                  cancelBtnEffect={() => setHasDate?.(false)}
                  closePopOver={() => shouldDateSet?.()}
                />
              </Box>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_REPORTS_CONTRACT_PERMISSIONS?.DOWNLOAD,
              ]}
            >
              <LoadingButton
                sx={{
                  cursor: 'pointer',
                  p: 0,
                  minWidth: pxToRem(40),
                  height: pxToRem(40),
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
          </Box>
        </PageTitledHeader>

        {isLoading || isFetching ? (
          <SkeletonTable />
        ) : (
          <PermissionsGuard
            permissions={[AIR_SERVICES_REPORTS_CONTRACT_PERMISSIONS?.VIEW]}
          >
            <Box ref={downloadRef}>
              <ContractReportsCard
                contractReportsCardData={contractReportsCardData}
              />

              <Grid container spacing={1.5}>
                <Grid item xs={12} md={4}>
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
                      Contracts Distribution
                    </Typography>
                    {!!Object?.keys(contractReportsChartData ?? {})?.length ? (
                      <CustomChart
                        type={'pie'}
                        series={Object?.values(contractReportsChartData ?? {})}
                        options={{
                          labels: Object?.keys(contractReportsChartData ?? {}),
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
                <Grid item xs={12} md={8}>
                  <Box
                    boxShadow={1}
                    border={'1px solid'}
                    borderColor={'custom.off_white_one'}
                    borderRadius={2}
                    px={2}
                    py={2}
                    height={'100%'}
                  >
                    <Grid container mb={1}>
                      <Grid item xs={12} md={4}>
                        <RHFAutocomplete
                          name={'contracts'}
                          placeholder={'All Contracts'}
                          size="small"
                          disabled={loading}
                          options={contractsTypeOptions}
                          getOptionLabel={(option: any) => option?.label}
                        />
                      </Grid>
                    </Grid>
                    <TanstackTable
                      data={
                        data?.data?.[
                          `${getValues?.('contracts')?._id}Details`
                        ]?.slice(-5) ?? []
                      }
                      columns={contractReportsTabelCoulmns}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </PermissionsGuard>
        )}
      </FormProvider>
    </>
  );
};
