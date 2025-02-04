import { Box } from '@mui/material';
import { cardOptions } from './TicketsReport.data';
import { useTicketsReport } from './useTicketsReport';
import { TicketsReportChart } from './TicketsReportChart';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider, RHFDateRangePicker } from '@/components/ReactHookForm';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_REPORTS_TICKETS_PERMISSIONS } from '@/constants/permission-keys';
import { pxToRem } from '@/utils/getFontValue';
import { AIR_SERVICES } from '@/constants/routes';
import { ItemChipCard } from '@/components/Cards/ItemChipCard';
import { DownloadButton } from '@/components/Buttons/DownloadButton';
import { ApiPollingButton } from '@/components/Buttons/ApiPollingButton';
import { AUTO_REFRESH_API_TIME_INTERVAL } from '@/config';
import { DOWNLOAD_FILE_TYPE } from '@/constants/file';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const TicketsReports = () => {
  const {
    router,
    methods,
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
    downloadRef,
    setHasDate,
    shouldDateSet,
    onDateFilterSubmit,
    getValues,
    apiCallInProgress,
    fulfilledTimeStamp,
  } = useTicketsReport();

  return (
    <>
      <PageTitledHeader
        title={'Tickets'}
        canMovedBack
        moveBack={() => {
          router?.push(AIR_SERVICES?.REPORTS);
        }}
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
              permissions={[AIR_SERVICES_REPORTS_TICKETS_PERMISSIONS?.FILTER]}
            >
              <FormProvider methods={methods}>
                <RHFDateRangePicker
                  name={'createdDate'}
                  placeholder={'Date'}
                  size={'small'}
                  disabled={isLoading || isFetching || isError}
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
              permissions={[AIR_SERVICES_REPORTS_TICKETS_PERMISSIONS?.DOWNLOAD]}
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
          permissions={[AIR_SERVICES_REPORTS_TICKETS_PERMISSIONS?.VIEW]}
        >
          <Box ref={downloadRef}>
            <ContainerGrid spacing={1.5}>
              {cardOptions?.(data?.data)?.map((item: any) => (
                <CustomGrid md={6} lg={3} key={item?.id}>
                  <ItemChipCard
                    itemName={item.label}
                    chipLabel={item.chipValue}
                  />
                </CustomGrid>
              ))}
            </ContainerGrid>
            <br />
            <TicketsReportChart chartData={data?.data?.ticketMonthlyCount} />
          </Box>
        </PermissionsGuard>
      </ApiRequestFlow>
    </>
  );
};
