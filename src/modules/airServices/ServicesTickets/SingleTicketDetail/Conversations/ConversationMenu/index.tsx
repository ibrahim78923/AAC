import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { AddWhiteBgIcon } from '@/assets/icons';
import { menuOptionsAddConversation } from '../Conversation.data';

const ConversationMenu = ({
  open,
  handleClickButtonMenu,
  addConversation,
  handleCloseButtonMenu,
  setSelectedItem,
}) => {
  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddWhiteBgIcon />}
        id="conversation-button"
        aria-controls={open ? 'conversation-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickButtonMenu}
        sx={{ marginLeft: 'auto' }}
      >
        Add Conversation
      </Button>
      <Menu
        id="conversation-menu"
        anchorEl={addConversation}
        open={open}
        onClose={handleCloseButtonMenu}
        sx={{
          '& .MuiList-root': {
            width: 280,
          },
        }}
        MenuListProps={{
          'aria-labelledby': 'conversation-button',
        }}
      >
        {menuOptionsAddConversation?.map((item) => (
          <MenuItem
            onClick={(e) => {
              handleCloseButtonMenu(e);
              setSelectedItem(item?.value);
            }}
            key={uuidv4()}
            value={item?.value}
          >
            {item?.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ConversationMenu;
