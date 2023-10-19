import {
  Grid,
  Typography,
  Box,
  ButtonGroup,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import ViewDetailBackArrowIcon from '@/assets/icons/modules/view-detail-Icon/view-detail-back-arrow-icon';
import { headerStyle } from './Header.styles';
import React, { useState } from 'react';
import { RecievedItemDrawer } from './RecievedItems/RecievedItemDrawer';
import { AddToInventoryDrawer } from './AddToInventory/AddToInventoryDrawer';
import { ActionButtonIcon } from '@/assets/icons';
import Link from 'next/link';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isADrawerOpen, setIsADrawerOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
          <Button
            sx={headerStyle?.actionBtn}
            endIcon={<ActionButtonIcon />}
            onClick={handleClick}
          >
            Action
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <Link href="/air-services/assets/purchase-orders/actionEdit">
              <MenuItem>Edit</MenuItem>
            </Link>

            <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              delete
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </>
  );
}
