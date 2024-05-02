import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { Box, Button, Chip } from '@mui/material';

export const dropDownMenus = (setIsDrawerOpen: any) => [
  {
    id: 1,
    title: 'Copy URL',
    handleClick: (closeMenu: any) => {
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

export const dashboardFunction = (theme: any, router: any) => [
  {
    title: (
      <Box display={'flex'} gap={'3rem'} alignItems={'center'}>
        Services
        <Chip label="Default" variant="outlined" color={'success'} />
      </Box>
    ),
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD],
  },
  {
    title: 'Dashboards List',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD],
  },
  {
    title: (
      <Button
        sx={{
          border: `0.063rem solid ${theme?.palette?.grey?.[600]}`,
          color: theme?.palette?.grey?.[600],
        }}
        onClick={() => router?.push(AIR_SERVICES?.MANAGE_DASHBOARD)}
      >
        Manage Dashboards
      </Button>
    ),
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD],
  },
];
