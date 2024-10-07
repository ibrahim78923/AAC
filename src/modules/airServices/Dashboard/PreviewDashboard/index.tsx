import { Box } from '@mui/material';
import { SingleDashboard } from '../SingleDashboard';
import NoData from '@/components/NoData';
import { ManageDashboardPortalComponentPropsI } from '../ManageDashboard/ManageDashboard.interface';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { StaticDashboardWidgets } from '../StaticDashboardWidgets';

export const PreviewDashboard = (
  props: ManageDashboardPortalComponentPropsI | any,
) => {
  const { isPortalOpen, setIsPortalOpen } = props;

  return (
    <>
      <CustomCommonDialog
        isPortalOpen={isPortalOpen?.isView}
        closePortal={() => setIsPortalOpen?.({})}
        dialogMaxWidth={'md'}
        dialogTitle={
          isPortalOpen?.isStaticView
            ? 'Preview Dashboard'
            : isPortalOpen?.data?.name
        }
        showActionButtons={false}
      >
        <Box>
          {isPortalOpen?.isDynamicPreview ? (
            <SingleDashboard
              dashboardId={{ _id: isPortalOpen?.data?._id }}
              isPreviewMode
            />
          ) : isPortalOpen?.isStaticView ? (
            <StaticDashboardWidgets widgets={isPortalOpen?.data} />
          ) : (
            <NoData message="No widgets found" />
          )}
        </Box>
      </CustomCommonDialog>
    </>
  );
};
