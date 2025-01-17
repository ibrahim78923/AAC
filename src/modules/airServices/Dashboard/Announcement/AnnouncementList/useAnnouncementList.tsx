import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';

export const useAnnouncementList = (props: any) => {
  const {
    setIsPortalOpen,
    getCustomerAnnouncementData,
    lazyGetCustomerAnnouncementStatus,
  } = props;

  const { user }: any = useAuth();

  const onClose = () => {
    setIsPortalOpen({});
  };

  useEffect(() => {
    getCustomerAnnouncementData();
  }, []);

  const showLoader =
    lazyGetCustomerAnnouncementStatus?.isLoading ||
    lazyGetCustomerAnnouncementStatus?.isFetching;

  const hasError = lazyGetCustomerAnnouncementStatus?.isError;
  const announcements = lazyGetCustomerAnnouncementStatus?.data?.data;

  return {
    onClose,
    user,
    showLoader,
    hasError,
    announcements,
  };
};
