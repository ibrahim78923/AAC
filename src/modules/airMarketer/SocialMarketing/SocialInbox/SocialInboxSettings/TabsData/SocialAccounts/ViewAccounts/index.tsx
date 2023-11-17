import { BackArrIcon } from '@/assets/icons';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import useViewAccounts from './useViewAccounts';
import { columns } from './ViewAccounts.data';
import { companiesData } from '@/mock/modules/airSales/Contacts/ContactViewDetails';

const ViewAccount = ({ handleShowCard }: { handleShowCard: () => void }) => {
  const { searchTerm, setSearchTerm } = useViewAccounts();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              paddingTop: '15px',
            }}
          >
            <Box onClick={handleShowCard}>
              <BackArrIcon />
            </Box>
            <Typography variant="h4">ViewAccount</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Search
            searchBy={searchTerm}
            setSearchBy={setSearchTerm}
            label="Search By Name"
            size="small"
            sx={{ marginBottom: '15px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TanstackTable columns={columns()} data={companiesData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewAccount;
