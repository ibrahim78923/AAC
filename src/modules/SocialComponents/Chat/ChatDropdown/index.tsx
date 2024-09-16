import React from 'react';

import { Box, Menu, MenuItem } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';

interface MenuI {
  handler: () => void;
  menuLabel: string;
  selected?: boolean;
}

const ChatDropdown = ({
  anchorEl,
  actionMenuOpen,
  handleClose,
  menuData,
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
        {menuData?.map((menu: MenuI) => (
          <MenuItem
            onClick={menu?.handler}
            key={uuidv4()}
            selected={menu.selected}
          >
            {menu?.menuLabel}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ChatDropdown;
