import { PageTitledHeader } from '@/components/PageTitledHeader';
import { usePublicDashboard } from './usePublicDashboard';
import { Box } from '@mui/material';
import { PublicTicketStatusCount } from '../PublicTicketStatusCount';
import { DashboardWidgets } from '../DashboardsWidgets';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

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

  return (
    <Box p={2}>
      <ApiRequestFlow
        showSkeleton={isApiCalled || isLoading || isFetching}
        hasError={skip || isError}
        skeletonType={SKELETON_TYPES?.BARS}
      >
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
      </ApiRequestFlow>
    </Box>
  );
};
