import { PAGINATION } from '@/config';
import { useGetCustomerDashboardAnnouncementsQuery } from '@/services/airCustomerPortal';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useAnnouncements = () => {
  const [openDrawer, setDrawerOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);

  const router = useRouter();

  const getCustomerAnnouncementApiParameter = {
    queryParams: {
      page: page,
      limit: pageLimit,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
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
    refetch,
  };
};
