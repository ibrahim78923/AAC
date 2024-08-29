import Image from 'next/image';
import { Card, Typography, Box, Stack } from '@mui/material';
import { NotSelectedItemImage } from '@/assets/images';
import MeetingDetails from '../../MeetingDetails';
import TeamActivity from '../../TeamActivity';
import DealsGraph from '../../DealsGraph';
import Widget from '../../Widget';
import { AIR_SALES_DASHBOARD_REPORTS_TYPES } from '@/constants';
import DealsReportsAnalytics from '../../DealsReportsAnalytics';
import { styles } from './DetailsView.style';

const DetailsView = ({ selectedReports }: any) => {
  const displayDashboardWidgets = (selectedWidget: any) => {
    if (selectedWidget?.length > 0) {
      return selectedWidget?.map((report: any) => {
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
  return (
    <Card sx={{ height: '80vh', overflow: 'auto' }}>
      <Typography variant="h4" mt={2} sx={{ textAlign: 'center' }} gutterBottom>
        Details View
      </Typography>
      <Stack direction="column" gap={2} p={2}>
        {displayDashboardWidgets(selectedReports)}
      </Stack>
    </Card>
  );
};
export default DetailsView;
