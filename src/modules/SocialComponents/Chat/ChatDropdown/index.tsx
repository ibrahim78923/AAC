import React from 'react';

import { Box, Menu, MenuItem } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';

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
        {menuData.map((menu: any) => (
          <MenuItem onClick={menu.handler} key={uuidv4()}>
            {menu.menuLabel}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ChatDropdown;
