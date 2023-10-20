import React, { useState } from 'react';
import UsersTable from './UsersTable';
import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import { SearchSharedIcon } from '@/assets/icons';
import CustomPagination from '@/components/CustomPagination';
import { UsersAction } from './UsersAction';
import { UsersExport } from './UsersExport';
import { UsersAdd } from './UsersAdd';
import { UsersFilter } from './UsersFilter';
import { userDropdown } from './Users.data';

export const Users = () => {
  const [usersData, setUsersData] = useState([]);

  const handleAddModalOpen = () => {};

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <TextField
            id="outlined-basic"
            placeholder="search"
            variant="outlined"
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchSharedIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', gap: '18px' }}>
            <UsersAction
              actionDropdownData={userDropdown}
              usersData={usersData}
              setUsersData={setUsersData}
            />
            <UsersAdd onClick={handleAddModalOpen} />
            <UsersExport />
            <UsersFilter />
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <UsersTable usersData={usersData} setUsersData={setUsersData} />
          <CustomPagination
            count={5}
            rowsPerPageOptions={[1, 2, 3, 4, 5]}
            entriePages={40}
          />
        </Grid>
      </Grid>
    </>
  );
};
