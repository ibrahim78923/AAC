import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import {
  FormProvider,
  RHFAutocomplete,
  RHFDateRangePicker,
} from '@/components/ReactHookForm';
import { CustomChart } from '@/components/Chart';
import { useSoftwareReports } from './useSoftwareReports';
import { AIR_SERVICES_REPORTS_SOFTWARE_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { pxToRem } from '@/utils/getFontValue';
import { softwareStatusReportsOptions } from './SoftwareReports.data';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import NoData from '@/components/NoData';
import { AIR_SERVICES } from '@/constants/routes';
import { ItemChipCard } from '@/components/Cards/ItemChipCard';
import { ApiPollingButton } from '@/components/Buttons/ApiPollingButton';
import { DownloadButton } from '@/components/Buttons/DownloadButton';
import { AUTO_REFRESH_API_TIME_INTERVAL } from '@/config';
import { DOWNLOAD_FILE_TYPE } from '@/constants/file';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const SoftwareReports = () => {
  const {
    router,
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
    apiCallInProgress,
    fulfilledTimeStamp,
  } = useSoftwareReports();

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
              permissions={[AIR_SERVICES_REPORTS_SOFTWARE_PERMISSIONS?.FILTER]}
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
                AIR_SERVICES_REPORTS_SOFTWARE_PERMISSIONS?.DOWNLOAD,
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
          permissions={[AIR_SERVICES_REPORTS_SOFTWARE_PERMISSIONS?.VIEW]}
        >
          <Box ref={downloadRef}>
            <ContainerGrid spacing={1.5}>
              {Object?.entries(softwareReportsCardsData)?.map(
                ([key, value]: any) => (
                  <CustomGrid lg={3} md={6} key={key}>
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
                  <FormProvider methods={methods}>
                    <ContainerGrid>
                      <CustomGrid md={4}>
                        <RHFAutocomplete
                          name={'status'}
                          placeholder={'Select option'}
                          size="small"
                          disableClearable
                          options={softwareStatusReportsOptions}
                          getOptionLabel={(option: AutocompleteOptionsI) =>
                            option?.label
                          }
                        />
                      </CustomGrid>
                    </ContainerGrid>
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
              </CustomGrid>
            </ContainerGrid>
          </Box>
        </PermissionsGuard>
      </ApiRequestFlow>
    </FormProvider>
  );
};
