import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  Grid,
} from '@mui/material';
import CommonModal from '@/components/CommonModal';
import AddCampaigns from './AdCampaigns';
import CTAs from './CTAs';
import { useState } from 'react';
import { styles } from './Settings.style';
import EmailsComp from './EmailsComp';
import Forms from './Forms';
import SocialPosts from './SocialPosts';

const Settings = ({ closeAddAssets, isOpenAddAssets }: any) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme?.breakpoints?.up('md'));
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <CommonModal
      title={<Typography variant="h3">Add Assets</Typography>}
      open={isOpenAddAssets}
      handleCancel={closeAddAssets}
      okText="Apply"
      cancelText="cancel"
      footer
      width={944}
    >
      <Box sx={styles.tabWrapper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Typography
              variant="h4"
              sx={{
                borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
                pb: '16px',
              }}
            >
              Settings
            </Typography>
            <Box
              className="tabs-container"
              sx={{
                mt: '20px',
                borderColor: theme?.palette?.custom?.off_white_three,
              }}
            >
              <Tabs
                sx={{
                  '& .MuiTab-root': {
                    fontSize: '16px',
                    fontWeight: 400,
                    color: theme?.palette?.grey[900],
                  },
                  '& .Mui-selected': {
                    color: theme?.palette?.secondary?.main,
                    fontWeight: 600,
                  },
                }}
                value={selectedTab}
                onChange={handleTabChange}
                orientation={isMdUp ? 'vertical' : 'horizontal'}
                variant="scrollable"
                allowScrollButtonsMobile
                className={'tabs-main-class'}
              >
                <Tab label="Ad Campaigns" />
                <Tab label="CTAs" />
                <Tab label="Emails" />
                <Tab label="Forms" />
                <Tab label="Social Posts" />
              </Tabs>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            {selectedTab === 0 && <AddCampaigns />}
            {selectedTab === 1 && <CTAs />}
            {selectedTab === 2 && <EmailsComp />}
            {selectedTab === 3 && <Forms />}
            {selectedTab === 4 && <SocialPosts />}
          </Grid>
        </Grid>
      </Box>
    </CommonModal>
  );
};

export default Settings;
