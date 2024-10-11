import { Typography } from '@mui/material';
import { Loyalty } from './Loyalty';
import { GiftCards } from './GiftCards';
import { RolesAndRight } from '../RolesAndRight';
import { UserManagement } from '../UserManagement';

export const SETTINGS_MODULES = {
  GIFT_CARDS: 'Gift cards',
  LOYALTY: 'Loyalty',
  ROLE_AND_RIGHTS: 'Role and Rights',
  USER_MANAGEMENT: 'User Management',
};

export const renderSettingsModule: any = {
  [SETTINGS_MODULES?.LOYALTY]: <Loyalty />,
  [SETTINGS_MODULES?.GIFT_CARDS]: <GiftCards />,
  [SETTINGS_MODULES?.ROLE_AND_RIGHTS]: <RolesAndRight />,
  [SETTINGS_MODULES?.USER_MANAGEMENT]: <UserManagement />,
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
      color: 'slateBlue.main',
      variant: 'body2',
      padding: 0.5,
      borderRadius: 1,
      marginY: 1.5,
      sx: {
        cursor: 'pointer',
        backgroundColor:
          activeModule === SETTINGS_MODULES?.LOYALTY ? 'custom.pale_gray' : '',
        '&:hover': { backgroundColor: 'custom.pale_gray' },
      },
      onClick: () => setActiveModule(SETTINGS_MODULES?.LOYALTY),
    },
    heading: SETTINGS_MODULES?.LOYALTY,
    component: Typography,
  },
  {
    id: 3,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'body2',
      padding: 0.5,
      borderRadius: 1,
      marginY: 1.5,
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
    heading: SETTINGS_MODULES?.GIFT_CARDS,
    component: Typography,
  },
  {
    id: 4,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'body2',
      padding: 0.5,
      borderRadius: 1,
      marginY: 1.5,
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
    heading: SETTINGS_MODULES?.ROLE_AND_RIGHTS,
    component: Typography,
  },
  {
    id: 5,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'body2',
      padding: 0.5,
      borderRadius: 1,
      marginY: 1.5,
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
    heading: SETTINGS_MODULES?.USER_MANAGEMENT,
    component: Typography,
  },
];
