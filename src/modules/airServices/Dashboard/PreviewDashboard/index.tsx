import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SingleDashboard } from '../SingleDashboard';
import NoData from '@/components/NoData';
import { TICKET_GRAPH_TYPES } from '@/constants/strings';
import { AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS } from '../CreateDashboard/CreateDashboard.data';
import { createElement } from 'react';

export const PreviewDashboard = (props: any) => {
  const { isPortalOpen, setIsPortalOpen } = props;

  return (
    <>
      <Dialog
        open={isPortalOpen?.isView}
        onClose={() => setIsPortalOpen?.({})}
        fullWidth
        maxWidth={'md'}
      >
        <DialogTitle>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={1}
            flexWrap={'wrap'}
            mb={1.5}
          >
            <Typography variant="h4" color="slateBlue.main">
              {isPortalOpen?.isStaticView
                ? 'Preview Dashboard'
                : isPortalOpen?.data?.name}
            </Typography>
            <CloseIcon
              sx={{ color: 'custom.darker', cursor: 'pointer' }}
              onClick={() => setIsPortalOpen?.()}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
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
        </DialogContent>
      </Dialog>
    </>
  );
};
