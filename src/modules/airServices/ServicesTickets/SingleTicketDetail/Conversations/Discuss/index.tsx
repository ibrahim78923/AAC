import { Box, Drawer } from '@mui/material';
// import { useState } from 'react';

export const Discuss = (props: any) => {
  const [isDrawerOpen, setIsDrawerOpen] = props();

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen()}
      PaperProps={{ style: { background: 'transparent' } }}
    >
      <Box></Box>
    </Drawer>
  );
};
