import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { truncateText } from '@/utils/avatarUtils';
import { Box, Chip, Typography } from '@mui/material';

export const dashboardDropdownActionsDynamic = (
  setIsDrawerOpen: any,
  copyEmail: any,
) => [
  {
    id: 1,
    title: 'Copy Link',
    handleClick: (closeMenu: any) => {
      copyEmail();
      closeMenu?.();
    },
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD],
  },
  {
    id: 2,
    title: 'Email this dashboard',
    handleClick: (closeMenu: any) => {
      setIsDrawerOpen(true);
      closeMenu?.();
    },
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.SHARE_DASHBOARD],
  },
];

export const dashboardsListsOptionsDynamic = (
  dashboardsList: any,
  router: any,
  setDashboardId: any,
) =>
  !!dashboardsList?.data?.length
    ? dashboardsList?.data?.map((item: any) => ({
        id: item?._id,
        titleSx: { width: '100%' },
        title: (
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant="body2" component={'div'} flex={1}>
              {truncateText(item?.name)}
            </Typography>

            {item?.isDefault && (
              <Chip
                size="small"
                label="Default"
                variant="outlined"
                color={'success'}
              />
            )}
          </Box>
        ),
        handleClick: async (closeMenu: any) => {
          if (!!router?.query?.dashboardId) {
            try {
              await router?.push(AIR_SERVICES?.DASHBOARD);
              setDashboardId(item?._id);
              closeMenu?.();
            } catch (error) {}
          } else {
            setDashboardId(item?._id);
            closeMenu?.();
          }
        },
        permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD],
      }))
    : [
        {
          id: 2,
          title: 'No Dashboard Found',
          handleClick: (closeMenu: any) => {
            closeMenu?.();
          },
          permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD],
        },
      ];
