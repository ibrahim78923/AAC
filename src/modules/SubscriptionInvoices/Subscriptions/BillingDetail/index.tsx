import React, { FC, useEffect } from 'react';

import { Box, Typography } from '@mui/material';

import CommonDrawer from '@/components/Drawer';

interface BillingDetailProps {
  open: boolean;
  onClose: () => void;
}

const BillingDetail: FC<BillingDetailProps> = ({ open, onClose }) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {}, []);

  /* RENDER COMPONENT
  -------------------------------------------------------------------------------------*/
  return (
    <CommonDrawer title="Billing Details" isDrawerOpen={open} onClose={onClose}>
      <Typography variant="h5" sx={{ fontWeight: '700', mb: '8px' }}>
        Committed terms
      </Typography>
      <Typography variant="body1">
        12 Month subscription term | Feb 4,2023 to Feb 3,2024
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: '24px' }}>
        <Typography variant="subtitle2">
          Sales Growth plan (Include 2 users)
        </Typography>
        <Box sx={{ ml: 'auto', fontSize: '16px', fontWeight: '700' }}>
          £ 400.00
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: '14px',
        }}
      >
        <Box sx={{}}>Feb 2,2023</Box>
        <Box sx={{}}>After £400.00 custom</Box>
      </Box>
    </CommonDrawer>
  );
};

export default BillingDetail;
