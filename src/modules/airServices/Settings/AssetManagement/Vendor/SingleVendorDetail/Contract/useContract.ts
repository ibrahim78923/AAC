import { useState } from 'react';
import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { useGetContractVendorListQuery } from '@/services/airServices/settings/asset-management/vendor/single-vendor-details/contract';

export const useContract = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const router = useRouter();
  const { vendorId } = router?.query;

  const param = {
    page: page,
    limit: pageLimit,
    id: vendorId,
  };
  const {
    data: contractVendorData,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetContractVendorListQuery({ param });

  return {
    contractVendorData,
    setPage,
    setPageLimit,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  };
};
