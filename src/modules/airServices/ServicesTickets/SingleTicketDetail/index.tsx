import { DetailCard } from './DetailCard';
import { useSingleTicketDetails } from './useSingleTicketDetails';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { Header } from './Header';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const SingleTicketDetail = () => {
  const {
    isLoading,
    isFetching,
    isError,
    singleTicketDetailTabs,
    refetch,
    childComponentProps,
    router,
  } = useSingleTicketDetails?.();

  if (!router?.isReady) return <SkeletonTable />;

  return (
    <ApiRequestFlow
      showSkeleton={isLoading || isFetching}
      hasError={isError}
      refreshApi={refetch}
      skeletonType={SKELETON_TYPES?.BARS}
    >
      <Header {...childComponentProps} />
      <br />
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_TICKETS_TICKETS_DETAILS?.VIEW_REQUESTER_DETAILS,
        ]}
      >
        <DetailCard />
      </PermissionsGuard>
      <br />
      <PermissionsTabs spacing={0.3} tabsDataArray={singleTicketDetailTabs} />
    </ApiRequestFlow>
  );
};
