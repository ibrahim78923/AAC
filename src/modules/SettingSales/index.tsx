import React from 'react';

import { Box, Tabs, Tab, Typography } from '@mui/material';

import RolesRight from './TabsData/RolesRight';

import UserManagement from './TabsData/UserManagement';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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
          <Typography>{children}</Typography>
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
            sx={{
              borderRight: 1,
              borderColor: '#EDEDED',
              paddingTop: '2rem',
              width: '15%',
              '& .MuiTabs-flexContainer': {
                display: 'flex',
                alignItems: 'flex-start',
              },
              '& .MuiTab-root': {
                color: '#9CA3AF',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
              },
              '& .MuiTab-root.Mui-selected': {
                color: '#35456D',
                fontWeight: 600,
              },
            }}
          >
            <Tab label="Deals Pipelines" />
            <Tab label="Products" />
            <Tab label="Roles and Rights" />
            <Tab label="User Management" />
            <Tab label="Notifications" />
          </Tabs>
          <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            <RolesRight />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <UserManagement />
          </TabPanel>
          <TabPanel value={value} index={4}>
            Item Five
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
