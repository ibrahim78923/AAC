import { Grid } from '@mui/material';
import { SingleDashboard } from '../SingleDashboard';
import NoData from '@/components/NoData';
import { TICKET_GRAPH_TYPES } from '@/constants/strings';
import { AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS } from '../UpsertDashboard/UpsertDashboard.data';
import { createElement } from 'react';
import { ManageDashboardPortalComponentPropsI } from '../ManageDashboard/ManageDashboard.interface';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

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
        <Grid container spacing={3} p={2}>
          {isPortalOpen?.isDynamicPreview ? (
            <SingleDashboard
              dashboardId={{ _id: isPortalOpen?.data?._id }}
              isPreviewMode
            />
          ) : isPortalOpen?.isStaticView ? (
            <Grid container spacing={3} p={2}>
              {!!!isPortalOpen?.data?.length ? (
                <NoData />
              ) : (
                isPortalOpen?.data?.map((item: any) => (
                  <Grid item xs={12} md={6} key={item}>
                    {AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item] &&
                      createElement(
                        AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item],
                        {
                          ticketType: TICKET_GRAPH_TYPES?.PRIORITY,
                          isPreviewMode: true,
                        },
                      )}
                  </Grid>
                ))
              )}
            </Grid>
          ) : (
            <NoData />
          )}
        </Grid>
      </CustomCommonDialog>
    </>
  );
};
