import React, { useState } from 'react';

import { Box, Grid, Typography, Divider, Button } from '@mui/material';

import Search from '@/components/Search';

import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';

import { delegatesColumns, delegatesData } from './Delegates.data';

import DelegateFilterDrawer from '../../DelegateFilterDrawer';

import { FilterSharedIcon } from '@/assets/icons';

const Delegates = () => {
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);
  return (
    <>
      <Box sx={{ margin: '16px 24px' }}>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <Typography component="span">Total Earnings</Typography>
            <Typography variant="h5">£ 1,234.11</Typography>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Typography component="span">
              Pending From Inactive Members
            </Typography>
            <Typography variant="h5">£ 1,234.11</Typography>
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <Search placeholder="Search Here" />
              <Button
                onClick={() => {
                  setIsOpenFilterDrawer(true);
                }}
                startIcon={<FilterSharedIcon />}
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
    </>
  );
};

export default Delegates;
