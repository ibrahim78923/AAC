import React from 'react';

import { Box, Typography, Theme, useTheme } from '@mui/material';

import OrganizationCard from './OrganizationSubFolder/OrganizationCard';
import OrganizationTable from './OrganizationSubFolder/OrganizationTable';

const Organization = () => {
  const theme = useTheme<Theme>();
  return (
    <>
      <Box
        sx={{
          background: `${theme?.palette?.common.white}`,
          borderRadius: '8px',
        }}
      >
        <Box
          sx={{
            border: `1px solid ${theme?.palette?.grey[700]}`,
            padding: '0.7rem',
          }}
        >
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
