import { PAGINATION } from '@/config';
import { useGetCustomerDashboardAnnouncementsQuery } from '@/services/airCustomerPortal';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useAnnouncements = () => {
  const [openDrawer, setDrawerOpen] = useState(false);
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
    useGetCustomerDashboardAnnouncementsQuery(
      getCustomerAnnouncementApiParameter,
      {
        refetchOnMountOrArgChange: true,
      },
    );

  const onClose = () => {
    setDrawerOpen(false);
    setPage(PAGINATION?.CURRENT_PAGE);
  };

  return {
    data,
    isLoading,
    isFetching,
    isError,
    router,
    openDrawer,
    setDrawerOpen,
    setPageLimit,
    pageLimit,
    page,
    setPage,
    onClose,
  };
};
