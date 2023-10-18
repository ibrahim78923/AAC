import React from 'react';

import { Box, Typography } from '@mui/material';

import { LinkBoldIcon } from '@/assets/icons';

const LinksAssets = () => {
  return (
    <Box>
      <Typography variant="body3" sx={{ fontWeight: '600' }}>
        June
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <LinkBoldIcon />
          <Box>
            <Typography variant="body3" sx={{ fontWeight: '500' }}>
              https://www.myretail.com/products/elektrobritva-philips-s5420-06-20032485
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LinksAssets;
