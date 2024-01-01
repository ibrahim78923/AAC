import { EyeIcon } from '@/assets/icons';
import { ExportButton } from '@/components/ExportButton';
import { Box, Button, Divider, Typography } from '@mui/material';

import FilterListIcon from '@mui/icons-material/FilterList';

import { useState } from 'react';
import { ReceiveFilter } from '../ReceiveFilterDrawer';

export const ReceiveHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant="h4">Shops</Typography>
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <EyeIcon />
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<FilterListIcon />}
            sx={{ borderRadius: '0.5rem' }}
            onClick={() => setDrawerOpen(true)}
          >
            Filters
          </Button>
          <ExportButton />
        </Box>
      </Box>
      <Box mt={2}>
        <Divider />
      </Box>
      <ReceiveFilter drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
};
