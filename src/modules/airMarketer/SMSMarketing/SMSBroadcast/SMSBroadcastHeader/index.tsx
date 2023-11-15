import Search from '@/components/Search';
import { Button, Grid } from '@mui/material';
import React from 'react';

const SMSBroadcastHeader = () => {
  return (
    <Grid container sx={{ justifyContent: 'space-between', my: 1 }}>
      <Grid item lg={6}>
        date calander here
      </Grid>
      <Grid
        item
        lg={6}
        sx={{
          display: 'flex',
          justifyContent: 'right',
          gap: '10px',
          alignItems: 'right',
        }}
      >
        <Search size="small" placeholder="Search Here" />
        <Button>Status</Button>
        <Button>Actions</Button>
      </Grid>
    </Grid>
  );
};

export default SMSBroadcastHeader;
