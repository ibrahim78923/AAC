import { useGetCustomerPortalCustomerDashboardAnnouncementsQuery } from '@/services/airCustomerPortal';
import { useState } from 'react';

export const useAnnouncements = () => {
  const [openDrawer, setDrawerOpen] = useState<boolean>(false);

  const { data, isLoading, isFetching, isError, refetch } =
    useGetCustomerPortalCustomerDashboardAnnouncementsQuery(null, {
      refetchOnMountOrArgChange: true,
    });

  const onClose = () => {
    setDrawerOpen(false);
  };

  return {
    data,
    isLoading,
    isFetching,
    isError,
    openDrawer,
    setDrawerOpen,
    onClose,
    refetch,
  };
};
