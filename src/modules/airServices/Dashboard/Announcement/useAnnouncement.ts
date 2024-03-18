import { useState } from 'react';
import { useGetCustomerAnnouncementQuery } from '@/services/airServices/dashboard';
import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';

export const useAnnouncementHeader = () => {
  const [openDrawer, setDrawerOpen] = useState(false);
  const [openAddAnnouncementDrawer, setOpenAddAnnouncementDrawer] =
    useState(false);
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
    openAddAnnouncementDrawer,
    setOpenAddAnnouncementDrawer,
  };
};
