import { Box, Divider, Grid } from '@mui/material';
import { TicketsReportCard } from './TicketsReportCard';
import { cardOptions } from './TicketsReport.data';
import { useTicketsReport } from './useTicketsReport';
import { TicketsReportChart } from './TicketsReportChart';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import { DownloadLargeIcon } from '@/assets/icons';
import {
  FormProvider,
  RHFAutocompleteAsync,
  RHFDateRangePicker,
} from '@/components/ReactHookForm';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_REPORTS_TICKETS_PERMISSIONS } from '@/constants/permission-keys';
import { pxToRem } from '@/utils/getFontValue';
import { LoadingButton } from '@mui/lab';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';

export const TicketsReports = () => {
  const {
    router,
    handleDownload,
    loading,
    methods,
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
    downloadRef,
    setHasDate,
    shouldDateSet,
    apiQueryAgents,
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
            <Box
              display={'flex'}
              gap={2}
              flexWrap={'wrap'}
              flexDirection={{ xs: 'column', sm: 'row' }}
              mt={1}
            >
              <Box flex={{ xs: 1, sm: 0.5 }}>
                <RHFDateRangePicker
                  name={'createdDate'}
                  placeholder={'Date'}
                  size={'small'}
                  disabled={loading || isLoading || isFetching || isError}
                  hasButton
                  onSubmitBtnClick={() => setHasDate?.(true)}
                  cancelBtnEffect={() => setHasDate?.(false)}
                  closePopOver={() => shouldDateSet?.()}
                />
              </Box>

              <Box flex={{ xs: 1, sm: 0.5 }}>
                <RHFAutocompleteAsync
                  name={'agentId'}
                  size={'small'}
                  placeholder={'Agent'}
                  apiQuery={apiQueryAgents}
                  disabled={loading || isLoading || isFetching || isError}
                  getOptionLabel={(option: any) =>
                    `${option?.firstName} ${option?.lastName}`
                  }
                />
              </Box>
            </Box>
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
            }}
            variant={'outlined'}
            color={'inherit'}
            size={'small'}
            onClick={handleDownload}
            disabled={loading || isLoading || isFetching || isError}
            loading={loading}
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
