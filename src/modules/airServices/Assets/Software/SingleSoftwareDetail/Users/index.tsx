import { useState } from 'react';

import UsersTable from './UsersTable';
import { Box, Grid, InputAdornment, TextField, useTheme } from '@mui/material';
import { SearchSharedIcon } from '@/assets/icons';
import { TicketsExport } from '@/modules/airServices/ServicesTickets/TicketsLists/components/TicketsExport';
// import { TicketsFilter } from '@/modules/airServices/ServicesTickets/TicketsLists/components/TicketsFilter';
import { TicketsAction } from '@/modules/airServices/ServicesTickets/TicketsLists/components/TicketsAction';
export const Users = () => {
  const [UsersData, setUsersData] = useState([]);
  const theme = useTheme();
  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{}}>
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
          <Box>
            <TicketsExport />
            {/* <TicketsFilter/> */}
            <TicketsAction />
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <UsersTable usersData={UsersData} setUsersData={setUsersData} />
        </Grid>
      </Grid>
    </>
  );
};
