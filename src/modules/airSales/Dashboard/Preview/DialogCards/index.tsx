import React from 'react';
import { Box, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { styles } from './DialogCards.style';
import DealsGraph from '../../DealsGraph';
import MeetingDetails from '../../MeetingDetails';
import TeamActivity from '../../TeamActivity';
import Widget from '../../Widget';
import { CloseModalIcon } from '@/assets/icons';
import { NotSelectedItemImage } from '@/assets/images';
import { AIR_SALES_DASHBOARD_REPORTS_TYPES } from '@/constants';
import DealsReportsAnalytics from '../../DealsReportsAnalytics';

const DialogCards = ({ open, setOpen, selectedReports }: any) => {
  const displayDashboardWidgets = (selectedWidget: any) => {
    if (selectedWidget?.length > 0) {
      return selectedWidget.map((report: any) => {
        switch (report) {
          case AIR_SALES_DASHBOARD_REPORTS_TYPES?.DEALS_CREATED_VS_CLOSED_DEALS:
            return <DealsGraph />;
          case AIR_SALES_DASHBOARD_REPORTS_TYPES?.MEETING_DETAILS:
            return <MeetingDetails />;
          case AIR_SALES_DASHBOARD_REPORTS_TYPES?.TEAM_ACTIVITIES_BY_ACTIVITY_DATE:
            return <TeamActivity />;
          case AIR_SALES_DASHBOARD_REPORTS_TYPES?.TOTAL_DEALS_OPEN_DEALS_TEAM_GOALS_CLOSED_WON_PUBLISHED_QUOTES:
            return <Widget />;
          case AIR_SALES_DASHBOARD_REPORTS_TYPES?.DEAL_REPORTS:
            return <DealsReportsAnalytics />;
          case AIR_SALES_DASHBOARD_REPORTS_TYPES?.FORECAST_PIPELINE_REPORT:
            return (
              <Typography variant="h6">Under construction.....</Typography>
            );
          case AIR_SALES_DASHBOARD_REPORTS_TYPES?.FORECAST_CATEGORY_REPORTS:
            return (
              <Typography variant="h6">Under construction.....</Typography>
            );
          default:
            return;
        }
      });
    } else {
      return (
        <Box sx={styles?.defaultSelectedImage}>
          <Image src={NotSelectedItemImage} alt="not-selected-Item"></Image>
        </Box>
      );
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      sx={{
        '& .MuiDialog-paper': { borderRadius: '8px' },
      }}
    >
      <DialogContent sx={{ p: '0px 24px 24px' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 1,
            padding: '20px 24px',
          }}
        >
          <Typography variant="h4">Preview Dashboard</Typography>
          <Box sx={styles.modalClose} onClick={onClose}>
            <CloseModalIcon />
          </Box>
        </Stack>
        <Stack direction="column" gap={2} p={2}>
          {displayDashboardWidgets(selectedReports)}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCards;
