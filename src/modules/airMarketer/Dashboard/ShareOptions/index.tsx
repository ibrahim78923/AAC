import { Button, Menu, MenuItem, Fade } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import useShareOptions from './useShareOptions';
import EmailThisDashboard from '../EmailThisDashboard';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { DRAWER_TYPES } from '@/constants/strings';

const ShareOptions = ({ selectedDashboard }: any) => {
  const {
    handleClickActions,
    isShowDrawer,
    setIsShowDrawer,
    handleCloseMenuOptions,
    anchorEl,
    openDropDown,
    handleShowEmailDashboard,
    router,
    copyUrl,
  } = useShareOptions(selectedDashboard);

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
          <MenuItem onClick={copyUrl}>Copy URL</MenuItem>

          <MenuItem onClick={handleShowEmailDashboard}>
            Email this dashboard
          </MenuItem>

          <MenuItem
            onClick={() => {
              router?.push({
                pathname: `${AIR_MARKETER?.CREATE_DASHBOARD}`,
                query: {
                  id: selectedDashboard?.dashboard?._id,
                  type: DRAWER_TYPES?.EDIT,
                },
              });
            }}
          >
            Edit
          </MenuItem>
        </Menu>
      </div>
      {isShowDrawer && (
        <EmailThisDashboard
          isOpenDrawer={isShowDrawer}
          setIsDrawerOpen={setIsShowDrawer}
        />
      )}
    </>
  );
};

export default ShareOptions;
