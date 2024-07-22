import { useState } from 'react';
import { useGetCustomerAnnouncementQuery } from '@/services/airServices/dashboard';
import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';

export const useAnnouncementList = (props: any) => {
  const { setIsPortalOpen } = props;
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const router = useRouter();
  const getCustomerAnnouncementApiParameter = {
    queryParams: {
      page: page,
      limit: pageLimit,
    },
  };

  const { data, isLoading, isFetching, isError } =
    useGetCustomerAnnouncementQuery(getCustomerAnnouncementApiParameter, {
      refetchOnMountOrArgChange: true,
    });

  const onClose = () => {
    setIsPortalOpen({});
    setPage(PAGINATION?.CURRENT_PAGE);
  };

  return {
    data,
    isLoading,
    isFetching,
    isError,
    router,
    setPageLimit,
    pageLimit,
    page,
    setPage,
    onClose,
  };
};
