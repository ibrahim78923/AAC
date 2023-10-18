import React, { useState } from 'react';
import UsersTable from './UsersTable';
import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import { SearchSharedIcon } from '@/assets/icons';
import CustomPagination from '@/components/CustomPagination';
import { softwareUserData } from './Users.data';
import { UsersAction } from './UsersAction';
import { UsersExport } from './UsersExport';
import { UsersAdd } from './UsersAdd';
import { UsersFilter } from './UsersFilter';

export const Users = () => {
  const [UsersData, setUsersData] = useState([]);
  const [setAddModalOpen] = useState(false);

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  // Remove the unused handleAddModalClose function if it's not needed.
  // const handleAddModalClose = () => {
  //   setAddModalOpen(false);
  // };

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <TextField
            sx={
              {
                // Your search input styles
              }
            }
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
            <UsersAction actionDropdownData={softwareUserData} />
            <UsersAdd onClick={handleAddModalOpen} />{' '}
            {/* Open the modal on button click */}
            <UsersExport />
            <UsersFilter />
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <UsersTable usersData={UsersData} setUsersData={setUsersData} />
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
