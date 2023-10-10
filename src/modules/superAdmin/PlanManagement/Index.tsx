import React from 'react';

import Link from 'next/link';

import { Button, Typography, Box } from '@mui/material';

import AppAvatarGroup from '@/components/AvatarGroup';

import PlanDetails from './PlanDetails';

import { avatarGroupMockData } from './PlanManagement.data';

const PlanManagement = () => {
  return (
    <Box sx={styles.main}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1}
      >
        <Typography variant="h4" sx={styles.planManagementHeading}>
          Plan Management
        </Typography>

        <Box sx={styles.linkStyle}>
          <Link href={'/super-admin/plan-management/add-plan'}>
            <Button variant="contained" fullWidth>
              Add Plan
            </Button>
          </Link>
        </Box>
      </Box>

      <br />
      <AppAvatarGroup data={avatarGroupMockData} />

      <PlanDetails />
    </Box>
  );
};

export default PlanManagement;

const styles = {
  main: {
    boxShadow: '0px 1px 3px 0px rgba(16, 24, 40, 0.1)',
    padding: '1.5rem',
  },
  planManagementHeading: {
    fontWeight: 600,
    lineHeight: '30px',
    letterSpacing: '-2%',
  },
  linkStyle: {
    '@media (max-width: 400px)': {
      width: '100%',
    },
  },
};
