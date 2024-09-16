import { Button, Menu, MenuItem, Fade } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import EmailDashboard from '../Email';
import useActionsOptions from './useActionsOptions';
import { AIR_SALES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES } from '@/routesConstants/paths';
import { useRouter } from 'next/router';
import { DRAWER_TYPES } from '@/constants/strings';

const ActionsOptions = ({ selectedDashboard }: any) => {
  const {
    handleShowEmailDashboard,
    handleCloseMenuOptions,
    handleClickActions,
    handleCloseDrawer,
    handleShowCopyUrl,
    isShowDrawer,
    openDropDown,
    anchorEl,
  } = useActionsOptions();
  const router = useRouter();
  return (
    <>
      <div>
        <Button
          onClick={handleClickActions}
          className="small"
          variant="outlined"
          color="inherit"
          sx={{ width: '112px' }}
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
                    type: DRAWER_TYPES?.EDIT,
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
        <EmailDashboard
          isOpenDrawer={isShowDrawer}
          onClose={handleCloseDrawer}
        />
      )}
    </>
  );
};

export default ActionsOptions;
