import React, { useState } from 'react';

import { Box, Tabs, Tab, Typography, useMediaQuery } from '@mui/material';

import RolesRight from './TabsData/RolesAndRight';
import UserManagement from './TabsData/UserManagement';
import SalesProduct from './TabsData/SalesProduct';
import Notification from './TabsData/Notification';
import { SalesSettingProps } from './SettingSales.interface';
import { styles } from './SettingSales.style';
import LifeCycleStage from './TabsData/LifecycleStage';

function TabPanel(props: SalesSettingProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      sx={styles?.tabData}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, md: 3 } }}>
          <>{children}</>
        </Box>
      )}
    </Box>
  );
}
const SocialInboxSettings = () => {
  const [value, setValue] = useState<any>(0);
  const isMobile = useMediaQuery('(max-width: 899px)');
  const tabsOrientation = isMobile ? 'horizontal' : 'vertical';
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={styles?.tabsStyle}
          >
            <Tab label="Lifecycle Stages" />
            <Tab label="Social Accounts" />
            <Tab label="Roles and Rights" />
            <Tab label="User Management" />
            <Tab label="Notifications" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <LifeCycleStage />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SalesProduct />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <RolesRight />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <UserManagement />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Notification />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default SocialInboxSettings;
