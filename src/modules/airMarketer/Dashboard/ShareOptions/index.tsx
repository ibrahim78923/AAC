import { Button, Menu, MenuItem, Fade } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import useShareOptions from './useShareOptions';
import Email from '../Email';

const ShareOptions = ({ setIsShowEditDashboard }: any) => {
  const {
    handleClickActions,
    isShowDrawer,
    handleShowCopyUrl,
    handleCloseDrawer,
    handleCloseMenuOptions,
    anchorEl,
    openDropDown,
    handleShowEmailDashboard,
  } = useShareOptions();

  return (
    <>
      <div>
        <Button
          className="small"
          color="inherit"
          variant="outlined"
          onClick={handleClickActions}
          sx={{ width: { sm: '112px', xs: '100%' } }}
        >
          Actions
          <ArrowDropDown />
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

          <MenuItem onClick={handleShowEmailDashboard}>
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
        <Email isOpenDrawer={isShowDrawer} onClose={handleCloseDrawer} />
      )}
    </>
  );
};

export default ShareOptions;
