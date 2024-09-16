import {
  Button,
  Menu,
  MenuItem,
  Fade,
  Typography,
  Stack,
  CircularProgress,
  Box,
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import useCreateDashboardOptions from './useCreateDashboardOptions';
import { CheckMarkIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { capitalizeFirstLetters, getSession } from '@/utils';

const CreateDashboardOptions = (props: any) => {
  const { listData, selectedDashboard, isLoading } = props;

  const {
    handleCloseMenuOptions,
    handleMenuItemClick,
    handleClickActions,
    handelNavigate,
    openDropDown,
    anchorEl,
    theme,
  } = useCreateDashboardOptions(selectedDashboard);
  const { user }: any = getSession();
  const currentUser = user?._id;

  return (
    <div>
      <Button
        className="small"
        variant="outlined"
        color="inherit"
        sx={{ padding: '0px 18px 0px 18px' }}
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
          {isLoading ? (
            <Box sx={{ display: 'grid', placeItems: 'center', p: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            listData?.map((dashboard: any) => (
              <MenuItem
                key={dashboard?._id}
                onClick={() => handleMenuItemClick(dashboard?._id)}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width={'100%'}
                >
                  <Typography variant="body2">
                    {capitalizeFirstLetters(dashboard?.name)}
                  </Typography>
                  {dashboard?.isDefault &&
                    currentUser === dashboard?.createdBy && (
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        gap={1}
                        sx={{
                          background: theme?.palette?.custom?.success_light,
                          color: theme?.palette?.success?.main,
                          borderRadius: '50px',
                          px: 1,
                        }}
                      >
                        <Typography variant="body3">Default</Typography>
                        <CheckMarkIcon />
                      </Stack>
                    )}
                </Stack>
              </MenuItem>
            ))
          )}
        </PermissionsGuard>
        <Button
          sx={{ color: theme?.palette?.grey[500], margin: '10px' }}
          onClick={handelNavigate}
          variant="outlined"
          color="inherit"
        >
          Manage Dashboards
        </Button>
      </Menu>
    </div>
  );
};

export default CreateDashboardOptions;
