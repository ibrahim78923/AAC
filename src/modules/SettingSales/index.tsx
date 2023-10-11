import React from 'react';

import { Box, Tabs, Tab, Typography } from '@mui/material';

import RolesRight from './TabsData/RolesAndRight';
import UserManagement from './TabsData/UserManagement';
import DealPipelines from './TabsData/DealPipelines';
import SalesProduct from './TabsData/SalesProduct';
import Notification from './TabsData/Notification';
import { SalesSettingProps } from './SettingSales.interface';
import { styles } from './SettingSales.style';

function TabPanel(props: SalesSettingProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      sx={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </Box>
  );
}
const SettingSales = () => {
  const [value, setValue] = React.useState<any>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Box>
        <Typography variant="h5">Settings</Typography>
        <Box sx={{ bgcolor: 'background.paper', display: 'flex' }}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={styles.tabsStyle}
          >
            <Tab label="Deals Pipelines" />
            <Tab label="Sales Product" />
            <Tab label="Roles and Rights" />
            <Tab label="User Management" />
            <Tab label="Notifications" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <DealPipelines />
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
          <TabPanel value={value} index={5}>
            Item Six
          </TabPanel>
          <TabPanel value={value} index={6}>
            Item Seven
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingSales;
