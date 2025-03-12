import { Box } from '@mui/material';
import { SingleDashboard } from '../SingleDashboard';
import NoData from '@/components/NoData';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { StaticDashboardWidgets } from '../StaticDashboardWidgets';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsPortalClose } from '@/redux/slices/airServices/dashboard/slice';
import { SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT } from '../Dashboard.data';
import { dashboardIsPortalOpenSelector } from '@/redux/slices/airServices/dashboard/selectors';
import { shallowEqual } from 'react-redux';

const PreviewDashboard = () => {
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    dashboardIsPortalOpenSelector,
    shallowEqual,
  );

  return (
    <>
      <CustomCommonDialog
        isPortalOpen={isPortalOpen?.isOpen}
        closePortal={() => dispatch(setIsPortalClose?.())}
        dialogMaxWidth={'md'}
        dialogTitle={
          isPortalOpen?.action ===
          SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT?.PREVIEW_DASHBOARD
            ? isPortalOpen?.action
            : isPortalOpen?.data?.name
        }
        showActionButtons={false}
      >
        <Box>
          {isPortalOpen?.action ===
          SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT?.SINGLE_DASHBOARD_DETAILS ? (
            <SingleDashboard
              dashboardId={{ _id: isPortalOpen?.data?._id }}
              isPreviewMode
            />
          ) : isPortalOpen?.action ===
            SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT?.PREVIEW_DASHBOARD ? (
            <StaticDashboardWidgets widgets={isPortalOpen?.data} />
          ) : (
            <NoData message="No widgets found" />
          )}
        </Box>
      </CustomCommonDialog>
    </>
  );
};

export default PreviewDashboard;
