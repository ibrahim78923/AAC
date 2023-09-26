import React, { FC, useEffect } from 'react';
import { Box, Typography, Drawer } from '@mui/material';
import { IconCloseDrawer } from '@/assets/icons';
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
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      sx={{
        '& .MuiDrawer-paperAnchorRight': {
          borderRadius: '30px 0 0 30px',
        },
      }}
    >
      <Box sx={{ width: '508px' }}>
        <Box sx={{ p: '32px 24px', display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ color: '#374151', lineHeight: '1.5' }}>
            Billing Details
          </Typography>
          <Box sx={{ ml: 'auto', cursor: 'pointer' }} onClick={onClose}>
            <IconCloseDrawer />
          </Box>
        </Box>

        <Box sx={{ p: '8px 24px' }}>
          <Typography variant="h4" sx={{ fontWeight: '700', mb: '8px' }}>
            Committed terms
          </Typography>
          <Typography variant="body1">
            12 Month subscription term | Feb 4,2023 to Feb 3,2024
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: '24px' }}>
            <Box sx={{ flex: '1', maxWidth: '229px' }}>
              Sales Growth plan (Include 2 users)
            </Box>
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
        </Box>
      </Box>
    </Drawer>
  );
};

export default BillingDetail;
