import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import useViewAccounts from './useViewAccounts';
import { columns } from './ViewAccounts.data';
import { companiesData } from '@/mock/modules/airSales/Contacts/ContactViewDetails';
import { BackArrIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';

const ViewAccount = ({ handleShowCard }: { handleShowCard: () => void }) => {
  const { searchTerm, setSearchTerm } = useViewAccounts();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack
            onClick={handleShowCard}
            direction="row"
            gap={1}
            alignItems="center"
          >
            <BackArrIcon />
            <Typography variant="h3">Facebook</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <PermissionsGuard
            permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.SEARCH_SOCIAL]}
          >
            <Search
              searchBy={searchTerm}
              setSearchBy={setSearchTerm}
              label="Search By Name"
              size="small"
            />
          </PermissionsGuard>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable columns={columns()} data={companiesData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewAccount;
