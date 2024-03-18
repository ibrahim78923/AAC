import {
  useGetSingleAgentDetailsQuery,
  useGetSingleDepartmentDetailsQuery,
} from '@/services/airServices/settings/user-management/agents/details';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useRequesterDetails = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { _id, departmentId } = router?.query;
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

  const getSingleDepartmentDetailsParameter = {
    pathParams: {
      id: departmentId,
    },
  };

  const departmentDetails = useGetSingleDepartmentDetailsQuery(
    getSingleDepartmentDetailsParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!departmentId,
    },
  );

  return {
    data,
    isLoading,
    isFetching,
    isError,
    departmentDetails,
    isDrawerOpen,
    setIsDrawerOpen,
  };
};
