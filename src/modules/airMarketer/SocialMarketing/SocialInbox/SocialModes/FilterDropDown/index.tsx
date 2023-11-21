import React from 'react';

import { Box, Menu, MenuItem } from '@mui/material';

import { menuItemsData } from './FilterDropDown';

import { v4 as uuidv4 } from 'uuid';

const FilterDropdown = ({
  anchorEl,
  actionMenuOpen,
  handleClose,

  menuId,
}: any) => {
  return (
    <Box>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={actionMenuOpen}
        onClose={handleClose}
      >
        {menuItemsData?.map((menu: any) => (
          <MenuItem key={uuidv4()} onClick={handleClose}>
            {menu?.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default FilterDropdown;
