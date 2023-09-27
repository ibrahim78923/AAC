import { Box, Button, Typography, Tabs, Tab } from '@mui/material';
import React from 'react';
import UserTable from './UserTable';
import TeamsTable from './TeamsTable';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const UserManagement = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        border: '1px solid #EAECF0',
        borderRadius: '8px',
        boxShadow: '0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A',
        padding: '1rem',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">User Manangement</Typography>

        <Button
          variant="contained"
          sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}
        >
          <AddCircleIcon sx={{ color: '#ffff', fontSize: '16px' }} />{' '}
          {value === 0 ? 'Add User' : 'Create Team'}
        </Button>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="User" {...a11yProps(0)} />
            <Tab label="Teams" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <UserTable />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TeamsTable />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default UserManagement;
