import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AddAssociationsDrawer } from '../../AddAssociationsDrawer';
import { styles } from '../../Associations.styles';
export const AssociatesListHeader = () => {
  const [openDrawer, setOpenDrawer] = useState<any>(false);
  return (
    <>
      <Box sx={styles?.headerContainer}>
        <Typography variant="h6">Associations</Typography>
        <Button
          variant="contained"
          endIcon={<AddCircleOutlineIcon />}
          onClick={() => setOpenDrawer(true)}
        >
          Add Associations
        </Button>
      </Box>
      <AddAssociationsDrawer
        open={openDrawer}
        setDrawerOpen={() => setOpenDrawer(false)}
      />
    </>
  );
};
