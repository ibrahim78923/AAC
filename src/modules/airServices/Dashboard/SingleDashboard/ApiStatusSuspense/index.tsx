import { Button } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import NoData from '@/components/NoData';
import ApiErrorState from '@/components/ApiErrorState';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import Link from 'next/link';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { AIR_SERVICES } from '@/constants/routes';
import { MESSAGES } from '@/constants/messages';

export const ApiStatusSuspense = (props: any) => {
  const {
    reportsList,
    isPreviewMode,
    isDetailMode,
    refetchApi,
    hasDefaultDashboard,
    hasError,
    showLoader,
  } = props;

  const errorMessage = hasDefaultDashboard
    ? MESSAGES?.NO_DEFAULT_DASHBOARD
    : MESSAGES?.SOMETHING_WENT_WRONG;

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

  if (!!!reportsList?.length)
    return (
      <NoData message={errorMessage}>
        {hasDefaultDashboard && (
          <PermissionsGuard
            permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.CREATE_DASHBOARD]}
          >
            <Link href={AIR_SERVICES?.CREATE_DASHBOARD}>
              <Button className="small" variant="contained">
                Create Dashboard
              </Button>
            </Link>
          </PermissionsGuard>
        )}
      </NoData>
    );
};
