import {
  useGetNotificationsQuery,
  useSeenNotificationMutation,
} from '@/services/commonFeatures/notifications';

const useNotificationDropDown = () => {
  const { data: notificationsList, isLoading: getNotificationLoading } =
    useGetNotificationsQuery({});

  const [seenNotification, { isLoading: patchNotificationsLoading }] =
    useSeenNotificationMutation();

  const handleSeenNotification = (id: any) => {
    seenNotification({ id: id, body: { seen: true } });
  };

  return {
    notificationsList,
    getNotificationLoading,
    patchNotificationsLoading,
    handleSeenNotification,
  };
};

export default useNotificationDropDown;
