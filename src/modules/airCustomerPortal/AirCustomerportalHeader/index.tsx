import { CompanyLogoIcon } from '@/assets/icons';
import { Box, Button, Grid } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export const AirCustomerPortalHeader = (props: any) => {
  const { buttonText, link = '' } = props;
  return (
    <Grid container justifyContent="space-between" alignItems="center" p={3}>
      <Grid item md={6}>
        <CompanyLogoIcon />
      </Grid>
      <Box>
        <Button variant="contained">
          <Link href={link}>{buttonText}</Link>
        </Button>
      </Box>
    </Grid>
  );
};
