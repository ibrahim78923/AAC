import React from 'react';

import { Box, Typography } from '@mui/material';

import OrganizationCard from './OrganizationSubFolder/OrganizationCard';
import OrganizationTable from './OrganizationSubFolder/OrganizationTable';

const Organization = () => {
  return (
    <>
      <Box
        sx={{
          background: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid transparent',
        }}
      >
        <Box sx={{ border: '1px solid #EAECF0', padding: '0.7rem' }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: {
                lg: 'start',
                md: 'start',
                sm: 'center',
                xs: 'center',
              },
            }}
          >
            Organization
          </Typography>
          <OrganizationCard />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              paddingTop: '20px',
              paddingBottom: '20px',
              textAlign: {
                lg: 'start',
                md: 'start',
                sm: 'center',
                xs: 'center',
              },
            }}
          >
            Company Accounts
          </Typography>
          <OrganizationTable />
        </Box>
      </Box>
    </>
  );
};

export default Organization;
