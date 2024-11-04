import React from 'react';
import { Box, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { styles } from './DialogCards.style';
import { CloseModalIcon } from '@/assets/icons';
import { NotSelectedItemImage } from '@/assets/images';
import { AIR_MARKETER_DASHBOARD_REPORTS_TYPES } from '@/constants';
import CtaViews from '../../StaticComponents/CtaViews';
import ContactCustomerGraph from '../../StaticComponents/ContactCustomerGraph';
import TotalMarketingEmail from '../../StaticComponents/TotalMarketingEmail';
import FormsTable from '../../StaticComponents/FormsTable';
// commented for future use
// import SmsMarketingGraph from '../../StaticComponents/SmsMarketingGraph';
// import WhatsappMarketingGraph from '../../StaticComponents/WhatsappMarketingGraph';
// import { ProfileStatistics } from '../../StaticComponents/ProfileStatistics';

const DialogCards = ({ open, setOpen, selectedReports }: any) => {
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
          // commented for future use
          // case AIR_MARKETER_DASHBOARD_REPORTS_TYPES?.PROFILE_STATS:
          //   return <ProfileStatistics key={report} />;
          // case AIR_MARKETER_DASHBOARD_REPORTS_TYPES?.SMS_MARKETING_GRAPH:
          //   return <SmsMarketingGraph key={report} />;
          // case AIR_MARKETER_DASHBOARD_REPORTS_TYPES?.WHATSAPP_MARKETING_GRAPH:
          //   return <WhatsappMarketingGraph key={report} />;
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
