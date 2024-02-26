import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import PlusShared from '@/assets/icons/shared/plus-shared';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import Teams from './Teams';
import Users from './Users';

const UserManagement = () => {
  return (
    <Box
      sx={{
        borderRadius: '15px',
        border: '1px solid #EAECF0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '19px',
          padding: '20px 20px 0px 20px',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: '600' }}>
          User Management
        </Typography>
        <Button
          variant="contained"
          sx={{
            height: '36px',
            fontWeight: '500',
            textTransform: 'none !important',
          }}
          startIcon={<PlusShared />}
        >
          Add User
        </Button>
      </Box>

      <Box sx={{ padding: '0px 24px' }}>
        <HorizontalTabs tabsDataArray={['User', 'Teams']}>
          <Users />
          <Teams />
        </HorizontalTabs>
      </Box>
    </Box>
  );
};

export default UserManagement;
