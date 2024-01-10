import { Typography } from '@mui/material';

export const SETTINGS_MODULES = {
  GENERAL: 'general',
  SHOP_AND_PROFILES: 'shop and profiles',
  GIFTCARD: 'giftcard',
  LOYALTY: 'loyalty',
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
    heading: 'Account',
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
        backgroundColor:
          activeModule === SETTINGS_MODULES?.GENERAL ? 'custom.pale_gray' : '',
        '&:hover': { backgroundColor: 'custom.pale_gray' },
      },
      onClick: () => setActiveModule(SETTINGS_MODULES?.GENERAL),
    },
    heading: 'General',
    component: Typography,
  },
  {
    id: 3,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'h6',
    },
    heading: 'Management',
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
        backgroundColor:
          activeModule === SETTINGS_MODULES?.SHOP_AND_PROFILES
            ? 'custom.pale_gray'
            : '',
        '&:hover': { backgroundColor: 'custom.pale_gray' },
      },
      onClick: () => setActiveModule(SETTINGS_MODULES?.SHOP_AND_PROFILES),
    },
    heading: 'Shop / Profiles',
    component: Typography,
  },
  {
    id: 5,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'h6',
    },
    heading: 'Modules',
    component: Typography,
  },
  {
    id: 6,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'body2',
      padding: 0.5,
      borderRadius: 1,
      marginY: 1.5,
      sx: {
        backgroundColor:
          activeModule === SETTINGS_MODULES?.GIFTCARD ? 'custom.pale_gray' : '',
        '&:hover': { backgroundColor: 'custom.pale_gray' },
      },
      onClick: () => setActiveModule(SETTINGS_MODULES?.GIFTCARD),
    },
    heading: 'GiftCard',
    component: Typography,
  },
  {
    id: 7,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'body2',
      padding: 0.5,
      borderRadius: 1,
      sx: {
        backgroundColor:
          activeModule === SETTINGS_MODULES?.LOYALTY ? 'custom.pale_gray' : '',
        '&:hover': { backgroundColor: 'custom.pale_gray' },
      },
      onClick: () => setActiveModule(SETTINGS_MODULES?.LOYALTY),
    },
    heading: 'Loyalty',
    component: Typography,
  },
];
