import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { BillingDetailI } from './BillingDetail.interface';

const BillingDetail: FC<BillingDetailI> = ({ open, onClose }) => {
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
        <Box>Feb 2,2023</Box>
        <Box>After £400.00 custom</Box>
      </Box>
    </CommonDrawer>
  );
};

export default BillingDetail;
