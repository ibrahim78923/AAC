import { Typography } from '@mui/material';
import { Permissions } from '@/constants/permissions';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import dynamic from 'next/dynamic';

const Loyalty = dynamic(() => import('./Loyalty'), {
  ssr: false,
});

const GiftCards = dynamic(() => import('./GiftCards'), {
  ssr: false,
});

const RolesAndRight = dynamic(() => import('../RoleAndRights'), {
  ssr: false,
});

const UserManagement = dynamic(() => import('../UserManagement'), {
  ssr: false,
});

export const SETTINGS_MODULES = {
  GIFT_CARDS: 'Gift cards',
  LOYALTY: 'Loyalty',
  ROLE_AND_RIGHTS: 'Role and Rights',
  USER_MANAGEMENT: 'User Management',
};

export const renderSettingsModule: any = {
  [SETTINGS_MODULES?.LOYALTY]: (
    <PermissionsGuard
      permissions={Permissions?.AIR_LOYALTY_PROGRAM_SETTINGS_LOYALTY}
    >
      <Loyalty />
    </PermissionsGuard>
  ),
  [SETTINGS_MODULES?.GIFT_CARDS]: (
    <PermissionsGuard
      permissions={Permissions?.AIR_LOYALTY_PROGRAM_SETTINGS_GIFT_CARD}
    >
      <GiftCards />
    </PermissionsGuard>
  ),
  [SETTINGS_MODULES?.ROLE_AND_RIGHTS]: (
    <PermissionsGuard
      permissions={Permissions?.AIR_LOYALTY_PROGRAM_SETTINGS_ROLES_AND_RIGHT}
    >
      <RolesAndRight />
    </PermissionsGuard>
  ),
  [SETTINGS_MODULES?.USER_MANAGEMENT]: (
    <PermissionsGuard
      permissions={Permissions?.AIR_LOYALTY_PROGRAM_SETTINGS_USER_MANAGEMENT}
    >
      <UserManagement />
    </PermissionsGuard>
  ),
};

export const tabComponentProps = {
  color: 'slateBlue.main',
  variant: 'body2',
  padding: 1,
  borderRadius: 2,
  marginY: 1,
};

export const settingsDataDynamic = (
  setActiveModule: any,
  activeModule: any,
) => [
  {
    id: 1,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'h6',
    },
    heading: 'Modules',
    component: Typography,
  },
  {
    id: 2,
    componentProps: {
      ...tabComponentProps,
      sx: {
        cursor: 'pointer',
        backgroundColor:
          activeModule === SETTINGS_MODULES?.LOYALTY ? 'custom.pale_gray' : '',
        '&:hover': { backgroundColor: 'custom.pale_gray' },
      },
      onClick: () => setActiveModule(SETTINGS_MODULES?.LOYALTY),
    },
    permissions: Permissions?.AIR_LOYALTY_PROGRAM_SETTINGS_LOYALTY,
    heading: SETTINGS_MODULES?.LOYALTY,
    component: Typography,
  },
  {
    id: 3,
    componentProps: {
      ...tabComponentProps,
      sx: {
        cursor: 'pointer',
        backgroundColor:
          activeModule === SETTINGS_MODULES?.GIFT_CARDS
            ? 'custom.pale_gray'
            : '',
        '&:hover': { backgroundColor: 'custom.pale_gray' },
      },
      onClick: () => setActiveModule(SETTINGS_MODULES?.GIFT_CARDS),
    },
    permissions: Permissions?.AIR_LOYALTY_PROGRAM_SETTINGS_GIFT_CARD,
    heading: SETTINGS_MODULES?.GIFT_CARDS,
    component: Typography,
  },
  {
    id: 4,
    componentProps: {
      ...tabComponentProps,
      sx: {
        cursor: 'pointer',
        backgroundColor:
          activeModule === SETTINGS_MODULES?.ROLE_AND_RIGHTS
            ? 'custom.pale_gray'
            : '',
        '&:hover': { backgroundColor: 'custom.pale_gray' },
      },
      onClick: () => setActiveModule(SETTINGS_MODULES?.ROLE_AND_RIGHTS),
    },
    permissions: Permissions?.AIR_LOYALTY_PROGRAM_SETTINGS_ROLES_AND_RIGHT,
    heading: SETTINGS_MODULES?.ROLE_AND_RIGHTS,
    component: Typography,
  },
  {
    id: 5,
    componentProps: {
      ...tabComponentProps,
      sx: {
        cursor: 'pointer',
        backgroundColor:
          activeModule === SETTINGS_MODULES?.USER_MANAGEMENT
            ? 'custom.pale_gray'
            : '',
        '&:hover': { backgroundColor: 'custom.pale_gray' },
      },
      onClick: () => setActiveModule(SETTINGS_MODULES?.USER_MANAGEMENT),
    },
    permissions: Permissions?.AIR_LOYALTY_PROGRAM_SETTINGS_USER_MANAGEMENT,
    heading: SETTINGS_MODULES?.USER_MANAGEMENT,
    component: Typography,
  },
];
