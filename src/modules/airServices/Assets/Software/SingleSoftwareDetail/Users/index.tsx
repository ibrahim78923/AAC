import React, { useState } from 'react';
import UsersTable from './UsersTable';
import { Box, Grid, InputAdornment, TextField, useTheme } from '@mui/material';
import { SearchSharedIcon } from '@/assets/icons';
import CustomPagination from '@/components/CustomPagination';
import { softwareUserData } from './Users.data';
import { UsersAction } from './UsersAction';
import { UsersExport } from './UsersExport';
import { UsersAdd } from './UsersAdd';
import { UsersFilter } from './UsersFilter';

export const Users = () => {
  const [UsersData, setUsersData] = useState([]);

  const theme = useTheme();

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <TextField
            sx={{
              background: 'transparent',
              '& .MuiOutlinedInput-root ': {
                '& fieldset': {
                  textAlign: 'right',
                  borderColor: theme?.palette?.grey[700],
                  borderRadius: '8px',
                },
                '&:hover fieldset': {
                  borderColor: theme?.palette?.custom?.light_green,
                  boxShadow: `0px 0px 0px 3px ${theme?.palette?.custom?.aqua_breeze}`,
                },
                '& .MuiInputBase-input': {
                  color: theme?.palette?.common?.black,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme?.palette?.grey[700],
                },
              },
            }}
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
            // fullWidth
          />
          <Box sx={{ display: 'flex', gap: '18px' }}>
            <UsersAction actionDropdownData={softwareUserData} />
            <UsersAdd /> {/* This will handle the modal internally */}
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
