import { PageTitledHeader } from '@/components/PageTitledHeader';
import { usePublicDashboard } from './usePublicDashboard';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { Box } from '@mui/material';
import { PublicTicketStatusCount } from '../PublicTicketStatusCount';
import { DashboardWidgets } from '../DashboardsWidgets';

export const PublicDashboard = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    skip,
    filterBy,
    departmentId,
    isApiCalled,
  } = usePublicDashboard();

  if (skip) return <ApiErrorState />;

  if (isApiCalled) return <SkeletonTable />;

  if (isLoading || isFetching) return <SkeletonTable />;

  if (isError) return <ApiErrorState />;

  return (
    <Box p={2}>
      <PageTitledHeader title={data?.data?.dashboard?.name ?? '---'} />
      <br />
      <PublicTicketStatusCount />
      <br />
      <DashboardWidgets
        reportsList={data?.data?.dashboard?.reports}
        apiData={data?.data}
        isPreviewMode
        ticketType={filterBy}
        departmentId={departmentId}
      />
    </Box>
  );
};
