import * as React from 'react';

import Button from '@mui/material/Button';

import Menu from '@mui/material/Menu';

import MenuItem from '@mui/material/MenuItem';

import Fade from '@mui/material/Fade';

import useMenuOptions from './useMenuOptions';

const MenuItems = () => {
  const {
    handleClickActions,
    handleShowGenerateInvoive,
    handleShowViewBillingDetails,
    handleCloseMenuOptions,
    anchorEl,
    openDropDown,
    handleShowEditDetails,
  } = useMenuOptions();

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={openDropDown ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openDropDown ? 'true' : undefined}
        onClick={handleClickActions}
      >
        Actions
      </Button>

      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={openDropDown}
        onClose={handleCloseMenuOptions}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleShowGenerateInvoive}>
          Generate Invoice
        </MenuItem>

        <MenuItem onClick={handleShowViewBillingDetails}>
          View Billing Detail
        </MenuItem>

        <MenuItem onClick={handleShowEditDetails}>Edit</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuItems;
