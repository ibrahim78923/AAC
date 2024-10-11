import React from 'react';
import { Box, Tabs, Tab, Typography, Grid } from '@mui/material';
import { SalesSettingProps } from './SocialInboxSettings.interface';
import { styles } from './SocialInboxSettings.style';
import { tabComponents, tabLabels } from './SocialInboxSettings.data';
import useSocialSettings from './useSocialSettings';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { v4 as uuidv4 } from 'uuid';

const SocialInboxSettings = () => {
  const { tabsOrientation, tabValue, handleChange, theme } =
    useSocialSettings();

  function TabPanel(props: SalesSettingProps) {
    const { children, value, index, ...other } = props;

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
        sx={styles?.tabData(theme)}
      >
        {value === index && (
          <Box sx={{ p: { xs: 1, md: 3 } }}>
            <>{children}</>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h3">Settings</Typography>
      <Box
        sx={{
          bgcolor: 'background.paper',
          display: { xs: 'block', md: 'flex' },
        }}
      >
        <Grid container>
          <Grid item xs={12} md={3} lg={2}>
            <Tabs
              orientation={tabsOrientation}
              value={Number(tabValue)}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={styles?.tabsStyle(theme)}
            >
              {tabLabels?.map((label) => <Tab key={uuidv4()} label={label} />)}
            </Tabs>
          </Grid>
          <Grid item xs={12} md={9} lg={10}>
            {tabComponents?.map((Component, index) => (
              <TabPanel key={uuidv4()} value={Number(tabValue)} index={index}>
                <Box>{!tabValue ? <SkeletonForm /> : <Component />}</Box>
              </TabPanel>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SocialInboxSettings;
