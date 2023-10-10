import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AddAssociationsDrawer } from '../../AddAssociationsDrawer';
export const AssociatesListHeader = () => {
  const [openDrawer, setOpenDrawer] = useState<any>(false);
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={'1rem'}
      >
        <Typography variant="h6">Associations</Typography>
        <Box
          gap={'1rem'}
          display={'flex'}
          alignItems={'center'}
          flexWrap={'wrap'}
        >
          <Button
            variant="contained"
            size="large"
            endIcon={<AddCircleOutlineIcon />}
            onClick={() => setOpenDrawer(true)}
          >
            Add Associations
          </Button>
          <AddAssociationsDrawer
            open={openDrawer}
            setDrawerOpen={() => setOpenDrawer(false)}
          />
        </Box>
      </Box>
    </>
  );
};
