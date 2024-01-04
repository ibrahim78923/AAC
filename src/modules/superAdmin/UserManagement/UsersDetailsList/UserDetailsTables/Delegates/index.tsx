import React, { useState } from 'react';

import { Box, Grid, Typography, Divider, Button } from '@mui/material';

import Search from '@/components/Search';

import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';

import { delegatesColumns, delegatesData } from './Delegates.data';

import DelegateFilterDrawer from '../../DelegateFilterDrawer';

import { FilterrIcon } from '@/assets/icons';

const Delegates = () => {
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);
  return (
    <Box
      sx={{
        maxHeight: `calc(50vh - ${15}px)`,
        overflow: 'auto',
      }}
    >
      <Box sx={{ margin: '16px 24px' }}>
        <Grid container spacing={2}>
          <Grid item lg={4} xs={12}>
            <Typography component="span">Total Earnings</Typography>
            <Typography variant="h5">£ 1,234.11</Typography>
          </Grid>
          <Grid item lg={8} xs={12}>
            <Typography component="span">
              Pending From Inactive Members
            </Typography>
            <Typography variant="h5">£ 1,234.11</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <Box
              sx={{
                mt: 1,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <Search placeholder="Search Here" size="small" />
              <Button
                onClick={() => {
                  setIsOpenFilterDrawer(true);
                }}
                startIcon={<FilterrIcon />}
                variant="outlined"
                sx={{
                  border: '1px solid #D1D5DB',
                  height: '36px',
                  width: '95',
                  color: '#6B7280',
                }}
              >
                Filter
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <TanstackTable columns={delegatesColumns} data={delegatesData} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
      {isOpenFilterDrawer && (
        <DelegateFilterDrawer
          isOpen={isOpenFilterDrawer}
          setIsOpen={setIsOpenFilterDrawer}
        />
      )}
    </Box>
  );
};

export default Delegates;
