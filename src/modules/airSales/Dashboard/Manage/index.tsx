import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

import Search from '@/components/Search';

import useManage from './useManage';
import Table from './Table';

import { ArrowLeft, FilterSharedIcon, PlusIcon } from '@/assets/icons';
import Filters from './Filters';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { useState } from 'react';

const Manage = ({ toggle, setIsShowCreateDashboardForm }: any) => {
  const { setIsOpenFilterDrawer, isOpenFilterDrawer } = useManage();

  const [searchByName, setSearchByName] = useState('');

  const theme: any = useTheme();

  return (
    <Grid container style={{ paddingLeft: '20px' }}>
      <Grid item xs={6} sm={6} style={{ paddingLeft: '0px' }}>
        <Box sx={{ display: 'flex' }}>
          <Box mt={0.7} onClick={() => toggle()} sx={{ cursor: 'pointer' }}>
            <ArrowLeft />
          </Box>
          <Typography
            variant="h4"
            sx={{ marginLeft: '15px', marginTop: '4px' }}
          >
            Manage Dashboards
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} sm={6} sx={{ textAlign: 'end' }}>
        <PermissionsGuard
          permissions={[AIR_SALES_DASHBOARD_PERMISSIONS?.CREATE_DASHBOARD]}
        >
          <Button
            startIcon={<PlusIcon />}
            variant="contained"
            className="medium"
            onClick={() => setIsShowCreateDashboardForm(true)}
          >
            Create Dashboard
          </Button>
        </PermissionsGuard>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={10} sm={10} mb={3}>
          <Search
            searchBy={searchByName}
            setSearchBy={setSearchByName}
            label="Search By Name"
            size="medium"
          />
        </Grid>

        <Grid item xs={2} sm={2} sx={{ textAlign: 'end' }}>
          <Button
            onClick={() => setIsOpenFilterDrawer(true)}
            startIcon={<FilterSharedIcon />}
            sx={{
              border: `1px solid ${theme?.palette?.grey[0]}`,
              color: theme?.palette?.custom?.main,
              height: '36px',
              width: '100px',
            }}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Table searchByName={searchByName} />
      </Grid>
      {isOpenFilterDrawer && (
        <Filters
          isOpenDrawer={isOpenFilterDrawer}
          onClose={() => setIsOpenFilterDrawer(false)}
        />
      )}
    </Grid>
  );
};
export default Manage;
