import { AIR_CUSTOMER_PORTAL } from '@/constants';

import React from 'react';
import { useApprovals } from './useApprovals';
import ApprovalsTabs from './ApprovalsTabs';

import { Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Approvals = () => {
  const { router } = useApprovals();
  return (
    <>
      <Box display="flex" alignItems="center" flexWrap="wrap" gap={1} mb={4}>
        <ArrowBackIcon
          onClick={() => {
            router.push(AIR_CUSTOMER_PORTAL?.CUSTOMER_PORTAL_DASHBOARD);
          }}
          sx={{ cursor: 'pointer' }}
        />
        <Typography variant="h3">Approvals</Typography>
      </Box>

      <ApprovalsTabs />
    </>
  );
};

export default Approvals;
