import React from 'react';

import { Box, Grid } from '@mui/material';

import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';

import { teamsTableData } from '@/mock/modules/airSales/SettingSales';

import { columnsTeams } from './TeamsTable.data';

const TeamsTable = () => {
  return (
    <Box>
      <Search
        searchBy=""
        width="100%"
        label={'Search here'}
        setSearchBy={() => {}}
        size="small"
      />
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
