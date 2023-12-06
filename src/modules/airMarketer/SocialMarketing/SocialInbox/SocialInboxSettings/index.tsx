import React from 'react';

import { Box, Tabs, Tab, Typography } from '@mui/material';

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
      <Box>
        <Typography variant="h3">Settings</Typography>
        <Box
          sx={{
            bgcolor: 'background.paper',
            display: { xs: 'block', md: 'flex' },
          }}
        >
          <Tabs
            orientation={tabsOrientation}
            value={Number(tabValue)}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={styles?.tabsStyle(theme)}
          >
            {tabLabels?.map((label) => <Tab key={uuidv4()} label={label} />)}
          </Tabs>

          {tabComponents?.map((Component, index) => (
            <TabPanel key={uuidv4()} value={Number(tabValue)} index={index}>
              <Box sx={styles?.tabsPanel(theme)}>
                {!tabValue ? <SkeletonForm /> : <Component />}
              </Box>
            </TabPanel>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SocialInboxSettings;
