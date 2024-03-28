import { useGetSingleAgentDetailsQuery } from '@/services/airServices/settings/user-management/agents/details';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useRequesterDetails = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { _id } = router?.query;
  const getSingleAgentDetailsParameter = {
    pathParams: {
      id: _id,
    },
  };

  const { data, isLoading, isFetching, isError } =
    useGetSingleAgentDetailsQuery(getSingleAgentDetailsParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!_id,
    });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    isDrawerOpen,
    setIsDrawerOpen,
  };
};
