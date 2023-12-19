import { useRouter } from 'next/router';
import { useState } from 'react';
import { vendorListsColumnsFunction } from './Vendor.data';
import { useGetVendorsListQuery } from '@/services/airServices/settings/asset-management/vendor';
import { PAGINATION } from '@/config';

export const useVendor = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isADrawerOpen, setIsADrawerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const router = useRouter();

  const vendorListsColumns = vendorListsColumnsFunction(router);

  const param = {
    page: page,
    limit: pageLimit,
    search,
  };
  const {
    data: vendorData,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetVendorsListQuery({ param });

  return {
    router,
    vendorListsColumns,
    isDrawerOpen,
    setIsDrawerOpen,
    isADrawerOpen,
    setIsADrawerOpen,
    vendorData,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    setPageLimit,
    setPage,
    setSearch,
  };
};
