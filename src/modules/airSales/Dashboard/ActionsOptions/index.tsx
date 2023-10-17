import { Button, Menu, MenuItem, Fade, useTheme } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import EmailDashboard from '../Email';
import useActionsOptions from './useActionsOptions';

const ActionsOptions = () => {
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
  } = useActionsOptions();
  const theme = useTheme();
  return (
    <>
      <div>
        <Button
          onClick={handleClickActions}
          sx={{
            border: `1px solid ${theme?.palette?.custom?.dark}`,
            color: theme?.palette?.custom?.main,
            width: '112px',
            height: '36px',
            marginRight: '10px',
          }}
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

export default ActionsOptions;
