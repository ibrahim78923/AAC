import { DocumentIcon, FileJpgIcon } from '@/assets/icons';
import { Box, Typography } from '@mui/material';
import React from 'react';

const DocumentAssets = () => {
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
          <FileJpgIcon />
          <Box>
            <Typography variant="body3" sx={{ fontWeight: '500' }}>
              Technology concept
            </Typography>
            <Typography sx={{ fontSize: '10px' }}>14 April 2022</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Typography variant="body3" sx={{ fontWeight: '500' }}>
            1.3 MB
          </Typography>
          <DocumentIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default DocumentAssets;
