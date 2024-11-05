import { DetailCard } from './DetailCard';
import { useSingleTicketDetails } from './useSingleTicketDetails';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { Header } from './Header';

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

  if (isLoading || isFetching) return <SkeletonTable />;

  if (isError) return <ApiErrorState canRefresh refresh={refetch} />;

  return (
    <>
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
    </>
  );
};
