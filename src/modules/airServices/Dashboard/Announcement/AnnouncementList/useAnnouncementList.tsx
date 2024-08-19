import { useEffect } from 'react';

export const useAnnouncementList = (props: any) => {
  const { setIsPortalOpen, getCustomerAnnouncementData } = props;

  const onClose = () => {
    setIsPortalOpen({});
  };

  useEffect(() => {
    getCustomerAnnouncementData();
  }, []);

  return {
    onClose,
  };
};
