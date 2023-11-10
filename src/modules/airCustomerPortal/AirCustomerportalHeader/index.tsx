import { CompanyLogoIcon } from '@/assets/icons';
import { Box, Button, Grid } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export const AirCustomerPortalHeader = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item md={6}>
        <CompanyLogoIcon />
      </Grid>
      <Box>
        {
          <Button variant="contained">
            <Link href={'/air-customer-portal/login'}>SignUp</Link>
          </Button>
        }
      </Box>
    </Grid>
  );
};
