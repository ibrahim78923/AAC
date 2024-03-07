import React from 'react';

import { Box, Grid } from '@mui/material';

import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';

import { teamsTableData } from '@/mock/modules/airSales/SettingSales';

import { columnsTeams } from './TeamsTable.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';

const TeamsTable = () => {
  return (
    <Box>
      <PermissionsGuard
        permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.SEARCH_TEAMS]}
      >
        <Search
          searchBy=""
          width="260px"
          label={'Search here'}
          setSearchBy={() => {}}
          size="small"
        />
      </PermissionsGuard>

      <Grid sx={{ paddingTop: '1rem' }}>
        <TanstackTable
          columns={columnsTeams}
          data={teamsTableData}
          isPagination
        />
      </Grid>
    </Box>
  );
};

export default TeamsTable;
