import { useEffect } from 'react';
import { PAGINATION } from '@/config';

export const useAnnouncementList = (props: any) => {
  const {
    setIsPortalOpen,
    page,
    setPage,
    pageLimit,
    getCustomerAnnouncementData,
  } = props;

  const onClose = () => {
    setIsPortalOpen({});
    setPage?.(PAGINATION?.CURRENT_PAGE);
  };

  useEffect(() => {
    getCustomerAnnouncementData();
  }, [page, pageLimit]);

  return {
    setPage,
    onClose,
  };
};
