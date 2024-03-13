import { DashboardAvatarImage } from '@/assets/images';
import { formatTimeDifference } from '@/utils/dateTime';

export const announcementDashboardCardData = (customerAnnouncement: any[]) => {
  if (!customerAnnouncement || customerAnnouncement.length === 0) {
    return [];
  }

  return customerAnnouncement.map((announcementItem: any) => ({
    id: announcementItem?._id,
    icon: DashboardAvatarImage,
    announcement: (
      <div dangerouslySetInnerHTML={{ __html: announcementItem?.title }} />
    ),
    announcementTime: formatTimeDifference(announcementItem?.createdAt),
    announcementAvatar: announcementItem?.userName,
  }));
};
