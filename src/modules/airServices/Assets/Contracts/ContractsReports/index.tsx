import { CustomChart } from '@/components/Chart';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import {
  FormProvider,
  RHFAutocomplete,
  RHFDateRangePicker,
} from '@/components/ReactHookForm';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Typography } from '@mui/material';
import { useContractReports } from './useContractReports';
import {
  contractReportsTableColumns,
  contractsTypeOptions,
} from './ContractReportsCard.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_REPORTS_CONTRACT_PERMISSIONS } from '@/constants/permission-keys';
import { pxToRem } from '@/utils/getFontValue';
import NoData from '@/components/NoData';
import { AIR_SERVICES } from '@/constants/routes';
import { ItemChipCard } from '@/components/Cards/ItemChipCard/ItemChipCard';
import { ApiPollingButton } from '@/components/Buttons/ApiPollingButton';
import { DownloadButton } from '@/components/Buttons/DownloadButton';
import { AUTO_REFRESH_API_TIME_INTERVAL } from '@/config';
import { DOWNLOAD_FILE_TYPE } from '@/constants/file';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const ContractsReports = () => {
  const {
    router,
    methods,
    onDateFilterSubmit,
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
    apiCallInProgress,
    fulfilledTimeStamp,
  } = useContractReports();

  return (
    <FormProvider methods={methods}>
      <PageTitledHeader
        title={'Contract Reports'}
        canMovedBack
        moveBack={() => router?.push({ pathname: AIR_SERVICES?.REPORTS })}
      >
        {isError ? (
          <></>
        ) : (
          <>
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
              permissions={[AIR_SERVICES_REPORTS_CONTRACT_PERMISSIONS?.FILTER]}
            >
              <Box>
                <RHFDateRangePicker
                  name={'createdDate'}
                  placeholder={'Date'}
                  size="small"
                  disabled={isLoading || isFetching}
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
              permissions={[
                AIR_SERVICES_REPORTS_CONTRACT_PERMISSIONS?.DOWNLOAD,
              ]}
            >
              <DownloadButton
                disabled={isLoading || isFetching}
                downloadRef={downloadRef}
                downloadFileType={DOWNLOAD_FILE_TYPE?.PDF}
              />
            </PermissionsGuard>
          </>
        )}
      </PageTitledHeader>

      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={SKELETON_TYPES?.LARGE_VERTICAL_TWO_LAYER_DOUBLE_CARD}
      >
        <PermissionsGuard
          permissions={[AIR_SERVICES_REPORTS_CONTRACT_PERMISSIONS?.VIEW]}
        >
          <Box ref={downloadRef}>
            <ContainerGrid spacing={1.5}>
              {Object?.entries(contractReportsCardData)?.map(
                ([key, value]: any) => (
                  <CustomGrid md={6} lg={3} key={key}>
                    <ItemChipCard itemName={key} chipLabel={value} />
                  </CustomGrid>
                ),
              )}
            </ContainerGrid>
            <br />
            <ContainerGrid spacing={1.5}>
              <CustomGrid lg={4}>
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
                  {Object?.values(contractReportsChartData ?? {})?.some(
                    (value) => value !== 0,
                  ) ? (
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
              </CustomGrid>
              <CustomGrid lg={8}>
                <Box
                  boxShadow={1}
                  border={'1px solid'}
                  borderColor={'custom.off_white_one'}
                  borderRadius={2}
                  px={2}
                  py={2}
                  height={'100%'}
                >
                  <ContainerGrid mb={1}>
                    <CustomGrid md={4}>
                      <RHFAutocomplete
                        name={'contracts'}
                        placeholder={'All Contracts'}
                        size="small"
                        disableClearable
                        options={contractsTypeOptions}
                        getOptionLabel={(option: any) => option?.label}
                      />
                    </CustomGrid>
                  </ContainerGrid>
                  <TanstackTable
                    data={
                      data?.data?.[
                        `${getValues?.('contracts')?._id}Details`
                      ]?.slice(-5) ?? []
                    }
                    columns={contractReportsTableColumns}
                  />
                </Box>
              </CustomGrid>
            </ContainerGrid>
          </Box>
        </PermissionsGuard>
      </ApiRequestFlow>
    </FormProvider>
  );
};
