import { EyeIcon } from '@/assets/icons';
import { Box, Button, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ExportButton } from '@/components/ExportButton';
import { useState } from 'react';
import { PayFilterDrawer } from '../PayFilterDrawer';

export const PayHeader = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Box
      display={'flex'}
      flexWrap={'wrap'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box>
        <Typography variant="h4">Shops</Typography>
      </Box>
      <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
        <EyeIcon />
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<FilterListIcon />}
          onClick={() => setOpenDrawer(true)}
        >
          Filter
        </Button>
        <ExportButton />
      </Box>
      <PayFilterDrawer
        isDrawerOpen={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Box>
  );
};
