import {
  useGetNotificationsQuery,
  useSeenNotificationMutation,
} from '@/services/commonFeatures/notifications';

const useNotificationDropDown = () => {
  const notificationPras = {
    page: 1,
    limit: 10,
  };
  const { data: notificationsList, isLoading: getNotificationLoading } =
    useGetNotificationsQuery(notificationPras);

  const [seenNotification] = useSeenNotificationMutation();

  const handleSeenNotification = (id: any) => {
    seenNotification({ id: id, body: { seen: true } });
  };

  return {
    notificationsList,
    getNotificationLoading,
    handleSeenNotification,
  };
};

export default useNotificationDropDown;
