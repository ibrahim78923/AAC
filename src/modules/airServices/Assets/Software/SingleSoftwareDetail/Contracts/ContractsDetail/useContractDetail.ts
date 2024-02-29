import { PAGINATION } from '@/config';
import { useLazyGetSoftwareContractsQuery } from '@/services/airServices/assets/software/single-software-detail/contracts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useContractDetail = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchBy, setSearchBy] = useState('');
  const router = useRouter();
  const softwareId = router?.query?.softwareId;
  const contractParams = new URLSearchParams();
  contractParams?.append('page', page?.toString());
  contractParams?.append('limit', limit?.toString());
  contractParams?.append('search', searchBy);
  contractParams?.append('id', softwareId + '');
  const [
    getSoftwareContractTrigger,
    { data, isLoading, isFetching, isSuccess, isError },
  ] = useLazyGetSoftwareContractsQuery();
  useEffect(() => {
    const handleSoftwareContract = async () => {
      await getSoftwareContractTrigger(contractParams);
    };
    handleSoftwareContract();
  }, [getSoftwareContractTrigger, contractParams?.toString()]);
  const softwareContractData = data?.data?.contracts;
  const softwareContractMeta = data?.data?.meta;
  return {
    page,
    setPage,
    limit,
    setLimit,
    searchBy,
    setSearchBy,
    router,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    softwareContractData,
    softwareContractMeta,
  };
};
