import { ArrowLeftIcon } from '@/assets/icons';
import { Box, Button, Typography } from '@mui/material';
import { ImportLocation } from './ImportLocation';
import { useState } from 'react';

export const Location = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box
          sx={{ cursor: 'pointer' }}
          display={'flex'}
          alignItems={'center'}
          gap={1}
        >
          <ArrowLeftIcon />
          <Typography variant="h5">Location</Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <Button variant="outlined" onClick={() => setIsDrawerOpen(true)}>
            Import
          </Button>
          <Button variant="contained">New Location</Button>
        </Box>
      </Box>
      <ImportLocation
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
      />
    </>
  );
};
