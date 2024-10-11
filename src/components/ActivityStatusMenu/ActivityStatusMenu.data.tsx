import { ACTIVITY_STATUS_MENU } from '@/constants';

export const getActivityStatusMenuColors = (
  activityStatus: string,
  theme: any,
) => {
  switch (activityStatus) {
    case ACTIVITY_STATUS_MENU?.ACTIVE:
      return {
        backgroundColor: 'graph.published',
        color: 'success.main',
        textColor: theme?.palette?.success?.main,
      };
    case ACTIVITY_STATUS_MENU?.INACTIVE:
      return {
        backgroundColor: 'custom.error_light',
        color: 'error.main',
        textColor: theme?.palette?.error?.main,
      };
    default:
      return {
        backgroundColor: 'custom.warning_light',
        color: 'warning.main',
        textColor: theme?.palette?.warning?.main,
      };
  }
};

export const getActivityStatusItemsColor = (statusValue: string) => {
  switch (statusValue) {
    case ACTIVITY_STATUS_MENU?.ACTIVE:
      return {
        colorItems: 'success.main',
        iconColorItems: 'success',
      };
    case ACTIVITY_STATUS_MENU?.INACTIVE:
      return {
        colorItems: 'error.main',
        iconColorItems: 'error',
      };
    default:
      return {
        colorItems: 'warning.main',
        iconColorItems: 'warning',
      };
  }
};
