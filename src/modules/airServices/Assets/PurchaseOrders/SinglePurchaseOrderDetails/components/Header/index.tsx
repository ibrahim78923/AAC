import { Grid, Typography, Box, ButtonGroup, Button } from '@mui/material';
import ViewDetailBackArrowIcon from '@/assets/icons/modules/view-detail-Icon/view-detail-back-arrow-icon';
import { headerStyle } from './Header.styles';
import { useState } from 'react';
import { RecievedItemDrawer } from './RecievedItems/RecievedItemDrawer';
import { AddToInventoryDrawer } from './AddToInventory/AddToInventoryDrawer';

export default function Header() {
  // const [boolVariable, setBoolVariable] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isADrawerOpen, setIsADrawerOpen] = useState<boolean>(false);
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={'space-between'}
        display={'flex'}
        flexDirection={'row'}
        maxWidth={'100%'}
      >
        <Grid
          item
          sx={{
            display: 'flex',
          }}
        >
          <ViewDetailBackArrowIcon />
          <Typography variant="h6" component="span">
            Dell Purchase Order Details
          </Typography>
        </Grid>
        <Grid item sx={{ display: 'flex' }}>
          <Box sx={headerStyle?.iconBoxStyling}>
            <ButtonGroup>
              <Button onClick={() => setIsDrawerOpen(true)}>
                Recieved item
              </Button>
            </ButtonGroup>
          </Box>
          <RecievedItemDrawer
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
          <Box sx={headerStyle?.iconBoxStyling}>
            <ButtonGroup>
              <Button onClick={() => setIsADrawerOpen(true)}>
                Add to Inventory
              </Button>
            </ButtonGroup>
            <AddToInventoryDrawer
              isADrawerOpen={isADrawerOpen}
              setIsADrawerOpen={setIsADrawerOpen}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
