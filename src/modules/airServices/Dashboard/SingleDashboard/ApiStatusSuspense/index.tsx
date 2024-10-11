import { Button } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import NoData from '@/components/NoData';
import ApiErrorState from '@/components/ApiErrorState';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import { AIR_SERVICES } from '@/constants';
import Link from 'next/link';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { NO_DEFAULT_DASHBOARD } from '../../Dashboard.data';

export const ApiStatusSuspense = (props: any) => {
  const {
    lazyGetSingleServicesDashboardStatus,
    reportsList,
    isPreviewMode,
    isDetailMode,
  } = props;

  const showLoader =
    lazyGetSingleServicesDashboardStatus?.isLoading ||
    lazyGetSingleServicesDashboardStatus?.isFetching;
  const hasError = lazyGetSingleServicesDashboardStatus?.isError;
  const hasDefaultDashboard =
    lazyGetSingleServicesDashboardStatus?.error?.data?.message ===
    NO_DEFAULT_DASHBOARD;
  const refetchApi = lazyGetSingleServicesDashboardStatus?.refetch;
  const errorMessage = hasDefaultDashboard
    ? 'No default dashboard found!'
    : 'Something went wrong';

  if (showLoader)
    return (
      <SkeletonCard
        flexDirection="column"
        gridSize={{ md: 6 }}
        outerPadding={{ x: 2, y: 6 }}
        isCircular={'rounded'}
        circularSkeletonSize={{ height: 25, width: '100%' }}
      />
    );

  if (hasError) {
    return (
      <>
        {isPreviewMode || isDetailMode ? (
          <ApiErrorState canRefresh refresh={refetchApi} />
        ) : (
          <ApiErrorState
            message={errorMessage}
            canRefresh={!hasDefaultDashboard}
            refresh={refetchApi}
          >
            {hasDefaultDashboard && (
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_DASHBOARD_PERMISSIONS?.CREATE_DASHBOARD,
                ]}
              >
                <Link href={AIR_SERVICES?.CREATE_DASHBOARD}>
                  <Button className="small" variant="contained">
                    Create Dashboard
                  </Button>
                </Link>
              </PermissionsGuard>
            )}
          </ApiErrorState>
        )}
      </>
    );
  }

  if (!!!reportsList?.length) return <NoData message="No widgets found" />;
};
