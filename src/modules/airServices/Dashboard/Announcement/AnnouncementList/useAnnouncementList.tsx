import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';

export const useAnnouncementList = (props: any) => {
  const { setIsPortalOpen, getCustomerAnnouncementData } = props;
  const { user }: any = useAuth();

  const onClose = () => {
    setIsPortalOpen({});
  };

  useEffect(() => {
    getCustomerAnnouncementData();
  }, []);

  return {
    onClose,
    user,
  };
};
