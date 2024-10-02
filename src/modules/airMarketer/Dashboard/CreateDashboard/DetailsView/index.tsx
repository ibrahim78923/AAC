import Image from 'next/image';
import { Card, Typography, Box, Stack } from '@mui/material';
import { NotSelectedItemImage } from '@/assets/images';
import { AIR_MARKETER_DASHBOARD_REPORTS_TYPES } from '@/constants';
import { styles } from './DetailsView.style';
import ContactCustomerGraph from '../../StaticComponents/ContactCustomerGraph';
import CtaViews from '../../StaticComponents/CtaViews';
import TotalMarketingEmail from '../../StaticComponents/TotalMarketingEmail';
import FormsTable from '../../StaticComponents/FormsTable';
import { ProfileStatistics } from '../../StaticComponents/ProfileStatistics';

const DetailsView = ({ selectedReports }: any) => {
  const displayDashboardWidgets = (selectedWidget: any) => {
    if (selectedWidget?.length > 0) {
      return selectedWidget?.map((report: any) => {
        switch (report) {
          case AIR_MARKETER_DASHBOARD_REPORTS_TYPES?.NEW_CONTACTS_AND_CUSTOMERS:
            return <ContactCustomerGraph key={report} />;
          case AIR_MARKETER_DASHBOARD_REPORTS_TYPES?.CTA_TOTAL_VIEWS_AND_ADS_SUBMISSIONS:
            return <CtaViews key={report} />;
          case AIR_MARKETER_DASHBOARD_REPORTS_TYPES?.TOTAL_MARKETING_EMAIL:
            return <TotalMarketingEmail key={report} />;
          case AIR_MARKETER_DASHBOARD_REPORTS_TYPES?.LEAD_CAPTURED_FORMS:
            return <FormsTable key={report} />;
          case AIR_MARKETER_DASHBOARD_REPORTS_TYPES?.PROFILE_STATS:
            return <ProfileStatistics key={report} />;
          default:
            return null;
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
