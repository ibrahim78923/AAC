import { ClipboardTickImage } from '@/assets/images';

export const recentActivitiesDashboardCardData = (recentActivities: any[]) => {
  if (!recentActivities || recentActivities.length === 0) {
    return [];
  }

  return recentActivities.map((activityItem: any) => ({
    id: 1,
    icon: ClipboardTickImage,
    recentActivityName:
      (activityItem?.userDetails?.firstName || '') +
      ' ' +
      (activityItem?.userDetails?.lastName || ''),

    recentActivity: activityItem?.activityType,
    recentActivityRequest: activityItem?.module,
    recentActivityDateTime: activityItem?.createdAt,
    recentActivitySerialNumber: activityItem?.userDetails?.postCode,
    recentActivityModuleName: activityItem?.moduleName,
  }));
};
