import { FilterSharedIcon } from '@/assets/icons';
import PlusShared from '@/assets/icons/shared/plus-shared';
import Search from '@/components/Search';
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import React from 'react';

const UsersSidebar = () => {
  return (
    <Box p={'24px'}>
      <Box
        py={1}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h3">Users</Typography>
        <Button variant="contained" startIcon={<PlusShared />}>
          Add User
        </Button>
      </Box>
      <Divider />
      <Box
        py={1}
        sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}
      >
        <Search label="Placeholder" />
        <Button
          sx={{
            border: '1px solid grey',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FilterSharedIcon />
        </Button>
      </Box>

      <Box
        className="users-wrapper"
        sx={{
          backgroundColor: '#F3F4F6',
          borderRadius: '4px',
          padding: '11px 8px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Roberts Rohan</Typography>
              <Typography>active</Typography>
            </Box>
            <Typography>Robert@airapplecart.co.uk</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UsersSidebar;
