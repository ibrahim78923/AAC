import React from 'react';

import { Box, Grid } from '@mui/material';

import Search from '@/components/Search';
import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { columnsTeams, teamsTableData } from './UserManagement.data';

const TeamsTable = () => {
  return (
    <Box>
      <Search
        searchBy=""
        width="100%"
        label={'Search here'}
        setSearchBy={() => {}}
      />
      <Grid sx={{ paddingTop: '1rem' }}>
        <TanstackTable columns={columnsTeams} data={teamsTableData} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Grid>
    </Box>
  );
};

export default TeamsTable;
