import { Button, Menu, MenuItem, Fade, useTheme } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import useCreateDashboardOptions from './useCreateDashboardOptions';
import { CheckMarkIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { useRouter } from 'next/router';
import { AIR_SALES } from '@/routesConstants/paths';

const CreateDashboardOptions = () => {
  const { handleCloseMenuOptions, anchorEl, openDropDown, handleClickActions } =
    useCreateDashboardOptions();
  const theme = useTheme();

  const router = useRouter();

  const handelNavigate = () => {
    router?.push({
      pathname: `${AIR_SALES?.MANAGE_DASHBOARD}`,
      query: { id: 'sdas78d78as6d78asd6' },
    });
  };

  return (
    <div>
      <Button
        className="small"
        variant="outlined"
        color="inherit"
        sx={{
          padding: '0px 18px 0px 18px',
        }}
        onClick={handleClickActions}
      >
        Dashboards
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
        <PermissionsGuard
          permissions={[AIR_SALES_DASHBOARD_PERMISSIONS?.SET_DEFAULT]}
        >
          <MenuItem>
            Sales_1{' '}
            <Button
              sx={{ marginLeft: '30px', border: 'none' }}
              className="small"
              variant="outlined"
            >
              Default
              <CheckMarkIcon />
            </Button>
          </MenuItem>
          <MenuItem>Sales_2</MenuItem>
          <MenuItem>Sales_3</MenuItem>
          <MenuItem>Sales_4</MenuItem>
        </PermissionsGuard>
        <MenuItem onClick={handelNavigate}>
          <Button
            sx={{
              color: theme?.palette?.grey[500],
            }}
            variant="outlined"
            color="inherit"
          >
            Manage Dashboards
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default CreateDashboardOptions;
