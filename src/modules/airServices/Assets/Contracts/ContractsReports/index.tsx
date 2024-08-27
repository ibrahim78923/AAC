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
import { Box, Divider, Grid, Typography } from '@mui/material';

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
    isSuccess,
    data,
  } = useContractReports();
  return (
    <>
      <FormProvider methods={methods}>
        <PageTitledHeader
          title={'Contract'}
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
                  disabled={loading}
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
                disabled={loading}
                loading={loading}
              >
                <DownloadLargeIcon />
              </LoadingButton>
            </PermissionsGuard>
          </Box>
        </PageTitledHeader>
        <Divider />
        <Box ref={downloadRef}>
          {isLoading || isFetching ? (
            <SkeletonTable />
          ) : isError ? (
            <ApiErrorState canRefresh refresh={() => refetch?.()} />
          ) : (
            <PermissionsGuard
              permissions={[AIR_SERVICES_REPORTS_CONTRACT_PERMISSIONS?.VIEW]}
            >
              <Box id={'contract-reports'}>
                <ContractReportsCard
                  contractReportsCardData={contractReportsCardData}
                />

                <Grid container spacing={2} mt={2}>
                  <Grid item xs={12} md={4}>
                    <Box
                      height={'45vh'}
                      boxShadow={1}
                      border={'1px solid'}
                      borderColor={'custom.off_white_one'}
                      borderRadius={2}
                      px={2}
                      py={3}
                    >
                      <Typography
                        mb={2}
                        variant={'h5'}
                        color={'slateBlue.main'}
                      >
                        Contracts Distribution
                      </Typography>
                      {!!Object?.keys(contractReportsChartData ?? {})
                        ?.length ? (
                        <CustomChart
                          type={'pie'}
                          series={Object?.values(
                            contractReportsChartData ?? {},
                          )}
                          options={{
                            labels: Object?.keys(
                              contractReportsChartData ?? {},
                            ),
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
                      py={3}
                      height={'100%'}
                    >
                      <Grid container mb={1}>
                        <Grid item xs={3}>
                          <RHFAutocomplete
                            name={'contracts'}
                            placeholder={'All Contracts'}
                            disabled={loading}
                            options={contractsTypeOptions}
                            getOptionLabel={(option: any) => option?.label}
                          />
                        </Grid>
                      </Grid>
                      <TanstackTable
                        data={data?.data?.allContractDetails?.slice(0, 10)}
                        columns={contractReportsTabelCoulmns}
                        isLoading={isLoading}
                        isError={isError}
                        isFetching={isFetching}
                        isSuccess={isSuccess}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </PermissionsGuard>
          )}
        </Box>
      </FormProvider>
    </>
  );
};
