import { Box, Button, Drawer } from '@mui/material';
import { Fragment, useState } from 'react';

export const UnassignedWork = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Fragment>
      <Button
        variant={'contained'}
        sx={{ mx: 2 }}
        onClick={() => setOpenDrawer(true)}
      >
        Manage Workload
      </Button>

      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="right"
      >
        <Box
          p={2}
          sx={{
            width: { xs: '100vw', md: '40vw' },
          }}
        >
          Unassigned Work
        </Box>
      </Drawer>
    </Fragment>
  );
};
