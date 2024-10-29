import { Button, Menu, MenuItem, Fade } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import useActionsOptions from './useActionsOptions';
import { AIR_SALES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES } from '@/routesConstants/paths';
import { DRAWER_TYPES } from '@/constants/strings';
import EmailThisDashboard from '../EmailThisDashboard';

const ActionsOptions = ({ selectedDashboard }: any) => {
  const {
    handleShowEmailDashboard,
    handleCloseMenuOptions,
    handleClickActions,
    setIsShowDrawer,
    isShowDrawer,
    openDropDown,
    currentUser,
    anchorEl,
    copyUrl,
    router,
  } = useActionsOptions(selectedDashboard);

  return (
    <>
      <div>
        <Button
          onClick={handleClickActions}
          className="small"
          variant="outlined"
          color="inherit"
          sx={{ minWidth: '112px', width: '100%' }}
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
          <PermissionsGuard
            permissions={[AIR_SALES_DASHBOARD_PERMISSIONS?.SHARE_VIA_EMAIL]}
          >
            <MenuItem onClick={handleShowEmailDashboard}>
              Email this dashboard
            </MenuItem>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SALES_DASHBOARD_PERMISSIONS?.EDIT_DASBOARD]}
          >
            <MenuItem
              onClick={() => {
                router?.push({
                  pathname: `${AIR_SALES?.CREATE_DASHBOARD}`,
                  query: {
                    id: selectedDashboard?.dashboard?._id,
                    userId: currentUser,
                    type: DRAWER_TYPES?.EDIT,
                    mode: 'dashboard_create',
                  },
                });
              }}
            >
              Edit
            </MenuItem>
          </PermissionsGuard>
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

export default ActionsOptions;
