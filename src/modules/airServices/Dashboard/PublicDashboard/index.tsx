import { PageTitledHeader } from '@/components/PageTitledHeader';
import { usePublicDashboard } from './usePublicDashboard';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { Box, Grid } from '@mui/material';
import { REPORT_TYPES } from '@/constants/strings';
import { AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS } from '../UpsertDashboard/UpsertDashboard.data';
import { createElement } from 'react';
import { ReportsWidgets } from '../ReportsWidgets';
import { PublicTicketStatusCount } from '../PublicTicketStatusCount';

export const PublicDashboard = () => {
  const { data, isLoading, isFetching, isError, skip, filterBy, departmentId } =
    usePublicDashboard();

  if (skip) return <ApiErrorState />;

  if (!data) return <SkeletonTable />;

  if (isLoading || isFetching) return <SkeletonTable />;

  if (isError) return <ApiErrorState />;

  return (
    <Box p={2}>
      <PageTitledHeader title={data?.data?.dashboard?.name ?? '---'} />
      <br />
      <PublicTicketStatusCount />
      <br />
      <Grid container spacing={3}>
        {data?.data?.dashboard?.reports?.map((item: any, index: number) => {
          return item?.type === REPORT_TYPES?.STATIC ? (
            <Grid item xs={12} lg={6} key={item?.name}>
              {AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item?.name] &&
                createElement(
                  AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item?.name],
                  {
                    data: data?.data,
                    ticketType: filterBy as string,
                    departmentId,
                    isPreviewMode: true,
                  },
                )}
            </Grid>
          ) : (
            <Grid item xs={12} key={item?._id ?? index}>
              <ReportsWidgets
                reportWidgets={data?.data?.[`genericReports${index}`]}
                reportResults={data?.data?.[`genericReportsResult${index}`]}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
