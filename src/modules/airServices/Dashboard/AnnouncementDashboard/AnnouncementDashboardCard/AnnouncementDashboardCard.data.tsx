import { DashboardAvatarImage } from '@/assets/images';
import dayjs from 'dayjs';

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
    announcementTime: calculateTimeDifference(announcementItem?.createdAt),
    announcementAvatar: announcementItem?.userName,
  }));
};
const calculateTimeDifference = (createdAt: string) => {
  const currentTime = dayjs();
  const announcementTime = dayjs(createdAt);
  const diffInHours = currentTime.diff(announcementTime, 'hour');

  if (diffInHours === 0) {
    return 'Less than an hour ago';
  } else {
    return `${diffInHours} hours ago`;
  }
};
