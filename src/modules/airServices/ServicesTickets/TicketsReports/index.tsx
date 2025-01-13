import { Box, Grid } from '@mui/material';
import { cardOptions } from './TicketsReport.data';
import { useTicketsReport } from './useTicketsReport';
import { TicketsReportChart } from './TicketsReportChart';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider, RHFDateRangePicker } from '@/components/ReactHookForm';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_REPORTS_TICKETS_PERMISSIONS } from '@/constants/permission-keys';
import { pxToRem } from '@/utils/getFontValue';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { AIR_SERVICES } from '@/constants/routes';
import { ItemChipCard } from '@/components/Cards/ItemChipCard/ItemChipCard';
import { DownloadButton } from '@/components/Buttons/DownloadButton';
import { ApiPollingButton } from '@/components/Buttons/ApiPollingButton';
import { AUTO_REFRESH_API_TIME_INTERVAL } from '@/config';

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
    handleDownload,
    loading,
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
            handleDownload={handleDownload}
            disabled={loading || isLoading || isFetching}
            loading={loading}
          />
        </PermissionsGuard>
      </PageTitledHeader>
      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : isError ? (
        <ApiErrorState canRefresh refresh={() => refetch?.()} />
      ) : (
        <PermissionsGuard
          permissions={[AIR_SERVICES_REPORTS_TICKETS_PERMISSIONS?.VIEW]}
        >
          <Box ref={downloadRef}>
            <Grid container spacing={1.5} mb={2}>
              {cardOptions?.(data?.data)?.map((item: any) => (
                <Grid item xs={12} md={6} lg={3} key={item?.id}>
                  <ItemChipCard
                    itemName={item.label}
                    chipLabel={item.chipValue}
                  />
                </Grid>
              ))}
            </Grid>
            <TicketsReportChart chartData={data?.data?.ticketMonthlyCount} />
          </Box>
        </PermissionsGuard>
      )}
    </>
  );
};
