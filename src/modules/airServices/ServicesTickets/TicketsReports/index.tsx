import { Box, Divider, Grid } from '@mui/material';
import { TicketsReportCard } from './TicketsReportCard';
import { cardOptions } from './TicketsReport.data';
import { useTicketsReport } from './useTicketsReport';
import { TicketsReportChart } from './TicketsReportChart';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import { DownloadLargeIcon } from '@/assets/icons';
import { FormProvider, RHFDateRangePicker } from '@/components/ReactHookForm';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_REPORTS_TICKETS_PERMISSIONS } from '@/constants/permission-keys';
import { pxToRem } from '@/utils/getFontValue';
import { LoadingButton } from '@mui/lab';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { htmlToPdfConvert } from '@/utils/file';

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
              cancelBtnEffect={() => setHasDate?.(false)}
              closePopOver={() => shouldDateSet?.()}
            />
          </FormProvider>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[AIR_SERVICES_REPORTS_TICKETS_PERMISSIONS?.DOWNLOAD]}
        >
          <LoadingButton
            sx={{
              cursor: 'pointer',
              p: 0,
              minWidth: pxToRem(40),
              height: pxToRem(40),
              marginTop: pxToRem(-10),
            }}
            variant={'outlined'}
            color={'inherit'}
            size={'small'}
            onClick={() => htmlToPdfConvert?.(downloadRef, 'Ticket_Report')}
            disabled={isLoading || isFetching || isError}
          >
            <DownloadLargeIcon />
          </LoadingButton>
        </PermissionsGuard>
      </PageTitledHeader>

      <Divider />

      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : isError ? (
        <ApiErrorState canRefresh refresh={() => refetch?.()} />
      ) : (
        <PermissionsGuard
          permissions={[AIR_SERVICES_REPORTS_TICKETS_PERMISSIONS?.VIEW]}
        >
          <Box ref={downloadRef}>
            <Grid container spacing={2} my={2}>
              {cardOptions?.(data?.data)?.map((item: any) => (
                <Grid item xs={12} md={6} lg={3} key={item?.id}>
                  <TicketsReportCard
                    label={item.label}
                    chipValue={item.chipValue}
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
