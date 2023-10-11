import * as React from 'react';

import { Button, Menu, MenuItem, Fade } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import EmailDashboard from '../Email';
import useActions from './useActions';

const Actions = () => {
  const {
    handleClickActions,
    isShowDrawer,
    handleShowCopyUrl,
    handleCloseDrawer,
    handleCloseMenuOptions,
    anchorEl,
    openDropDown,
    setIsShowEmailDashboard,
    setIsShowEditDashboard,
  } = useActions();
  return (
    <>
      <div>
        <Button
          onClick={handleClickActions}
          sx={{ border: '1px solid #D1D5DB', color: '#6B7280' }}
        >
          <ArrowDropDown />
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
          <MenuItem onClick={handleShowCopyUrl}>Copy URL</MenuItem>

          <MenuItem
            onClick={() => {
              setIsShowEmailDashboard(true);
            }}
          >
            Email this dashboard
          </MenuItem>

          <MenuItem
            onClick={() => {
              setIsShowEditDashboard(true);
            }}
          >
            Edit
          </MenuItem>
        </Menu>
      </div>
      {isShowDrawer && (
        <EmailDashboard
          isOpenDrawer={isShowDrawer}
          onClose={handleCloseDrawer}
        />
      )}
    </>
  );
};

export default Actions;
