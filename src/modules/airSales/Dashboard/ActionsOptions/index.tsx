import { Button, Menu, MenuItem, Fade } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import EmailDashboard from '../Email';
import useActionsOptions from './useActionsOptions';
import { AIR_SALES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const ActionsOptions = ({ setIsShowEditDashboard }: any) => {
  const {
    handleClickActions,
    isShowDrawer,
    handleShowCopyUrl,
    handleCloseDrawer,
    handleCloseMenuOptions,
    anchorEl,
    openDropDown,
    handleShowEmailDashboard,
  } = useActionsOptions();

  return (
    <>
      <div>
        <Button
          onClick={handleClickActions}
          className="small"
          variant="outlined"
          color="inherit"
          sx={{
            width: '112px',

            marginRight: '10px',
          }}
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
                setIsShowEditDashboard(true);
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
